# What is dbt? A Complete Guide

## The Simple Answer

**dbt (data build tool)** is an open-source command-line tool that helps data teams transform raw data in their data warehouse using SQL. Think of it as "version control and testing for SQL" - it lets you write SQL transformations like you write code.

**Key Idea:** Instead of writing one-off SQL queries, dbt lets you build reusable, tested, documented data models.

---

## The Problem dbt Solves

### Before dbt (The Old Way)

**Scenario:** You need to analyze cloud costs

1. **Raw Data in Warehouse:**
   ```
   billing_raw table:
   - invoice_id
   - service_name
   - cost_amount
   - date
   - account_id
   - region
   ```

2. **Analyst writes SQL:**
   ```sql
   -- One-off query, saved in a file somewhere
   SELECT 
     DATE_TRUNC('month', date) as month,
     service_name,
     SUM(cost_amount) as total_cost
   FROM billing_raw
   GROUP BY 1, 2
   ```

3. **Problems:**
   - ❌ SQL is scattered across files, notebooks, tools
   - ❌ No version control
   - ❌ No testing
   - ❌ Hard to reuse
   - ❌ No documentation
   - ❌ When data changes, queries break
   - ❌ Different analysts write different logic for "monthly spend"

### After dbt (The Modern Way)

**Same scenario, but with dbt:**

1. **Create a dbt model** (`models/cloud_costs.sql`):
   ```sql
   -- This becomes a table/view in your warehouse
   SELECT 
     DATE_TRUNC('month', date) as month,
     service_name,
     SUM(cost_amount) as total_cost
   FROM {{ ref('billing_raw') }}
   GROUP BY 1, 2
   ```

2. **Add tests** (`models/schema.yml`):
   ```yaml
   models:
     - name: cloud_costs
       columns:
         - name: total_cost
           tests:
             - not_null
             - dbt_utils.accepted_range:
                 min_value: 0
   ```

3. **Add documentation:**
   ```yaml
   models:
     - name: cloud_costs
       description: "Monthly cloud costs by service"
       columns:
         - name: month
           description: "First day of the month"
         - name: service_name
           description: "AWS service name (EC2, S3, etc.)"
         - name: total_cost
           description: "Total cost in USD"
   ```

4. **Run dbt:**
   ```bash
   dbt run        # Executes all models
   dbt test       # Runs tests
   dbt docs generate  # Creates documentation
   ```

5. **Benefits:**
   - ✅ Version controlled (Git)
   - ✅ Tested (automated data quality checks)
   - ✅ Documented (auto-generated docs)
   - ✅ Reusable (models reference each other)
   - ✅ Consistent (single source of truth)

---

## How dbt Works

### The Architecture

```
┌─────────────────────────────────────────────────────────┐
│              DATA WAREHOUSE                              │
│  (Snowflake, BigQuery, Redshift, PostgreSQL, etc.)     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Raw Data     │  │ dbt Models   │  │ Final        │ │
│  │ (Loaded by  │  │ (Transformed │  │ Analytics    │ │
│  │  ETL tool)  │→ │  by dbt)    │→ │  Tables      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                        ▲
                        │
                        │ dbt runs SQL
                        │
┌─────────────────────────────────────────────────────────┐
│                    dbt PROJECT                          │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ SQL Models   │  │ YAML Config │  │ Tests        │ │
│  │ (.sql files)│  │ (.yml files)│  │ (assertions) │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Macros       │  │ Docs        │  │ Seeds        │ │
│  │ (functions)  │  │ (markdown)  │  │ (CSV data)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### The dbt Workflow

1. **Write SQL Models:**
   - Create `.sql` files in `models/` directory
   - Use `{{ ref() }}` to reference other models
   - Use `{{ source() }}` to reference raw data

2. **Configure Models:**
   - Create `schema.yml` files
   - Define tests, documentation, metrics
   - Set model configurations

3. **Run dbt:**
   ```bash
   dbt run          # Executes SQL, creates tables/views
   dbt test          # Runs data quality tests
   dbt docs generate # Creates documentation website
   dbt compile       # Compiles SQL (for debugging)
   ```

4. **dbt Executes:**
   - Reads your SQL files
   - Resolves dependencies (which models depend on which)
   - Executes SQL in correct order
   - Creates tables/views in warehouse
   - Runs tests
   - Generates documentation

---

## Key Concepts

### 1. Models (SQL Files)

**Yes, a dbt model is essentially a SQL SELECT statement**, but with important differences from a regular query:

**Regular SQL Query (one-off):**
```sql
-- Just a query, saved in a file
SELECT 
  DATE_TRUNC('month', date) as month,
  service_name,
  SUM(cost_amount) as total_cost
FROM billing_raw
GROUP BY 1, 2
```

**dbt Model (reusable, tested, documented):**
```sql
-- models/cloud_costs_monthly.sql
-- This becomes a table/view in your warehouse
SELECT 
  DATE_TRUNC('month', date) as month,
  service_name,
  SUM(cost_amount) as total_cost,
  COUNT(*) as transaction_count
FROM {{ ref('billing_raw') }}  -- Uses dbt function, not direct table name
GROUP BY 1, 2
```

**Key Differences:**

1. **Uses `{{ ref() }}` instead of direct table names**
   - `{{ ref('billing_raw') }}` = references another dbt model
   - dbt tracks dependencies automatically
   - If `billing_raw` changes, dbt knows to rebuild this model

2. **Becomes a permanent table/view**
   - When you run `dbt run`, this creates a table/view called `cloud_costs_monthly`
   - Other models can reference it using `{{ ref('cloud_costs_monthly') }}`
   - Not just a query - it's a data asset

3. **Can be tested**
   ```yaml
   # schema.yml
   models:
     - name: cloud_costs_monthly
       columns:
         - name: total_cost
           tests:
             - not_null
             - dbt_utils.accepted_range:
                 min_value: 0
   ```

4. **Can be documented**
   ```yaml
   models:
     - name: cloud_costs_monthly
       description: "Monthly cloud costs aggregated by service"
   ```

5. **Version controlled**
   - Lives in Git
   - Can be reviewed, rolled back
   - Part of codebase

**So yes, it's SQL, but it's:**
- ✅ Reusable (other models reference it)
- ✅ Tested (data quality checks)
- ✅ Documented (auto-generated docs)
- ✅ Version controlled (in Git)
- ✅ Part of a dependency graph (dbt knows what depends on what)

**When you run `dbt run`, this:**
- Executes the SQL
- Creates a table/view called `cloud_costs_monthly` in your warehouse
- Can be referenced by other models using `{{ ref('cloud_costs_monthly') }}`
- Runs tests if defined
- Updates documentation

### 2. References (Model Dependencies)

**`{{ ref() }}`** lets models reference other models:

```sql
-- models/cloud_costs_monthly.sql
SELECT * FROM {{ ref('billing_raw') }}

-- models/cost_by_department.sql
SELECT * FROM {{ ref('cloud_costs_monthly') }}
```

**dbt automatically:**
- Builds dependency graph
- Runs models in correct order
- If `billing_raw` changes, rebuilds dependent models

### 3. Sources (Raw Data)

**`{{ source() }}`** references raw data loaded by ETL tools:

```sql
-- models/cloud_costs.sql
SELECT * FROM {{ source('billing', 'invoices') }}
```

**Defined in `sources.yml`:**
```yaml
sources:
  - name: billing
    database: production
    schema: raw
    tables:
      - name: invoices
```

### 4. Tests (Data Quality)

**Tests validate data quality:**

```yaml
models:
  - name: cloud_costs
    columns:
      - name: total_cost
        tests:
          - not_null           # Cost must not be null
          - dbt_utils.accepted_range:
              min_value: 0      # Cost must be >= 0
          - unique              # Each row must be unique
```

**Built-in tests:**
- `not_null` - Column can't be null
- `unique` - Column values must be unique
- `accepted_values` - Column must be one of specific values
- `relationships` - Foreign key relationships

**Custom tests:**
- Write SQL that should return 0 rows if test passes

### 5. Documentation

**Auto-generate documentation from YAML:**

```yaml
models:
  - name: cloud_costs
    description: "Monthly cloud costs aggregated by service"
    columns:
      - name: month
        description: "First day of the month (YYYY-MM-DD)"
      - name: service_name
        description: "AWS service name (e.g., EC2, S3, RDS)"
      - name: total_cost
        description: "Total cost in USD for the month"
```

**Run `dbt docs generate`** to create interactive documentation website.

### 6. Macros (Reusable SQL)

**Macros are like functions in SQL:**

```sql
-- macros/date_trunc_month.sql
{% macro date_trunc_month(date_column) %}
  DATE_TRUNC('month', {{ date_column }})
{% endmacro %}
```

**Use in models:**
```sql
SELECT 
  {{ date_trunc_month('date') }} as month,
  ...
```

### 7. Metrics (Business Logic)

**Metrics define business calculations:**

```yaml
# models/schema.yml
metrics:
  - name: total_monthly_spend
    label: Total Monthly Cloud Spend
    model: ref('cloud_costs_monthly')
    calculation_method: sum
    expression: total_cost
    timestamp: month
    time_grains: [day, week, month, quarter, year]
    
  - name: budget_variance
    label: Budget Variance Percentage
    model: ref('budget_comparison')
    calculation_method: derived
    expression: |
      (actual_spend - budgeted_amount) / budgeted_amount * 100
```

**Lightdash reads these metrics** and creates dashboards automatically!

---

## Real-World Example: FinOps with dbt

### The Data Pipeline

**Step 1: Raw Data (Loaded by ETL)**
```
billing_raw table:
- invoice_id: "INV-123"
- service_name: "EC2"
- cost_amount: 1500.00
- date: "2025-01-15"
- account_id: "acc-456"
- region: "us-east-1"
```

**Step 2: dbt Models Transform Data**

```sql
-- models/staging/stg_billing.sql
-- Clean and standardize raw data
SELECT 
  invoice_id,
  LOWER(service_name) as service_name,
  cost_amount,
  DATE(date) as cost_date,
  account_id,
  region
FROM {{ source('billing', 'raw_invoices') }}
WHERE cost_amount > 0  -- Filter out zero costs
```

```sql
-- models/marts/cloud_costs_monthly.sql
-- Aggregate to monthly level
SELECT 
  DATE_TRUNC('month', cost_date) as month,
  service_name,
  region,
  SUM(cost_amount) as total_cost,
  COUNT(DISTINCT account_id) as account_count,
  AVG(cost_amount) as avg_cost
FROM {{ ref('stg_billing') }}
GROUP BY 1, 2, 3
```

```sql
-- models/marts/cost_by_department.sql
-- Join with department mapping
SELECT 
  c.month,
  d.department_name,
  SUM(c.total_cost) as department_cost
FROM {{ ref('cloud_costs_monthly') }} c
JOIN {{ ref('department_mapping') }} d
  ON c.account_id = d.account_id
GROUP BY 1, 2
```

**Step 3: Define Metrics**

```yaml
# models/schema.yml
metrics:
  - name: total_monthly_spend
    label: Total Monthly Cloud Spend
    model: ref('cloud_costs_monthly')
    calculation_method: sum
    expression: total_cost
    timestamp: month
    time_grains: [month, quarter, year]
    
  - name: cost_by_service
    label: Cost by Service
    model: ref('cloud_costs_monthly')
    calculation_method: sum
    expression: total_cost
    dimensions:
      - service_name
      
  - name: budget_variance
    label: Budget Variance
    model: ref('budget_comparison')
    calculation_method: derived
    expression: |
      (actual_spend - budgeted_amount) / budgeted_amount * 100
```

**Step 4: Add Tests**

```yaml
models:
  - name: cloud_costs_monthly
    columns:
      - name: total_cost
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
      - name: month
        tests:
          - not_null
          - unique
```

**Step 5: Run dbt**

```bash
dbt run          # Creates all tables
dbt test          # Runs tests
dbt docs generate # Creates docs
```

**Result:**
- ✅ Clean, transformed data in warehouse
- ✅ Tested for data quality
- ✅ Documented
- ✅ Metrics defined for Lightdash
- ✅ Version controlled

---

## Why dbt Matters

### Benefits

1. **Version Control**
   - All SQL in Git
   - Track changes over time
   - Roll back if needed
   - Code review process

2. **Testing**
   - Automated data quality checks
   - Catch errors early
   - Prevent bad data from reaching users

3. **Documentation**
   - Auto-generated docs
   - Always up-to-date
   - Helps new team members

4. **Modularity**
   - Reusable models
   - Build complex transformations from simple parts
   - DRY principle (Don't Repeat Yourself)

5. **Collaboration**
   - Multiple people work on same project
   - Clear dependencies
   - Less duplication

6. **Single Source of Truth**
   - One definition of "monthly spend"
   - Everyone uses same logic
   - Consistent metrics

### Comparison to Alternatives

**vs. Stored Procedures:**
- ✅ Version controlled
- ✅ Testable
- ✅ Documented
- ✅ Warehouse-agnostic

**vs. One-off SQL Queries:**
- ✅ Reusable
- ✅ Tested
- ✅ Documented
- ✅ Consistent

**vs. ETL Tools (like Airflow):**
- ✅ Focuses on Transform (not Extract/Load)
- ✅ SQL-based (easier for analysts)
- ✅ Better for analytics use cases

---

## How dbt Connects to Lightdash

### The Integration

1. **dbt Defines Metrics:**
   ```yaml
   metrics:
     - name: total_monthly_spend
       model: ref('cloud_costs_monthly')
       calculation_method: sum
       expression: total_cost
   ```

2. **Lightdash Reads dbt:**
   - Connects to your dbt project
   - Reads all models
   - Reads all metrics
   - Discovers relationships

3. **Lightdash Creates Dashboards:**
   - Automatically creates charts for each metric
   - Allows filtering, drill-downs
   - Provides self-service analytics

**Why This Matters:**
- **Single Source of Truth**: Metrics defined once in dbt
- **Consistency**: Everyone uses same definitions
- **Version Control**: Metrics versioned with code
- **Data Quality**: dbt tests ensure quality
- **Documentation**: Auto-generated from dbt

---

## dbt Project Structure

### Typical dbt Project

```
my_dbt_project/
├── dbt_project.yml          # Project configuration
├── profiles.yml             # Warehouse connection
├── models/                  # SQL models
│   ├── staging/            # Clean raw data
│   │   ├── stg_billing.sql
│   │   └── schema.yml
│   ├── marts/              # Business logic
│   │   ├── cloud_costs_monthly.sql
│   │   ├── cost_by_department.sql
│   │   └── schema.yml
│   └── intermediate/       # Reusable components
│       └── int_aggregations.sql
├── macros/                  # Reusable SQL functions
│   └── date_trunc_month.sql
├── tests/                   # Custom tests
│   └── test_positive_costs.sql
├── seeds/                   # CSV data files
│   └── department_mapping.csv
└── docs/                    # Documentation
    └── index.md
```

### Key Files

**`dbt_project.yml`:**
```yaml
name: 'finops_project'
version: '1.0.0'
profile: 'finops'

models:
  finops_project:
    staging:
      +materialized: view
    marts:
      +materialized: table
```

**`profiles.yml`:**
```yaml
finops:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: myaccount
      user: myuser
      password: mypassword
      database: analytics
      schema: dbt_dev
```

---

## dbt Commands

### Essential Commands

```bash
# Run all models
dbt run

# Run specific model
dbt run --select cloud_costs_monthly

# Run models and their dependencies
dbt run --select cloud_costs_monthly+

# Run models that depend on this
dbt run --select +cloud_costs_monthly

# Test all models
dbt test

# Test specific model
dbt test --select cloud_costs_monthly

# Compile SQL (for debugging)
dbt compile

# Generate documentation
dbt docs generate
dbt docs serve  # Opens docs in browser

# List all models
dbt list

# Show model dependencies
dbt list --select cloud_costs_monthly+
```

---

## For Your Interview

### Why Understanding dbt Matters

**For FinOps BI Platform role:**
- ✅ Understanding of modern data stack
- ✅ Knowledge of how BI tools integrate with data
- ✅ Understanding of data transformation
- ✅ Awareness of data quality practices

### Key Points to Remember

1. **dbt = Data Transformation Tool**
   - Transforms raw data into analytics-ready models
   - Uses SQL (accessible to analysts)
   - Version controlled, tested, documented

2. **dbt + Lightdash = Powerful Combo**
   - dbt defines metrics
   - Lightdash creates dashboards
   - Single source of truth

3. **For FinOps:**
   - dbt transforms cloud billing data
   - Creates clean cost models
   - Defines FinOps metrics
   - Lightdash visualizes them

4. **Your Integration:**
   - Service layer can call Lightdash API
   - Lightdash reads dbt metrics
   - Dashboard displays FinOps data
   - Architecture ready for this workflow

---

## Summary

**dbt is:**
- A command-line tool for transforming data
- Uses SQL to build reusable models
- Provides testing, documentation, version control
- Part of modern data stack

**How it works:**
- Write SQL models
- Define tests and documentation
- Run `dbt run` to execute
- Creates tables/views in warehouse

**Why it matters:**
- Version control for SQL
- Data quality testing
- Single source of truth
- Enables tools like Lightdash

**For FinOps:**
- Transforms cloud billing data
- Creates cost models
- Defines metrics
- Feeds into Lightdash dashboards

**Your Integration:**
- Architecture ready for dbt → Lightdash → Your App workflow
- Service layer can consume Lightdash API
- Dashboard displays FinOps metrics

The key insight: **dbt is the foundation** - it transforms data and defines metrics, then **Lightdash visualizes** those metrics, and **your app integrates** with Lightdash to display them in ServiceNow.


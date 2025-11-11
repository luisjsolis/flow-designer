# SQL Aggregate Joins Interview Prep

## AI Prompt Template for Generating SQL Solutions

When asking AI to generate SQL solutions for interview practice, use this prompt structure:

```
I'm preparing for a SQL interview. Please help me solve this problem:

[PROBLEM DESCRIPTION]

Requirements:
- Use proper SQL syntax (specify: PostgreSQL, MySQL, SQL Server, etc.)
- Include aggregate functions and joins
- Consider edge cases (NULLs, empty results, duplicates)
- Explain the approach with comments step-by-step
- Discuss alternative solutions and tradeoffs
- Include performance considerations

Schema:
[Provide table schemas with column names, types, and relationships]

Sample Data:
[Optional: provide sample data]

Expected Output:
[Describe what the result should look like]
```

---

## Clarifying Questions to Ask in Interviews

**Why ask clarifying questions?** It demonstrates:
- Critical thinking and attention to detail
- Understanding of real-world data complexities
- Ability to gather requirements before coding
- Professional approach to problem-solving

### Essential Questions (Ask These First)

#### 1. **Data Requirements & Scope**
- "Should we include records with no matches? For example, customers with no orders?"
  - *Determines: INNER JOIN vs LEFT JOIN*
- "Are there any date ranges or filters we should apply?"
  - *Determines: WHERE clause requirements*
- "Should we handle NULL values in the join keys?"
  - *Determines: NULL handling strategy*

#### 2. **Output Format & Aggregation**
- "What should the result look like? One row per customer, or one row per order?"
  - *Determines: GROUP BY strategy*
- "How should we handle duplicates? Are duplicate orders possible?"
  - *Determines: Need for DISTINCT or deduplication*
- "What should we return for customers with no orders - NULL, 0, or exclude them?"
  - *Determines: COALESCE/IFNULL usage*

#### 3. **Edge Cases**
- "What if a customer has multiple orders on the same date?"
  - *Determines: How to handle ties in MAX/MIN*
- "Should we exclude cancelled/refunded orders, or include all orders?"
  - *Determines: Filtering requirements*
- "Are there any data quality issues I should be aware of? Missing foreign keys, orphaned records?"
  - *Shows awareness of real-world data problems*

#### 4. **Performance & Scale**
- "What's the approximate data volume? Are we talking thousands or millions of rows?"
  - *Helps decide: Simple query vs optimized approach*
- "Are there indexes on the tables? Which columns?"
  - *Helps optimize: Join and filter columns*
- "Is this a one-time query or will it run frequently?"
  - *Determines: Optimization effort vs quick solution*

#### 5. **Database-Specific**
- "Which database system are we using? PostgreSQL, MySQL, SQL Server?"
  - *Determines: Syntax differences (e.g., TOP vs LIMIT, date functions)*
- "Are we in strict SQL mode or can we use database-specific features?"
  - *Determines: Window functions, CTEs, etc.*

### Advanced Questions (Show Deeper Thinking)

#### 6. **Business Logic**
- "What's the business definition of 'total sales'? Should it include taxes, discounts, refunds?"
  - *Shows understanding of business context*
- "How should we handle time zones for date comparisons?"
  - *Shows awareness of common pitfalls*
- "Are there any special cases? VIP customers, test accounts, etc.?"
  - *Shows thoroughness*

#### 7. **Data Relationships**
- "Is this a one-to-many relationship, or could there be many-to-many?"
  - *Determines: Need for junction tables*
- "Can a customer have multiple accounts, or is customer_id unique?"
  - *Affects: Aggregation strategy*

#### 8. **Result Set Expectations**
- "Should results be sorted? If so, by what column(s)?"
  - *Determines: ORDER BY requirements*
- "Do we need to limit the results? Top N customers?"
  - *Determines: LIMIT/TOP usage*
- "Should we show all customers or only those meeting certain criteria?"
  - *Determines: HAVING vs WHERE*

### Good Opening Sentences

Here are several natural ways to transition into asking clarifying questions:

**Option 1: Direct & Professional**
- "Before I start coding, I'd like to clarify a few things to make sure I understand the requirements correctly:"

**Option 2: Collaborative**
- "Great question! To make sure I build this correctly, can I ask a few clarifying questions first?"

**Option 3: Thoughtful**
- "I want to make sure I handle all the edge cases properly. Could I ask a few questions about the requirements?"

**Option 4: Confident & Efficient**
- "Perfect! I have a few quick questions to ensure I'm solving the right problem:"

**Option 5: Analytical**
- "Before I write the query, I'd like to understand a few details about the data and expected output:"

**Why these work:**
- Shows you're methodical and think before coding
- Demonstrates you understand that requirements matter
- Sounds professional, not hesitant
- Sets up that you're about to ask smart questions

**Avoid:**
- "Um, I have some questions..." (sounds uncertain)
- "I don't know how to do this, but..." (shows lack of confidence)
- "Can you tell me more?" (too vague)

### Example Interview Dialogue

**Interviewer:** "Write a query to find the total sales per customer."

**You:** "Perfect! Before I start coding, I'd like to clarify a few things to make sure I understand the requirements correctly:

1. Should we include customers who haven't made any purchases, or only customers with orders?
   - *[This determines INNER vs LEFT JOIN]*

2. What should we include in 'total sales' - just the order amount, or should we factor in refunds or discounts?
   - *[This determines which columns to sum]*

3. Are there any date filters? Like sales from the last year only?
   - *[This determines WHERE clause]*

4. Should the results be sorted in any particular way?
   - *[This determines ORDER BY]*

5. Are we working with a specific database? That way I can use the right syntax.
   - *[This determines SQL dialect]*

Once I understand these, I'll write the query and explain my approach."

**Why this works:**
- Shows you think before coding
- Demonstrates understanding of SQL concepts
- Prevents wasted time on wrong approach
- Shows professional communication skills

### Questions to Avoid (Unless Truly Necessary)

❌ **Don't ask:** "Can I use Google?" or "What's the syntax for JOIN?"
- *Shows lack of fundamental knowledge*

❌ **Don't ask:** Overly obvious questions that show you didn't listen
- *"Wait, what was the question again?"*

❌ **Don't ask:** Questions that suggest you're stalling
- *Ask meaningful questions, not filler*

✅ **Do ask:** Questions that show you're thinking about edge cases, performance, and real-world scenarios

### When to Stop Asking Questions

**Good stopping point:** When you have enough information to:
1. Determine the join type needed
2. Know what to aggregate
3. Understand edge cases
4. Know the expected output format

**Don't over-question:** 3-5 well-chosen questions is usually enough. Too many questions can seem like you're avoiding the problem.

---

## Key Concepts & Talking Points

### 1. **Join Types & When to Use Them**

**INNER JOIN**
- Returns only matching rows from both tables
- Use when: You need data that exists in both tables
- Tradeoff: Excludes rows without matches (may lose data)

**LEFT JOIN (LEFT OUTER JOIN)**
- Returns all rows from left table + matching rows from right
- Use when: You need all records from the primary table, even without matches
- Tradeoff: Produces NULLs for non-matching right table columns

**RIGHT JOIN (RIGHT OUTER JOIN)**
- Returns all rows from right table + matching rows from left
- Use when: You need all records from the secondary table
- Tradeoff: Less common, can usually be rewritten as LEFT JOIN

**FULL OUTER JOIN**
- Returns all rows from both tables
- Use when: You need complete picture from both tables
- Tradeoff: Can produce large result sets, harder to reason about

**CROSS JOIN (Cartesian Product)**
- Returns all combinations of rows
- Use when: Generating combinations or when explicitly needed
- Tradeoff: Can produce massive result sets (N × M rows)

### 2. **Aggregate Functions**

**COUNT()**
- `COUNT(*)` vs `COUNT(column)` - NULL handling difference
- `COUNT(DISTINCT column)` for unique counts

**SUM(), AVG(), MIN(), MAX()**
- Handle NULLs (NULLs are ignored in aggregation)
- Consider data types (SUM on strings vs numbers)

**GROUP BY**
- All non-aggregated columns must be in GROUP BY
- Can group by multiple columns
- NULLs form their own group

**HAVING vs WHERE**
- WHERE filters before aggregation
- HAVING filters after aggregation
- Performance: WHERE is more efficient when possible

### 3. **Common Patterns**

**Window Functions vs Aggregates**
- Window functions: `ROW_NUMBER()`, `RANK()`, `SUM() OVER()`
- Use when: Need both aggregated and non-aggregated data in same row
- Tradeoff: More complex but avoids self-joins

**Subqueries vs JOINs**
- Subqueries: Often more readable for simple filters
- JOINs: Usually more performant, especially with indexes
- Correlated subqueries: Can be slow (executed per row)

**CTEs (Common Table Expressions)**
- Improves readability for complex queries
- Can reference previous CTEs
- Tradeoff: May not always optimize as well as subqueries

### 4. **Performance Considerations**

**Indexes**
- Foreign keys should be indexed
- Columns in WHERE, JOIN, and ORDER BY benefit from indexes
- Composite indexes for multi-column filters

**Query Execution Order**
- FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
- Filter early (WHERE before JOINs when possible)
- Limit result sets early

**NULL Handling**
- `IS NULL` vs `= NULL` (always use IS NULL)
- COALESCE() and NULLIF() for NULL transformations
- NULLs in JOINs: NULL ≠ NULL (won't match)

### 5. **Edge Cases to Discuss**

- Empty tables
- NULL values in join keys
- Duplicate keys (one-to-many relationships)
- No matching rows (LEFT JOIN produces NULLs)
- Division by zero in calculations
- Data type mismatches
- Time zones in date comparisons

---

## Example: Sales Analysis with Aggregate Joins

### Problem
Find the total sales amount and number of orders per customer, including customers with no orders. Also show the average order value and the customer's most recent order date.

### Schema
```sql
-- Customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    registration_date DATE
);

-- Orders table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### Solution with Talking Points

```sql
-- TALKING POINT 1: Why LEFT JOIN?
-- We use LEFT JOIN because the problem asks for "including customers with no orders"
-- This ensures we don't lose customers who haven't made any purchases
-- Alternative: INNER JOIN would exclude customers with no orders
SELECT 
    c.customer_id,
    c.customer_name,
    
    -- TALKING POINT 2: Aggregate Functions with NULL Handling
    -- COUNT(o.order_id) instead of COUNT(*) because:
    -- - COUNT(*) counts rows, including NULLs from LEFT JOIN
    -- - COUNT(column) ignores NULLs, giving us actual order count
    -- - For customers with no orders, this returns 0 (not NULL)
    COUNT(o.order_id) AS total_orders,
    
    -- TALKING POINT 3: SUM() and NULL Handling
    -- SUM() automatically ignores NULLs, so customers with no orders get 0
    -- COALESCE() makes this explicit and handles NULL display
    -- Alternative: Could use IFNULL() in MySQL or ISNULL() in SQL Server
    COALESCE(SUM(o.total_amount), 0) AS total_sales,
    
    -- TALKING POINT 4: Conditional Aggregation
    -- We calculate average only when orders exist to avoid division by zero
    -- CASE statement prevents NULL/0 issues
    -- Alternative: Could use NULLIF() to handle division by zero
    CASE 
        WHEN COUNT(o.order_id) > 0 
        THEN COALESCE(SUM(o.total_amount), 0) / COUNT(o.order_id)
        ELSE 0 
    END AS avg_order_value,
    
    -- TALKING POINT 5: MAX() for Most Recent Date
    -- MAX() works for dates (most recent = maximum date value)
    -- Returns NULL for customers with no orders (which is correct)
    -- Alternative: Could use ORDER BY with LIMIT in a subquery, but less efficient
    MAX(o.order_date) AS most_recent_order_date

FROM customers c
    -- TALKING POINT 6: JOIN Condition
    -- Always join on indexed columns when possible (customer_id should be indexed)
    -- Consider: What if customer_id is NULL in orders? (Would be excluded from join)
LEFT JOIN orders o 
    ON c.customer_id = o.customer_id

-- TALKING POINT 7: GROUP BY
-- Must include all non-aggregated columns from SELECT
-- Grouping by customer_id is sufficient since customer_name is functionally dependent
-- In some databases, you'd need customer_name in GROUP BY (strict mode)
GROUP BY 
    c.customer_id,
    c.customer_name

-- TALKING POINT 8: HAVING vs WHERE
-- We're not filtering here, but if we wanted "customers with > 5 orders":
-- WHERE: Can't use aggregates (would need subquery)
-- HAVING: Can filter on aggregates (COUNT(o.order_id) > 5)
-- Performance: WHERE filters before aggregation (more efficient)

-- TALKING POINT 9: ORDER BY
-- Ordering by total_sales DESC to show top customers first
-- NULL values sort last by default (customers with no orders)
ORDER BY 
    total_sales DESC,
    c.customer_name ASC;
```

### Alternative Approaches & Tradeoffs

#### Alternative 1: Using Subquery
```sql
-- TALKING POINT: Subquery Approach
-- Pros: More readable, separates concerns
-- Cons: May execute subquery multiple times (though optimizer usually handles this)
-- Performance: Modern optimizers often convert to JOINs anyway
SELECT 
    c.customer_id,
    c.customer_name,
    (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) AS total_orders,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders o WHERE o.customer_id = c.customer_id) AS total_sales
FROM customers c;
```

#### Alternative 2: Using CTE
```sql
-- TALKING POINT: CTE for Readability
-- Pros: Breaks complex logic into steps, reusable
-- Cons: May not optimize as well in some databases
-- Use when: Query is complex or you need to reference the aggregation multiple times
WITH customer_orders AS (
    SELECT 
        customer_id,
        COUNT(*) AS total_orders,
        SUM(total_amount) AS total_sales,
        MAX(order_date) AS most_recent_order_date
    FROM orders
    GROUP BY customer_id
)
SELECT 
    c.customer_id,
    c.customer_name,
    COALESCE(co.total_orders, 0) AS total_orders,
    COALESCE(co.total_sales, 0) AS total_sales
FROM customers c
LEFT JOIN customer_orders co ON c.customer_id = co.customer_id;
```

#### Alternative 3: Window Functions (if we needed row-level detail)
```sql
-- TALKING POINT: Window Functions
-- Use when: You need both aggregated and non-aggregated data in same result
-- Example: Show each order with customer's total sales
SELECT 
    o.order_id,
    o.order_date,
    o.total_amount,
    c.customer_name,
    -- Window function: aggregates without collapsing rows
    SUM(o.total_amount) OVER (PARTITION BY o.customer_id) AS customer_total_sales
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
```

### Performance Optimization Talking Points

1. **Indexes**
   - Index on `orders.customer_id` (foreign key) - critical for JOIN performance
   - Consider composite index if filtering by date: `(customer_id, order_date)`

2. **Query Execution**
   - LEFT JOIN happens before aggregation (good - filters early if possible)
   - GROUP BY on indexed column (customer_id) is efficient
   - Consider: If most customers have orders, INNER JOIN might be faster

3. **Scalability**
   - For large datasets, consider:
     - Partitioning orders table by date
     - Materialized views for frequently-run aggregations
     - Approximate aggregations (if exact counts not needed)

### Common Interview Questions to Anticipate

1. **"What if a customer has NULL in customer_id in the orders table?"**
   - Answer: Those orders wouldn't match in the JOIN (NULL ≠ NULL)
   - Would need: `WHERE o.customer_id IS NOT NULL` or handle orphaned orders

2. **"How would you handle duplicate orders?"**
   - Answer: Depends on business logic - might need DISTINCT or GROUP BY order_id first
   - Consider: Are duplicates valid? Or data quality issue?

3. **"What if you needed to include order details in the result?"**
   - Answer: Would need to decide: one row per customer (aggregate order details) or one row per order (use window functions)

4. **"How would you optimize this for 1 billion orders?"**
   - Answer: 
     - Partitioning by date
     - Indexes on join and filter columns
     - Consider pre-aggregated tables/materialized views
     - Sampling for approximate results
     - Distributed query processing

---

## Practice Problems to Request from AI

Use the prompt template above with these scenarios:

1. **E-commerce Analysis**: Find top-selling products with category information, including categories with no sales
2. **Employee Hierarchy**: Calculate department budgets including departments with no employees
3. **Time-based Analysis**: Monthly revenue trends with gaps filled (months with no sales)
4. **Multi-table Aggregation**: Customer lifetime value across orders, payments, and refunds
5. **Ranking Problems**: Top N customers per region with ties handled

---

## Quick Reference: SQL Execution Order

When explaining your query, reference this order:

1. **FROM** - Identify source tables
2. **JOIN** - Combine tables (happens with FROM)
3. **WHERE** - Filter rows (before aggregation - more efficient)
4. **GROUP BY** - Group rows
5. **HAVING** - Filter groups (after aggregation)
6. **SELECT** - Choose columns and calculate expressions
7. **ORDER BY** - Sort results
8. **LIMIT/OFFSET** - Restrict result set

**Key Insight**: Understanding this order helps explain why you can't use aggregate functions in WHERE, but can in HAVING.

---

## Interview Communication Tips

1. **Start with Understanding**
   - Clarify requirements: "Just to confirm, should we include customers with no orders?"
   - Ask about edge cases: "How should we handle NULL values?"

2. **Think Out Loud**
   - "I'm using LEFT JOIN because..."
   - "I chose COUNT(column) over COUNT(*) because..."
   - "This might have performance implications if..."

3. **Discuss Tradeoffs**
   - "We could use a subquery here, but a JOIN would be more performant"
   - "This approach is more readable, but might not scale as well"

4. **Consider Alternatives**
   - "Another way to solve this would be..."
   - "If we needed X instead of Y, we'd modify this by..."

5. **Acknowledge Limitations**
   - "This assumes all customer_ids are valid"
   - "We'd want to add indexes in production"
   - "For very large datasets, we might need to partition"


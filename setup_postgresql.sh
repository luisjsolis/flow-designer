#!/bin/bash

# PostgreSQL SQL Practice Database Setup Script
# Creates a PostgreSQL database with sample data for practicing SQL

DB_NAME="sql_practice"
DB_USER="${USER}"  # Use current user

echo "🗄️  Setting up PostgreSQL SQL Practice Database..."
echo ""

# Find psql command (check common Homebrew locations)
PSQL_CMD=""
if command -v psql &> /dev/null; then
    PSQL_CMD="psql"
elif [ -f "/opt/homebrew/opt/postgresql@16/bin/psql" ]; then
    PSQL_CMD="/opt/homebrew/opt/postgresql@16/bin/psql"
elif [ -f "/usr/local/opt/postgresql@16/bin/psql" ]; then
    PSQL_CMD="/usr/local/opt/postgresql@16/bin/psql"
elif [ -f "/opt/homebrew/opt/postgresql@15/bin/psql" ]; then
    PSQL_CMD="/opt/homebrew/opt/postgresql@15/bin/psql"
elif [ -f "/usr/local/opt/postgresql@15/bin/psql" ]; then
    PSQL_CMD="/usr/local/opt/postgresql@15/bin/psql"
else
    echo "❌ PostgreSQL is not installed or psql not found."
    echo ""
    echo "📦 To install PostgreSQL on macOS:"
    echo "   brew install postgresql@16"
    echo "   brew services start postgresql@16"
    echo ""
    echo "   Or download from: https://www.postgresql.org/download/macosx/"
    echo ""
    exit 1
fi

echo "✅ Found PostgreSQL at: $PSQL_CMD"

# Check if PostgreSQL service is running
PG_ISREADY_CMD=""
if command -v pg_isready &> /dev/null; then
    PG_ISREADY_CMD="pg_isready"
elif [ -f "/opt/homebrew/opt/postgresql@16/bin/pg_isready" ]; then
    PG_ISREADY_CMD="/opt/homebrew/opt/postgresql@16/bin/pg_isready"
elif [ -f "/usr/local/opt/postgresql@16/bin/pg_isready" ]; then
    PG_ISREADY_CMD="/usr/local/opt/postgresql@16/bin/pg_isready"
fi

if [ -n "$PG_ISREADY_CMD" ] && ! $PG_ISREADY_CMD &> /dev/null; then
    echo "⚠️  PostgreSQL service doesn't appear to be running."
    echo ""
    echo "🚀 To start PostgreSQL:"
    echo "   brew services start postgresql@16"
    echo "   # or"
    echo "   pg_ctl -D /usr/local/var/postgres start"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ PostgreSQL is available"
echo ""

# Create database (drop if exists)
echo "📊 Creating database '$DB_NAME'..."
$PSQL_CMD -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
$PSQL_CMD -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Error: Could not create database."
    echo "   Make sure PostgreSQL is running and you have permissions."
    echo "   Try: createdb $DB_NAME"
    exit 1
fi

echo "✅ Database created"
echo ""

# Create tables and insert data
echo "📋 Creating tables and inserting sample data..."
$PSQL_CMD -d "$DB_NAME" <<EOF

-- Customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    registration_date DATE,
    city VARCHAR(50),
    country VARCHAR(50)
);

-- Products table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INTEGER
);

-- Orders table
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order Items table
CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Employees table
CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY,
    employee_name VARCHAR(100),
    department VARCHAR(50),
    manager_id INTEGER,
    salary DECIMAL(10, 2),
    hire_date DATE,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

-- Insert customers
INSERT INTO customers VALUES
(1, 'Alice Johnson', 'alice@email.com', '2023-01-15', 'New York', 'USA'),
(2, 'Bob Smith', 'bob@email.com', '2023-02-20', 'London', 'UK'),
(3, 'Charlie Brown', 'charlie@email.com', '2023-03-10', 'Toronto', 'Canada'),
(4, 'Diana Prince', 'diana@email.com', '2023-01-05', 'New York', 'USA'),
(5, 'Eve Wilson', 'eve@email.com', '2023-04-12', 'London', 'UK');

-- Insert products
INSERT INTO products VALUES
(1, 'Laptop', 'Electronics', 999.99, 50),
(2, 'Mouse', 'Electronics', 29.99, 200),
(3, 'Desk Chair', 'Furniture', 199.99, 30),
(4, 'Monitor', 'Electronics', 299.99, 75),
(5, 'Keyboard', 'Electronics', 79.99, 150);

-- Insert orders
INSERT INTO orders VALUES
(1, 1, '2023-05-01', 'completed'),
(2, 1, '2023-05-15', 'completed'),
(3, 2, '2023-05-10', 'completed'),
(4, 3, '2023-05-20', 'pending'),
(5, 4, '2023-05-25', 'completed'),
(6, 1, '2023-06-01', 'cancelled');

-- Insert order items
INSERT INTO order_items VALUES
(1, 1, 1, 1, 999.99),
(2, 1, 2, 2, 29.99),
(3, 2, 3, 1, 199.99),
(4, 3, 4, 2, 299.99),
(5, 3, 5, 1, 79.99),
(6, 4, 1, 1, 999.99),
(7, 5, 2, 3, 29.99);

-- Insert employees
INSERT INTO employees VALUES
(1, 'John Manager', 'Sales', NULL, 100000, '2020-01-01'),
(2, 'Jane Sales', 'Sales', 1, 75000, '2021-03-15'),
(3, 'Mike Sales', 'Sales', 1, 80000, '2021-06-20'),
(4, 'Sarah Manager', 'Engineering', NULL, 120000, '2019-05-10'),
(5, 'Tom Engineer', 'Engineering', 4, 95000, '2022-01-15');

EOF

if [ $? -eq 0 ]; then
    echo "✅ Tables and data created successfully!"
    echo ""
    echo "🧪 Testing database..."
    
    $PSQL_CMD -d "$DB_NAME" <<TEST_EOF
\echo 'Customers:'
SELECT COUNT(*) as total_customers FROM customers;
\echo ''
\echo 'Products:'
SELECT COUNT(*) as total_products FROM products;
\echo ''
\echo 'Orders:'
SELECT COUNT(*) as total_orders FROM orders;
TEST_EOF
    
    echo ""
    echo "🚀 PostgreSQL database is ready!"
    echo ""
    echo "📁 Database: $DB_NAME"
    echo ""
    echo "To connect:"
    echo "  $PSQL_CMD -d $DB_NAME"
    echo ""
    echo "Or run queries directly:"
    echo "  $PSQL_CMD -d $DB_NAME -c \"SELECT * FROM customers;\""
    echo ""
    echo "📚 Open docs/sql-practice-exercises.md to start!"
else
    echo "❌ Error creating tables"
    exit 1
fi


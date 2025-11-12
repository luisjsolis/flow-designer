#!/bin/bash

# SQL Practice Database Setup Script
# Creates a SQLite database with sample data for practicing SQL

DB_FILE="sql_practice.db"

echo "🗄️  Setting up SQL Practice Database..."
echo ""

# Remove existing database if it exists
if [ -f "$DB_FILE" ]; then
    echo "⚠️  Existing database found. Removing it..."
    rm "$DB_FILE"
fi

# Create database and tables
echo "📊 Creating tables..."
sqlite3 "$DB_FILE" <<EOF

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT,
    registration_date TEXT,
    city TEXT,
    country TEXT
);

-- Products table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT,
    price REAL,
    stock_quantity INTEGER
);

-- Orders table
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date TEXT,
    status TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order Items table
CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    unit_price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Employees table
CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY,
    employee_name TEXT,
    department TEXT,
    manager_id INTEGER,
    salary REAL,
    hire_date TEXT,
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
    echo "✅ Database created successfully!"
    echo ""
    echo "📁 Database file: $DB_FILE"
    echo ""
    echo "🧪 Testing database..."
    
    # Run a test query
    sqlite3 "$DB_FILE" <<TEST_EOF
.mode column
.headers on
SELECT 'Customers:' as '';
SELECT COUNT(*) as total_customers FROM customers;
SELECT 'Products:' as '';
SELECT COUNT(*) as total_products FROM products;
SELECT 'Orders:' as '';
SELECT COUNT(*) as total_orders FROM orders;
TEST_EOF
    
    echo ""
    echo "🚀 You're ready to practice SQL!"
    echo ""
    echo "To start practicing:"
    echo "  sqlite3 $DB_FILE"
    echo ""
    echo "Or run queries directly:"
    echo "  sqlite3 $DB_FILE \"SELECT * FROM customers;\""
    echo ""
    echo "📚 Open docs/sql-practice-exercises.md to start!"
else
    echo "❌ Error creating database"
    exit 1
fi


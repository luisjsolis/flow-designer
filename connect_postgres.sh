#!/bin/bash

# Quick connect script for PostgreSQL practice database

# Find psql command
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
    echo "❌ psql not found. Is PostgreSQL installed?"
    exit 1
fi

# Connect to practice database
$PSQL_CMD -d sql_practice


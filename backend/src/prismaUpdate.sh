#!/bin/bash

# Script to generate Prisma client and run migrations
# Usage: ./prismaUpdate.sh

# Exit on error
set -e

echo "Starting Prisma update process..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma migrate dev

echo "Prisma update completed successfully!"
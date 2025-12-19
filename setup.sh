#!/bin/bash

echo "🚀 Setting up TNPlots development environment..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cat > .env << 'EOF'
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret-key-change-in-production"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="demo"
CLOUDINARY_API_KEY="demo"
CLOUDINARY_API_SECRET="demo"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="demo"
ADMIN_PHONE="9876543210"
ADMIN_PASSWORD="admin123"
EOF
  echo "✅ .env file created"
else
  echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
echo "🌱 Seeding database with sample data..."
npx prisma db seed

echo "🎉 Setup complete! Run 'npm run dev' to start the development server."

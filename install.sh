#!/bin/bash

# Legal CMS - Installation & Quick Start Script

echo "🚀 Legal CMS - Frontend Installation"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "===================================="
echo "✅ Installation Complete!"
echo "===================================="
echo ""
echo "📖 Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Login with demo credentials:"
echo "   Email: admin@cms.com"
echo "   Password: password123"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - DEVELOPMENT.md - Development guide"
echo "   - DEPLOYMENT.md - Deployment guide"
echo "   - FILES_REFERENCE.md - File inventory"
echo ""
echo "Happy coding! ⚖️"

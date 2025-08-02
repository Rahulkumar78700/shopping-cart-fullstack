#!/bin/bash

echo "🚀 Shopping Cart Application - Free Hosting Setup"
echo "================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
fi

# Check if files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding and committing files..."
    git add .
    git commit -m "Initial commit: Shopping Cart Application"
fi

echo "✅ Local repository ready"
echo ""

echo "📋 Next Steps:"
echo ""
echo "1. Create GitHub Repository:"
echo "   Option A (Recommended):"
echo "   gh repo create shopping-cart-app --public --source=. --remote=origin --push"
echo ""
echo "   Option B (Manual):"
echo "   - Go to https://github.com/new"
echo "   - Name: shopping-cart-app"
echo "   - Make it Public"
echo "   - Don't initialize with README"
echo "   - Then run: git push -u origin main"
echo ""
echo "2. Deploy to Render (Free Hosting):"
echo "   - Go to https://dashboard.render.com/"
echo "   - Click 'New' → 'Blueprint'"
echo "   - Connect your repository"
echo "   - Click 'Apply'"
echo ""
echo "3. Update Environment Variables:"
echo "   - Go to frontend service in Render"
echo "   - Update REACT_APP_API_URL to your backend URL"
echo ""
echo "🎉 Your app will be live at:"
echo "   - Frontend: https://shopping-cart-frontend.onrender.com"
echo "   - Backend: https://shopping-cart-api.onrender.com"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md" 
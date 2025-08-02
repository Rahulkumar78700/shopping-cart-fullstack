#!/bin/bash

echo "🚀 GitHub Repository Setup for Shopping Cart Application"
echo "========================================================"
echo ""

# Check if git remote already exists
if git remote -v | grep -q origin; then
    echo "✅ Git remote 'origin' already exists"
    echo "Current remote URL: $(git remote get-url origin)"
    echo ""
    echo "To push to existing repository:"
    echo "git push -u origin main"
    exit 0
fi

echo "📋 Manual Steps Required:"
echo ""
echo "1. Go to https://github.com/Rahulkumar78700"
echo "2. Click 'New' or 'Create repository'"
echo "3. Repository name: shopping-cart-app"
echo "4. Description: Shopping Cart Application with Go backend and React frontend"
echo "5. Make it Public (or Private if preferred)"
echo "6. DO NOT initialize with README, .gitignore, or license (we already have these)"
echo "7. Click 'Create repository'"
echo ""
echo "8. After creating the repository, copy the repository URL"
echo "   It will look like: https://github.com/Rahulkumar78700/shopping-cart-app.git"
echo ""
echo "9. Then run these commands:"
echo "   git remote add origin https://github.com/Rahulkumar78700/shopping-cart-app.git"
echo "   git push -u origin main"
echo ""
echo "🔗 Alternative: Use GitHub CLI (if installed)"
echo "   gh repo create Rahulkumar78700/shopping-cart-app --public --source=. --remote=origin --push"
echo ""
echo "📖 After pushing to GitHub, you can deploy to Render using the DEPLOYMENT.md guide" 
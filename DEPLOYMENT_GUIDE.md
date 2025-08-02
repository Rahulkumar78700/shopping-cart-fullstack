# 🚀 Free Hosting Guide - Shopping Cart Application

## Overview
This guide will help you host your shopping cart application online for free using Render.

## Step 1: Create New GitHub Repository

### Option A: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not installed
brew install gh

# Login to GitHub
gh auth login

# Create new repository
gh repo create shopping-cart-app --public --source=. --remote=origin --push
```

### Option B: Manual GitHub Setup
1. Go to https://github.com/new
2. Repository name: `shopping-cart-app`
3. Description: `Shopping Cart Application with Go backend and React frontend`
4. Make it **Public**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Shopping Cart Application"

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Render (Free Hosting)

### Method 1: Blueprint Deployment (Easiest)
1. Go to https://dashboard.render.com/
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `your-username/shopping-cart-app`
4. Render will automatically detect `render.yaml` and create both services
5. Click "Apply" to start deployment

### Method 2: Manual Deployment (More Control)

#### Deploy Backend API
1. Go to https://dashboard.render.com/
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `shopping-cart-api`
   - **Environment**: `Go`
   - **Build Command**: `go mod download && go build -o main .`
   - **Start Command**: `./main`
   - **Plan**: Free
5. Add Environment Variable: `GIN_MODE` = `release`
6. Click "Create Web Service"

#### Deploy Frontend
1. Click "New" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: `shopping-cart-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: Free
4. Add Environment Variable: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
5. Click "Create Static Site"

## Step 4: Update Environment Variables

After both services are deployed:
1. Go to your frontend service in Render
2. Click "Environment" tab
3. Update `REACT_APP_API_URL` to your actual backend URL
4. Save changes (frontend will redeploy automatically)

## Step 5: Test Your Application

### Test Backend
- Visit: `https://your-backend-url.onrender.com/items`
- Should return JSON data with items

### Test Frontend
- Visit your frontend URL
- Test features:
  - Login/Registration
  - Browse items
  - Add to cart
  - Checkout
  - Order history

## Expected URLs

After deployment:
- **Backend**: `https://shopping-cart-api.onrender.com`
- **Frontend**: `https://shopping-cart-frontend.onrender.com`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Render dashboard
   - Verify all dependencies are in `go.mod` and `package.json`

2. **CORS Errors**
   - Backend includes CORS middleware
   - Check `middleware/cors.go` if issues persist

3. **API Connection Issues**
   - Verify `REACT_APP_API_URL` is set correctly
   - Test backend URL directly in browser

4. **Database Issues**
   - App uses SQLite (file-based)
   - For production, consider PostgreSQL

### Check Logs
- Go to service → "Logs" tab
- Look for error messages
- Monitor health checks

## Free Hosting Benefits

✅ **Completely Free**
- No credit card required
- Free tier available
- Automatic deployments

✅ **Easy Setup**
- Git-based deployment
- Automatic builds
- SSL certificates included

✅ **Scalable**
- Can upgrade to paid plans later
- Multiple environments supported

## Next Steps

1. **Monitor Performance**
   - Check response times
   - Monitor error rates

2. **Add Custom Domain** (Optional)
   - Configure custom domain in Render
   - Set up DNS records

3. **Database Migration** (Optional)
   - Consider PostgreSQL for production
   - Better performance and reliability

## Support

If you encounter issues:
1. Check Render documentation
2. Review application logs
3. Test locally to isolate issues
4. Contact Render support

## Quick Commands

```bash
# Create and push to GitHub
gh repo create shopping-cart-app --public --source=. --remote=origin --push

# Or manually
git add .
git commit -m "Initial commit"
git push -u origin main

# Then deploy to Render using the dashboard
```

Your application will be live and accessible to anyone on the internet! 🌐 
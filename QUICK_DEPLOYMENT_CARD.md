# 🚀 Quick Deployment Card

## Your Repository
**GitHub**: https://github.com/Rahulkumar78700/shopping-cart-fullstack

## 🎯 Deployment Steps (5 minutes)

### 1. Go to Render
- Visit: https://dashboard.render.com/
- Login with GitHub account

### 2. Create Blueprint
- Click "New" → "Blueprint"
- Connect: `Rahulkumar78700/shopping-cart-fullstack`
- Click "Apply"

### 3. Wait for Deployment
- Backend: `shopping-cart-api` (2-3 minutes)
- Frontend: `shopping-cart-frontend` (2-3 minutes)

### 4. Update Environment Variable
- Go to frontend service
- Environment tab → `REACT_APP_API_URL`
- Set to: `https://shopping-cart-api.onrender.com`
- Save changes

### 5. Test Your App
- Frontend: `https://shopping-cart-frontend.onrender.com`
- Backend: `https://shopping-cart-api.onrender.com/items`

## ✅ Success Indicators
- Both services show green status
- Backend returns JSON data
- Frontend loads without errors
- Login/cart/checkout works

## 🆘 Quick Fixes
- **Build fails**: Check logs in Render dashboard
- **Frontend errors**: Verify `REACT_APP_API_URL` is correct
- **API errors**: Test backend URL directly

## 📞 Need Help?
- Check `RENDER_DEPLOYMENT_WALKTHROUGH.md` for detailed steps
- Review logs in Render dashboard
- Test locally to isolate issues

**Your app will be live in 5 minutes!** 🎉 
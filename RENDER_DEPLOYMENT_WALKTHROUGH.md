# 🚀 Render Deployment Walkthrough

## Step-by-Step Guide to Deploy Your Shopping Cart App

### Step 1: Access Render Dashboard
1. **Open your browser** and go to: https://dashboard.render.com/
2. **Sign up/Login** with your GitHub account
3. **Authorize Render** to access your repositories when prompted

### Step 2: Create Blueprint Deployment
1. **Click "New"** button in the top right
2. **Select "Blueprint"** from the dropdown
3. **Connect your repository**: `Rahulkumar78700/shopping-cart-fullstack`
4. **Review the configuration** - you should see:
   - Backend API service
   - Frontend static site
5. **Click "Apply"** to start deployment

### Step 3: Monitor Backend Deployment
1. **Wait for services to appear** in your dashboard
2. **Click on the backend service** (`shopping-cart-api`)
3. **Go to "Logs" tab** to watch the build process
4. **Look for these messages**:
   ```
   Build successful
   Starting service
   Server starting on port 8080...
   ```
5. **Wait for status to turn green** (deployed)

### Step 4: Monitor Frontend Deployment
1. **Click on the frontend service** (`shopping-cart-frontend`)
2. **Go to "Logs" tab** to watch the build process
3. **Look for these messages**:
   ```
   npm install
   npm run build
   Build successful
   ```
4. **Wait for status to turn green** (deployed)

### Step 5: Update Environment Variables (CRITICAL)
1. **Go to your frontend service** in Render dashboard
2. **Click "Environment" tab**
3. **Find `REACT_APP_API_URL`**
4. **Update the value** to your actual backend URL:
   ```
   https://shopping-cart-api.onrender.com
   ```
5. **Click "Save Changes"**
6. **Wait for frontend to redeploy** (automatic)

### Step 6: Test Your Application
1. **Test Backend**: Visit `https://shopping-cart-api.onrender.com/items`
   - Should return JSON data with items
2. **Test Frontend**: Visit your frontend URL
   - Test login/registration
   - Test adding items to cart
   - Test checkout process

## 🎯 Expected Results

### Successful Deployment Indicators:
- ✅ Both services show green status
- ✅ Backend returns JSON data at `/items` endpoint
- ✅ Frontend loads without errors
- ✅ Login/registration works
- ✅ Cart functionality works
- ✅ Checkout process works

### Your Live URLs:
- **Frontend**: `https://shopping-cart-frontend.onrender.com`
- **Backend**: `https://shopping-cart-api.onrender.com`

## 🔧 Troubleshooting Common Issues

### Issue 1: Build Failures
**Symptoms**: Red status, build errors in logs
**Solution**: 
- Check build logs for specific errors
- Verify all dependencies are in `go.mod` and `package.json`
- Ensure `render.yaml` is properly formatted

### Issue 2: Frontend Can't Connect to Backend
**Symptoms**: Frontend loads but API calls fail
**Solution**:
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running and accessible
- Test backend URL directly in browser

### Issue 3: CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**:
- Backend includes CORS middleware
- Check `middleware/cors.go` configuration
- Verify frontend and backend URLs are correct

### Issue 4: Database Issues
**Symptoms**: API returns errors about database
**Solution**:
- App uses SQLite (file-based)
- Database is created automatically
- Check backend logs for database errors

## 📊 Monitoring Your Application

### Check Logs:
1. **Go to each service** in Render dashboard
2. **Click "Logs" tab**
3. **Look for errors or warnings**
4. **Monitor performance metrics**

### Health Checks:
- **Backend**: `https://shopping-cart-api.onrender.com/items`
- **Frontend**: Your frontend URL loads without errors

## 🎉 Success Checklist

- [ ] Both services deployed successfully
- [ ] Backend API responding correctly
- [ ] Frontend loading without errors
- [ ] Login/registration working
- [ ] Cart functionality working
- [ ] Checkout process working
- [ ] Environment variables configured
- [ ] Application accessible to users

## 🆘 Need Help?

If you encounter issues:
1. **Check the logs** in Render dashboard
2. **Test locally** to isolate issues
3. **Review this guide** for troubleshooting steps
4. **Contact Render support** if needed

Your shopping cart application will be live and accessible to anyone on the internet! 🌐 
# 🚀 Manual Web Service Deployment Guide

## Deploy Both Services as Individual Web Services

### Step 1: Deploy Backend API (Web Service)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign up/Login with your GitHub account

2. **Create Web Service**
   - Click "New" button
   - Select "Web Service"

3. **Connect Repository**
   - Click "Connect a repository"
   - Select: `Rahulkumar78700/shopping-cart-fullstack`
   - Click "Connect"

4. **Configure Backend Service**
   - **Name**: `shopping-cart-api`
   - **Environment**: `Go`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `go mod download && go build -o main .`
   - **Start Command**: `./main`
   - **Plan**: `Starter` (Free)

5. **Add Environment Variables**
   - Click "Environment" tab
   - Add variable:
     - **Key**: `GIN_MODE`
     - **Value**: `release`

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the service URL (e.g., `https://shopping-cart-api.onrender.com`)

### Step 2: Deploy Frontend (Web Service)

1. **Create Another Web Service**
   - Click "New" → "Web Service" again
   - Connect same repository: `Rahulkumar78700/shopping-cart-fullstack`

2. **Configure Frontend Service**
   - **Name**: `shopping-cart-frontend`
   - **Environment**: `Node`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm start`
   - **Plan**: `Starter` (Free)

3. **Add Environment Variables**
   - Click "Environment" tab
   - Add variables:
     - **Key**: `REACT_APP_API_URL`
     - **Value**: `https://shopping-cart-api.onrender.com` (use your actual backend URL)
     - **Key**: `PORT`
     - **Value**: `3000`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

### Step 3: Monitor Deployments

#### Backend Monitoring:
1. Go to backend service dashboard
2. Click "Logs" tab
3. Look for:
   ```
   Build successful
   Starting service
   Server starting on port 8080...
   ```

#### Frontend Monitoring:
1. Go to frontend service dashboard
2. Click "Logs" tab
3. Look for:
   ```
   npm install
   npm run build
   npm start
   Starting the development server...
   ```

### Step 4: Test Your Application

#### Test Backend:
- Visit: `https://shopping-cart-api.onrender.com/items`
- Should return JSON data with items

#### Test Frontend:
- Visit your frontend URL
- Test features:
  - Login/Registration
  - Browse items
  - Add to cart
  - Checkout

## 🎯 Expected Results

### Successful Deployment:
- ✅ Both services show green status
- ✅ Backend API responding at `/items` endpoint
- ✅ Frontend loading React application
- ✅ Login/cart/checkout functionality working

### Your Live URLs:
- **Backend**: `https://shopping-cart-api.onrender.com`
- **Frontend**: `https://shopping-cart-frontend.onrender.com`

## 🔧 Troubleshooting

### Backend Issues:
- **Build fails**: Check Go dependencies in `go.mod`
- **Port issues**: Backend uses port 8080 (Render sets this automatically)
- **Database errors**: SQLite database is created automatically

### Frontend Issues:
- **Build fails**: Check Node.js dependencies in `package.json`
- **API connection**: Verify `REACT_APP_API_URL` is correct
- **Port issues**: Frontend uses port 3000

### Common Solutions:
1. **Check logs** in each service dashboard
2. **Verify environment variables** are set correctly
3. **Test locally** to isolate issues
4. **Restart services** if needed

## 📊 Service Management

### View Services:
- Go to Render dashboard
- See both services listed
- Click on each to manage

### Update Services:
- Push changes to GitHub
- Services auto-deploy
- Monitor logs for issues

### Environment Variables:
- Can be updated anytime
- Changes trigger auto-redeploy
- No downtime during updates

## 🎉 Success!

Your shopping cart application will be running as two separate web services:
- **Backend API**: Go web service handling all API requests
- **Frontend**: Node.js web service serving the React application

Both services are fully independent, scalable, and professionally hosted! 🌐 
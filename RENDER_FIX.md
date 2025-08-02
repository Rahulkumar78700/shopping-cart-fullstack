# Fixing "No .yaml found" Issue on Render

## Problem
Render is showing "no .yaml found" when trying to deploy using Blueprint.

## Solutions

### Solution 1: Manual Deployment (Recommended)

If the Blueprint method doesn't work, deploy manually:

#### Step 1: Deploy Backend API
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `Rahulkumar78700/shopping-cart-app`
4. Configure:
   - **Name**: `shopping-cart-api`
   - **Environment**: `Go`
   - **Build Command**: `go mod download && go build -o main .`
   - **Start Command**: `./main`
   - **Plan**: Free
5. Add Environment Variables:
   - `GIN_MODE`: `release`
6. Click "Create Web Service"

#### Step 2: Deploy Frontend
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Static Site"
3. Connect your GitHub repository: `Rahulkumar78700/shopping-cart-app`
4. Configure:
   - **Name**: `shopping-cart-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: Free
5. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://shopping-cart-api.onrender.com`
6. Click "Create Static Site"

### Solution 2: Fix Blueprint Deployment

#### Check File Location
The `render.yaml` file must be in the **root directory** of your repository.

#### Verify File Contents
Your `render.yaml` should contain:

```yaml
services:
  - type: web
    name: shopping-cart-api
    env: go
    plan: free
    buildCommand: go mod download && go build -o main .
    startCommand: ./main
    envVars:
      - key: GIN_MODE
        value: release
    healthCheckPath: /items

  - type: web
    name: shopping-cart-frontend
    env: static
    plan: free
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/build
    envVars:
      - key: REACT_APP_API_URL
        value: https://shopping-cart-api.onrender.com
```

#### Alternative File Names
Try these file names:
- `render.yaml` (current)
- `render.yml` (alternative)
- `.render.yaml` (hidden file)

### Solution 3: Repository Structure Check

Ensure your repository structure is correct:

```
shopping-cart-app/
├── render.yaml          ← Must be here (root)
├── render.yml           ← Alternative
├── main.go
├── go.mod
├── frontend/
│   ├── package.json
│   └── src/
└── ...
```

### Solution 4: Force Push to GitHub

If the file exists but Render still can't find it:

```bash
# Make sure you're in the project directory
cd /path/to/shopping-cart-app

# Add and commit the render.yaml file
git add render.yaml render.yml
git commit -m "Add render.yaml for deployment"

# Force push to ensure the file is on GitHub
git push origin main --force
```

### Solution 5: Check GitHub Repository

1. Go to your GitHub repository: `https://github.com/Rahulkumar78700/shopping-cart-app`
2. Verify that `render.yaml` is visible in the root directory
3. Click on the file to ensure it's properly uploaded

## Troubleshooting Steps

### Step 1: Verify File Exists
```bash
ls -la render.yaml
cat render.yaml
```

### Step 2: Check Git Status
```bash
git status
git log --oneline -5
```

### Step 3: Verify on GitHub
- Visit your repository on GitHub
- Check if `render.yaml` is visible in the file list
- Click on the file to view its contents

### Step 4: Try Different Approaches
1. **Manual Deployment** (most reliable)
2. **Blueprint with different file name**
3. **Blueprint after force push**

## Common Issues

### Issue 1: File Not Committed
```bash
# Check if file is tracked
git ls-files | grep render

# If not tracked, add and commit
git add render.yaml
git commit -m "Add render.yaml"
git push origin main
```

### Issue 2: Wrong Branch
```bash
# Ensure you're on main branch
git branch
git checkout main
git push origin main
```

### Issue 3: Repository Connection
- Disconnect and reconnect your repository in Render
- Try connecting with a different GitHub account if needed

## Final Steps

After successful deployment:

1. **Update Environment Variables**:
   - Go to frontend service
   - Update `REACT_APP_API_URL` to your actual backend URL

2. **Test Your Application**:
   - Visit frontend URL
   - Test login, cart, checkout functionality

3. **Monitor Logs**:
   - Check both services' logs for any errors
   - Monitor health checks

## Support

If issues persist:
1. Check Render documentation
2. Contact Render support
3. Use manual deployment method
4. Check GitHub repository structure 
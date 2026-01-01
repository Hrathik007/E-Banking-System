# 🚀 Deployment Guide for E-Banking System

This guide will help you deploy your E-Banking System to Render for free.

## Prerequisites

- GitHub account (your code is already pushed)
- Render account (sign up at [render.com](https://render.com) - it's free!)
- MongoDB Atlas database (already configured)

## Deployment Steps

### Step 1: Sign Up/Login to Render

1. Go to [https://render.com](https://render.com)
2. Sign up using your GitHub account
3. Authorize Render to access your repositories

### Step 2: Deploy Backend (Node.js API)

1. **Create New Web Service**
   - Click "New +" button → "Web Service"
   - Connect your GitHub repository: `Hrathik007/E-Banking-System`
   - Click "Connect"

2. **Configure Backend Service**
   ```
   Name: ebank-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

3. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable")
   ```
   NODE_ENV = production
   PORT = 5000
   MONGO_URI = (paste your MongoDB Atlas connection string from .env)
   JWT_SECRET = (paste your JWT secret from .env)
   CORS_DOMAINS = (leave empty for now, will update after frontend deployment)
   ```

4. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (takes 3-5 minutes)
   - Copy your backend URL (e.g., `https://ebank-backend.onrender.com`)

### Step 3: Deploy Frontend (React/Vite)

1. **Create Static Site**
   - Click "New +" button → "Static Site"
   - Select same repository: `Hrathik007/E-Banking-System`

2. **Configure Frontend Service**
   ```
   Name: ebank-frontend
   Branch: main
   Root Directory: Frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variable**
   - Click "Advanced" → "Add Environment Variable"
   ```
   VITE_API_URL = (paste your backend URL from Step 2, e.g., https://ebank-backend.onrender.com)
   ```

4. **Deploy!**
   - Click "Create Static Site"
   - Wait for build (takes 2-4 minutes)
   - Copy your frontend URL (e.g., `https://ebank-frontend.onrender.com`)

### Step 4: Update CORS Settings

1. Go back to your **Backend Service** on Render
2. Navigate to "Environment" tab
3. Edit the `CORS_DOMAINS` variable:
   ```
   CORS_DOMAINS = https://ebank-frontend.onrender.com
   ```
4. Save changes (backend will automatically redeploy)

### Step 5: Test Your Deployment

1. Visit your frontend URL: `https://ebank-frontend.onrender.com`
2. Login with admin credentials:
   - Email: `admin@ebank.com`
   - Password: `Admin123456`
3. Test all features:
   - ✅ User registration/login
   - ✅ Account creation
   - ✅ Deposits/Withdrawals/Transfers
   - ✅ Voice Banking
   - ✅ AI Financial Assistant
   - ✅ Collaborative Savings Goals

## Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds (cold start)
  - Subsequent requests are fast
- **Frontend**: Always available (static site, no spin down)

### Auto-Deploy
- Both services auto-deploy when you push to GitHub
- Check deployment logs on Render dashboard

### Custom Domain (Optional)
- You can add a custom domain in Render settings
- Both services support custom domains on free tier

## URLs Structure

After deployment, you'll have:
- **Frontend**: `https://ebank-frontend.onrender.com`
- **Backend API**: `https://ebank-backend.onrender.com`
- **API Endpoints**: 
  - User Auth: `https://ebank-backend.onrender.com/api/users/login`
  - Admin: `https://ebank-backend.onrender.com/api/admins/`
  - Accounts: `https://ebank-backend.onrender.com/api/account/`

## Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check deployment logs for errors

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly (no trailing slash)
- Check backend CORS_DOMAINS includes frontend URL
- Open browser console to see network errors

### Database connection fails
- MongoDB Atlas IP whitelist: Add `0.0.0.0/0` to allow all connections
- Verify MONGO_URI is correct in backend environment variables

## Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ebank
JWT_SECRET=your_64_character_secret
CORS_DOMAINS=https://ebank-frontend.onrender.com
```

### Frontend
```
VITE_API_URL=https://ebank-backend.onrender.com
```

## Next Steps After Deployment

1. **Share Your Project**
   - Frontend URL for demo: `https://ebank-frontend.onrender.com`
   - GitHub repo: `https://github.com/Hrathik007/E-Banking-System`

2. **For Interviews**
   - Showcase unique features: Voice Banking, AI Assistant, Savings Goals
   - Explain architecture: MERN stack, JWT auth, MongoDB Atlas
   - Demonstrate responsive design and user flows

3. **Monitor Your App**
   - Check Render dashboard for logs
   - Monitor database usage in MongoDB Atlas

## Cost
**Total: $0/month** ✅
- Render: Free tier (750 hours/month)
- MongoDB Atlas: Free tier (512MB storage)
- Vercel alternative: Free tier available

---

**Need Help?**
- Render Docs: [https://render.com/docs](https://render.com/docs)
- MongoDB Atlas: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

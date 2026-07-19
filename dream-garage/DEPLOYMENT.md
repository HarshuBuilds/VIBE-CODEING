# Deployment Guide

This guide provides step-by-step instructions for deploying Dream Garage to various platforms.

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [AWS Amplify](#aws-amplify)
- [Cloudflare Pages](#cloudflare-pages)
- [Self-Hosting](#self-hosting)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

## Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications and provides the best experience for Dream Garage.

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- A GitHub, GitLab, or Bitbucket account
- Your project pushed to a Git repository

### Step 1: Push to Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/your-username/dream-garage.git

# Push to main branch
git push -u origin main
```

### Step 2: Import Project in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your repository from the list
4. Click "Import"

### Step 3: Configure Project

Vercel will automatically detect that this is a Next.js project and configure the settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or `yarn build`, `pnpm build`)
- **Output Directory**: `.next`
- **Development Command**: `npm run dev`

### Step 4: Add Environment Variables

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

```
NEXT_PUBLIC_APP_NAME=Dream Garage
NEXT_PUBLIC_VERSION=1.0.0
```

### Step 5: Deploy

Click "Deploy" and wait for the build to complete. Once deployed, you'll get a URL like `https://dream-garage.vercel.app`.

### Step 6: Configure Custom Domain (Optional)

1. Go to your project settings
2. Navigate to "Domains"
3. Click "Add Domain"
4. Enter your custom domain (e.g., `dream-garage.com`)
5. Follow the DNS configuration instructions

### Step 7: Enable Automatic Deployments (Optional)

1. Go to your project settings
2. Navigate to "Git"
3. Enable "Automatic Deployments" to deploy on every push

### Vercel Configuration File

Create a `vercel.json` file in the root directory for advanced configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": { "installCommand": "npm install" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## Netlify

### Step 1: Push to Git Repository

Follow the same steps as Vercel to push your project to a Git repository.

### Step 2: Import Project in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Select your Git provider
4. Select your repository
5. Click "Deploy site"

### Step 3: Configure Build Settings

Netlify will try to auto-detect the settings, but you may need to configure:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 or higher

### Step 4: Add Environment Variables

1. Go to your site settings
2. Navigate to "Environment variables"
3. Add the same variables as Vercel

### Step 5: Deploy

Click "Deploy site" and wait for the build to complete.

### Netlify Configuration File

Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  node_version = "18"

[build.environment]
  NEXT_PUBLIC_APP_NAME = "Dream Garage"
  NEXT_PUBLIC_VERSION = "1.0.0"

[[headers]]
  for = "/*"
  [headers.values]
    X-DNS-Prefetch-Control = "on"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

## AWS Amplify

### Step 1: Push to Git Repository

Follow the same steps to push your project to a Git repository.

### Step 2: Connect to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "Connect app"
3. Select your Git provider
4. Select your repository
5. Click "Save and deploy"

### Step 3: Configure Build Settings

AWS Amplify will try to auto-detect Next.js settings. Verify:

- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Node.js version**: 18.x

### Step 4: Add Environment Variables

1. Go to your app settings
2. Navigate to "Environment variables"
3. Add the required variables

### Step 5: Deploy

Click "Save and deploy" and wait for the build to complete.

### AWS Amplify Configuration

Create an `amplify.yml` file in the root directory:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Cloudflare Pages

### Step 1: Push to Git Repository

Follow the same steps to push your project to a Git repository.

### Step 2: Create Project in Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Pages"
3. Click "Create application"
4. Select your Git provider
5. Select your repository
6. Click "Begin setup"

### Step 3: Configure Build Settings

- **Project name**: Dream Garage
- **Production branch**: main
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: (leave empty)

### Step 4: Add Environment Variables

1. In the project setup, go to "Environment variables"
2. Add the required variables

### Step 5: Deploy

Click "Save and Deploy" and wait for the build to complete.

## Self-Hosting

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- A server with SSH access
- A domain name (optional)

### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

### Step 2: Test Locally

```bash
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to test the production build.

### Step 3: Transfer Files to Server

```bash
# Using SCP (replace with your server details)
scp -r .next package.json node_modules public user@your-server:/path/to/dream-garage

# Or using rsync
rsync -avz --delete .next package.json node_modules public user@your-server:/path/to/dream-garage
```

### Step 4: Install Dependencies on Server

```bash
# SSH into your server
ssh user@your-server

# Navigate to the project directory
cd /path/to/dream-garage

# Install production dependencies
npm install --production
```

### Step 5: Run the Application

```bash
# Run in production mode
npm run start
```

### Step 6: Set Up Process Manager (Optional)

Use PM2 to keep the application running:

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name dream-garage -- run start

# Save the process list
pm2 save

# Set up startup script
pm2 startup
```

### Step 7: Set Up Nginx (Optional)

Create an Nginx configuration file:

```nginx
server {
    listen 80;
    server_name dream-garage.com www.dream-garage.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and reload Nginx:

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 8: Set Up SSL (Optional)

Use Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d dream-garage.com -d www.dream-garage.com

# Auto-renew certificates
sudo certbot renew --dry-run
```

## Docker

### Step 1: Create Dockerfile

Create a `Dockerfile` in the root directory:

```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
```

### Step 2: Create docker-compose.yml (Optional)

```yaml
version: '3.8'

services:
  dream-garage:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_APP_NAME=Dream Garage
      - NEXT_PUBLIC_VERSION=1.0.0
    restart: unless-stopped
```

### Step 3: Build and Run

```bash
# Build the Docker image
docker build -t dream-garage .

# Run the container
docker run -p 3000:3000 -d dream-garage

# Or using docker-compose
docker-compose up -d
```

### Step 4: Deploy to Docker Hub

```bash
# Log in to Docker Hub
docker login

# Tag the image
docker tag dream-garage your-username/dream-garage:latest

# Push to Docker Hub
docker push your-username/dream-garage:latest
```

## Troubleshooting

### Common Issues

#### Build Fails

**Error**: "Module not found"
**Solution**: Run `npm install` and ensure all dependencies are installed.

**Error**: "Next.js version mismatch"
**Solution**: Ensure you're using Next.js 15. Check your `package.json`.

**Error**: "Three.js not found"
**Solution**: Install Three.js as a dependency: `npm install three`

#### Deployment Fails

**Error**: "Out of memory"
**Solution**: Increase the memory limit in your deployment platform settings.

**Error**: "Build timeout"
**Solution**: Increase the build timeout in your deployment platform settings.

**Error**: "Environment variables not found"
**Solution**: Ensure all required environment variables are set in your deployment platform.

#### Runtime Issues

**Error**: "3D models not loading"
**Solution**: 
1. Check that the model paths are correct
2. Ensure the models are in the `public/assets/models` directory
3. Verify the models are in GLB or GLTF format

**Error**: "Sounds not playing"
**Solution**:
1. Check that the sound paths are correct
2. Ensure the sounds are in MP3, WAV, or OGG format
3. Verify the browser supports the audio format

**Error**: "Performance is slow"
**Solution**:
1. Optimize 3D models (reduce polygons, use Draco compression)
2. Compress textures
3. Enable LOD (Level of Detail)
4. Reduce the number of simultaneous 3D models

### Debugging

#### Check Build Logs

Most deployment platforms provide build logs. Check these for errors.

#### Local Testing

Test the production build locally:

```bash
npm run build
npm run start
```

#### Browser Console

Open the browser console (F12) to check for runtime errors.

#### Network Tab

Check the Network tab in browser dev tools to ensure assets are loading correctly.

## Performance Optimization

### Before Deployment

1. **Optimize 3D Models**
   - Use Blender to reduce polygon count
   - Apply Draco compression
   - Use GLB format (includes textures)

2. **Compress Textures**
   - Convert to WebP or AVIF
   - Resize to appropriate dimensions
   - Use compression tools

3. **Optimize Sounds**
   - Convert to MP3 or OGG
   - Reduce bitrate
   - Trim unnecessary parts

4. **Enable Code Splitting**
   - Use dynamic imports for heavy components
   - Lazy load 3D models

### After Deployment

1. **Run Lighthouse Audit**
   - Use Chrome DevTools Lighthouse
   - Address any performance issues

2. **Monitor Performance**
   - Use Vercel Analytics or similar
   - Track key metrics

3. **Enable Caching**
   - Configure CDN caching
   - Set appropriate cache headers

## Monitoring

### Vercel Analytics

1. Go to your project in Vercel
2. Navigate to "Analytics"
3. View performance metrics, errors, and more

### Custom Monitoring

Add monitoring to your application:

```typescript
// In your _app.tsx or layout.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      // Send analytics data
      console.log('Page viewed:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
};
```

## Updates

### Updating the Application

1. Make changes to your code
2. Test locally
3. Commit and push to Git
4. The deployment platform will automatically deploy the updates

### Rolling Back

If you need to roll back to a previous version:

1. **Vercel**: Go to "Deployments" and click "Redeploy" on a previous deployment
2. **Netlify**: Go to "Deploys" and click "Deploy" on a previous deploy
3. **Self-Hosting**: Revert to the previous commit and rebuild

## Security

### Environment Variables

Never commit sensitive information to Git. Use environment variables for:
- API keys
- Database credentials
- Secret tokens

### HTTPS

Always use HTTPS in production:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- AWS Amplify: Automatic HTTPS
- Self-Hosting: Set up SSL certificates

### Security Headers

Add security headers in your Next.js configuration:

```typescript
// In next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## Support

If you encounter issues during deployment:

1. **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
2. **Netlify Support**: [https://www.netlify.com/support/](https://www.netlify.com/support/)
3. **AWS Support**: [https://aws.amazon.com/support/](https://aws.amazon.com/support/)
4. **Cloudflare Support**: [https://support.cloudflare.com/](https://support.cloudflare.com/)

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Next.js Documentation](https://vercel.com/docs/next.js)
- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/next-js/)
- [AWS Amplify Next.js Documentation](https://docs.amplify.aws/guides/deploying-nextjs/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)

---

**Happy Deploying!** 🚀

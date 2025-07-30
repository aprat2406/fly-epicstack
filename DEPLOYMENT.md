# Deploying to DigitalOcean App Platform

This guide will help you deploy this Remix application to DigitalOcean App Platform.

## Prerequisites

1. A DigitalOcean account
2. Your code pushed to a GitHub repository
3. Environment variables configured

## Step 1: Prepare Your Repository

1. Update the `.do/app.yaml` file with your GitHub repository details:
   ```yaml
   github:
     repo: your-username/your-repo-name
     branch: main
   ```

2. Make sure all the configuration files are committed to your repository:
   - `.do/app.yaml`
   - `Dockerfile`
   - `.dockerignore`

## Step 2: Set Up Environment Variables

You'll need to configure the following environment variables in DigitalOcean App Platform:

### Required Variables:
- `SESSION_SECRET` - A random string for session encryption
- `INTERNAL_COMMAND_TOKEN` - A random string for internal commands
- `HONEYPOT_SECRET` - A random string for form protection
- `DATABASE_URL` - Will be automatically set by DigitalOcean's database service

### Optional Variables (depending on your features):
- `RESEND_API_KEY` - For email functionality
- `GITHUB_CLIENT_ID` - For GitHub authentication
- `GITHUB_CLIENT_SECRET` - For GitHub authentication
- `GITHUB_REDIRECT_URI` - For GitHub authentication
- `GITHUB_TOKEN` - For GitHub API access
- `AWS_ACCESS_KEY_ID` - For file storage
- `AWS_SECRET_ACCESS_KEY` - For file storage
- `AWS_REGION` - For file storage
- `AWS_ENDPOINT_URL_S3` - For file storage
- `BUCKET_NAME` - For file storage
- `SENTRY_DSN` - For error tracking

## Step 3: Deploy to DigitalOcean App Platform

1. Go to your DigitalOcean dashboard
2. Navigate to "Apps" in the left sidebar
3. Click "Create App"
4. Choose "GitHub" as your source
5. Select your repository and branch
6. DigitalOcean will automatically detect the `.do/app.yaml` configuration
7. Review the configuration and click "Create Resources"

## Step 4: Configure the Database

1. In the app configuration, make sure the database is properly linked
2. The `DATABASE_URL` will be automatically injected into your app
3. Run database migrations by adding this to your build command:
   ```bash
   npm run build && npx prisma migrate deploy
   ```

## Step 5: Verify Deployment

1. Once deployed, visit your app URL
2. Check the health endpoint: `https://your-app.ondigitalocean.app/resources/healthcheck`
3. Monitor the logs in the DigitalOcean dashboard

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Database Connection**: Ensure `DATABASE_URL` is properly set
3. **Port Issues**: The app should listen on port 8080
4. **Environment Variables**: Make sure all required variables are set

### Logs and Debugging:

1. Use the DigitalOcean dashboard to view logs
2. Check the "Runtime Logs" tab for any errors
3. Verify environment variables are correctly set

## Performance Optimization

1. **Instance Size**: Start with `basic-xxs` and scale up as needed
2. **Auto-scaling**: Configure auto-scaling based on your traffic
3. **CDN**: DigitalOcean provides automatic CDN for static assets

## Security Considerations

1. All environment variables marked as `SECRET` are encrypted
2. HTTPS is automatically enabled
3. Rate limiting is configured for security
4. Database connections use SSL

## Monitoring

1. Use DigitalOcean's built-in monitoring
2. Configure alerts for high CPU/memory usage
3. Set up health checks for your application

## Cost Optimization

1. Start with the smallest instance size
2. Use auto-scaling to handle traffic spikes
3. Monitor your usage in the DigitalOcean dashboard
4. Consider using DigitalOcean's managed databases for production 
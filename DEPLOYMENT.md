# Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+
- Environment variables configured
- Backend API deployed
- SSL certificate

### Environment Setup

Create `.env.production.local`:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
AUTH_SECRET=your_secret_key_here
```

### Build & Deploy

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

#### 2. Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t legal-cms .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=your_api_url legal-cms
```

#### 3. Traditional Server (Ubuntu/Linux)

```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone your-repo.git
cd legal-cms

# Install dependencies
npm ci --production

# Build
npm run build

# Setup PM2
npm i -g pm2
pm2 start npm --name "legal-cms" -- start

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default

# Add:
# upstream legal_cms {
#     server localhost:3000;
# }
# 
# server {
#     listen 80;
#     server_name yourdomain.com;
#     
#     location / {
#         proxy_pass http://legal_cms;
#     }
# }

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# Start Nginx
sudo systemctl start nginx
```

### Performance Optimization

1. **Enable Caching**
   ```bash
   # Set proper cache headers in next.config.js
   ```

2. **CDN Setup**
   - Use AWS CloudFront
   - Or Cloudflare
   - Or Vercel's built-in CDN

3. **Database**
   - Use indexed queries
   - Implement connection pooling
   - Regular backups

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor performance (New Relic)
   - Alert on failures

### Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set strong authentication secrets
- [ ] Configure CORS properly
- [ ] Use HTTP security headers
- [ ] Implement rate limiting
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable 2FA for admin accounts
- [ ] Perform penetration testing

### Maintenance

#### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update carefully
npm update
npm audit fix

# Test thoroughly
npm run build
npm start
```

#### Database Backups

```bash
# Daily automated backups
0 2 * * * /path/to/backup-script.sh
```

#### Monitoring & Logs

- Check Nginx/server logs: `/var/log/nginx/`
- Use PM2 logs: `pm2 logs legal-cms`
- Monitor server resources: `top`, `htop`
- Check disk space: `df -h`

### Troubleshooting

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

**Out of Memory**
```bash
# Increase swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

**SSL Issues**
```bash
# Renew SSL certificates
sudo certbot renew
```

### Monitoring & Alerts

#### Health Check Endpoint

Add to `src/app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({ status: 'ok' })
}
```

#### Uptime Monitoring

Use services like:
- UptimeRobot
- StatusPage.io
- Checkly

### Rollback Plan

```bash
# Keep previous builds
git checkout previous-commit
npm run build
npm start
```

### Load Balancing

For high traffic, use:

```
[Load Balancer] ← Nginx/HAProxy
    ↓
[Server 1] [Server 2] [Server 3]
    ↓
[Database]
```

### Cost Optimization

1. Use spot instances for development
2. Auto-scaling groups for prod
3. CDN for static assets
4. Cache aggressively
5. Compress images/assets

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 📊 Monitoring Dashboard

Key metrics to track:

- Response time
- Error rate
- Uptime
- User sessions
- API calls
- Database queries
- Server resources

## 🆘 Support & SLA

- **Response Time**: < 1 hour
- **Uptime Target**: 99.9%
- **Backup Frequency**: Daily
- **Recovery Time**: < 1 hour

---

For detailed support, contact your DevOps team.

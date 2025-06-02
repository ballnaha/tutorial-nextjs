# 🚀 การ Deploy Static Site ไปยัง Shared Hosting

เว็บไซต์ Next.js Tutorial นี้สามารถ build เป็น static site และ deploy ไปยัง shared hosting ได้ 100%

## 📋 ข้อกำหนด

- ✅ เว็บไซต์นี้เป็น static content เท่านั้น (ไม่มี API routes หรือ server-side features)
- ✅ ใช้ Client Components และ Static Generation
- ✅ รองรับการทำงานแบบ offline

## 🛠️ ขั้นตอนการ Build

### 1. Build Static Site

```bash
# Build สำหรับ production
npm run static

# หรือใช้คำสั่งเต็ม
npm run build
```

### 2. ตรวจสอบผลลัพธ์

หลังจาก build เสร็จ จะได้โฟลเดอร์ `out/` ที่มีไฟล์ static ทั้งหมด:

```
out/
├── _next/          # Static assets (CSS, JS)
├── nextjs-basics/  # หน้าบทเรียนต่างๆ
├── index.html      # หน้าแรก
└── ...             # ไฟล์ static อื่นๆ
```

### 3. ทดสอบ Local

```bash
# ทดสอบ static site ใน local
npm run serve

# เปิดเบราว์เซอร์ไปที่ http://localhost:3000
```

## 🌐 การ Deploy ไปยัง Shared Hosting

### 1. Traditional Shared Hosting (cPanel)

1. **Zip โฟลเดอร์ out/**
   ```bash
   cd out
   zip -r ../website.zip .
   ```

2. **อัพโหลดผ่าน cPanel File Manager**
   - เข้า cPanel → File Manager
   - ไปที่ `public_html` (หรือ `www`, `htdocs`)
   - อัพโหลดและแตกไฟล์ `website.zip`
   - ลบไฟล์ zip ที่ไม่ใช้แล้ว

3. **ตั้งค่า .htaccess** (สร้างไฟล์ใน public_html)
   ```apache
   # Redirect all requests to HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

   # Handle client-side routing
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]

   # Cache static assets
   <IfModule mod_expires.c>
     ExpiresActive on
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
   </IfModule>
   ```

### 2. GitHub Pages

1. **สร้าง repository ใน GitHub**
2. **Push code ขึ้น GitHub**
3. **ตั้งค่า GitHub Actions** (.github/workflows/deploy.yml):
   ```yaml
   name: Deploy Static Site
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build static site
           run: npm run static
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

### 3. Netlify

1. **เชื่อมต่อ GitHub repository**
2. **ตั้งค่า Build:**
   - Build command: `npm run static`
   - Publish directory: `out`
3. **Deploy อัตโนมัติ**

### 4. Vercel (แนะนำ)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## ⚙️ การปรับแต่งสำหรับ Subdirectory

หากต้องการใส่เว็บไซต์ใน subdirectory (เช่น yourdomain.com/tutorial):

1. **แก้ไข `next.config.ts`:**
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     basePath: '/tutorial',  // เพิ่มบรรทัดนี้
     assetPrefix: '/tutorial/',
     // ... config อื่นๆ
   };
   ```

2. **Build ใหม่:**
   ```bash
   npm run static
   ```

3. **อัพโหลดไฟล์ไปใน folder `tutorial/`**

## 📊 การตรวจสอบ SEO

หลัง deploy แล้ว ให้ตรวจสอบ:

- ✅ Meta tags ทำงานถูกต้อง
- ✅ Open Graph สำหรับ social sharing
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml (ถ้าต้องการ)

## 🔧 Troubleshooting

### ปัญหาที่อาจพบ:

1. **404 Error บน nested routes:**
   - ตรวจสอบ .htaccess
   - ใช้ `trailingSlash: true` ใน config

2. **CSS/JS ไม่โหลด:**
   - ตรวจสอบ `basePath` และ `assetPrefix`
   - ตรวจสอบ relative paths

3. **Images ไม่แสดง:**
   - ใช้ `images: { unoptimized: true }`
   - ตรวจสอบ path ของรูปภาพ

## 💡 Tips สำหรับ Performance

1. **Enable Gzip Compression:**
   ```apache
   # ใน .htaccess
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/plain
     AddOutputFilterByType DEFLATE text/html
     AddOutputFilterByType DEFLATE text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE application/xml
     AddOutputFilterByType DEFLATE application/xhtml+xml
     AddOutputFilterByType DEFLATE application/rss+xml
     AddOutputFilterByType DEFLATE application/javascript
     AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   ```

2. **CDN Setup** (ถ้ามี):
   ```typescript
   // next.config.ts
   assetPrefix: 'https://your-cdn.com',
   ```

3. **Browser Caching:**
   - ตั้งค่า expires headers ใน .htaccess
   - ใช้ Cache-Control headers

---

🎉 **เสร็จแล้ว!** เว็บไซต์ Next.js Tutorial พร้อม deploy ไปยัง shared hosting แล้วครับ! 
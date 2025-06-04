# Environment Variables Setup Guide

## การตั้งค่า Environment Variables สำหรับ Next.js Tutorial Thai

### ขั้นตอนการสร้างไฟล์ .env.local

1. สร้างไฟล์ `.env.local` ในโฟลเดอร์ root ของโปรเจค
2. คัดลอกเนื้อหาด้านล่างลงในไฟล์ `.env.local`
3. แก้ไขค่าต่างๆ ตามการตั้งค่าของคุณ

### เนื้อหาไฟล์ .env.local

```env
# Environment Variables for Next.js Tutorial Thai
# This file is for local development only - DO NOT commit to git

# Google Analytics
NEXT_PUBLIC_GA_ID=G-RVGWQD59JV

# Database (Prisma) - แก้ไขตามการตั้งค่า database ของคุณ
DATABASE_URL="mysql://root:@localhost:3306/nextjs_tutorial_thai"

# NextAuth.js (สำหรับ authentication ในอนาคต)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here-minimum-32-characters-long

# External APIs (ถ้าจำเป็น - uncomment และใส่ค่าจริง)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email Service (ถ้าจำเป็น - uncomment และใส่ค่าจริง)
# EMAIL_SERVER_HOST=smtp.gmail.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=your-email@gmail.com
# EMAIL_SERVER_PASSWORD=your-app-password
# EMAIL_FROM=noreply@nextjs-tutorial-thai.com

# Upload/Storage (ถ้าจำเป็น - uncomment และใส่ค่าจริง)
# CLOUDINARY_CLOUD_NAME=your-cloudinary-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret

# Development Settings
NODE_ENV=development
```

## คำอธิบาย Environment Variables

### 1. Google Analytics
- `NEXT_PUBLIC_GA_ID`: Google Analytics Measurement ID
- ใช้สำหรับ tracking การใช้งานเว็บไซต์
- ต้องมี prefix `NEXT_PUBLIC_` เพื่อให้ใช้งานได้ใน client-side

### 2. Database (Prisma)
- `DATABASE_URL`: connection string สำหรับเชื่อมต่อฐานข้อมูล
- รูปแบบ: `mysql://username:password@host:port/database_name`
- ตัวอย่าง MySQL ใน XAMPP/Laragon: `mysql://root:@localhost:3306/nextjs_tutorial_thai`

### 3. NextAuth.js
- `NEXTAUTH_URL`: URL ของเว็บไซต์ (production หรือ localhost)
- `NEXTAUTH_SECRET`: secret key สำหรับ JWT tokens (ต้องยาวอย่างน้อย 32 ตัวอักษร)

### 4. External APIs
- Stripe: สำหรับ payment processing
- Email: สำหรับส่งอีเมล
- Cloudinary: สำหรับ image upload และ management

## การใช้งาน

### ใน Development
1. สร้างไฟล์ `.env.local` ตามคู่มือข้างต้น
2. รัน `npm run dev`
3. Google Analytics จะไม่ทำงานใน development mode

### ใน Production
1. ตั้งค่า environment variables ใน hosting platform (Vercel, Netlify, etc.)
2. อัพเดท `NEXTAUTH_URL` เป็น production URL
3. ใช้ production database URL

## การสร้างไฟล์ .env.local ด้วย Command Line

### Windows (PowerShell)
```powershell
# สร้างไฟล์ .env.local
New-Item -Path ".env.local" -ItemType File -Force

# คัดลอกเนื้อหาจากไฟล์นี้ลงใน .env.local
```

### macOS/Linux (Terminal)
```bash
# สร้างไฟล์ .env.local
touch .env.local

# เปิดไฟล์ด้วย text editor
nano .env.local
```

## สิ่งที่ต้องระวัง

⚠️ **อย่า commit ไฟล์ .env.local ขึ้น git repository**
- ไฟล์ .env.local ถูกเพิ่มใน .gitignore แล้ว
- มีข้อมูลสำคัญที่ไม่ควรเปิดเผย

✅ **ตรวจสอบให้แน่ใจว่า:**
- Database connection string ถูกต้อง
- Google Analytics ID ถูกต้อง
- NextAuth secret ยาวพอ (32+ ตัวอักษร)

## Troubleshooting

### ปัญหาที่พบบ่อย:
1. **Database connection failed**: ตรวจสอบ DATABASE_URL และ database server
2. **Google Analytics ไม่ทำงาน**: ตรวจสอบ NEXT_PUBLIC_GA_ID และต้องเป็น production mode
3. **Environment variables ไม่โหลด**: restart development server หลังแก้ไข .env.local 
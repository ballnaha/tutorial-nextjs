# PowerShell script to create .env.local file
Write-Host "Creating .env.local file..." -ForegroundColor Green

$envContent = @"
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
"@

# สร้างไฟล์ .env.local
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host ".env.local file created successfully!" -ForegroundColor Green
Write-Host "Please edit the values according to your setup." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit DATABASE_URL with your database credentials" -ForegroundColor White
Write-Host "2. Generate a secure NEXTAUTH_SECRET (32+ characters)" -ForegroundColor White
Write-Host "3. Uncomment and fill external API keys if needed" -ForegroundColor White 
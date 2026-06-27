<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-7.8.0-2D3748?style=flat&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat" alt="Status">
</div>

<br/>

<div align="center">
  <h1>🔗 لینک‌شکن (Link Shortener Service)</h1>
  <p><strong>سرویس حرفه‌ای کوتاه‌سازی لینک با قابلیت‌های پیشرفته</strong></p>
  <p>✨ <a href="http://localhost:3000">مشاهده دمو</a> ✨</p>
</div>

---

## 📖 درباره پروژه

**لینک‌شکن** یک سرویس کامل برای کوتاه‌سازی لینک‌های بلند است که با استفاده از **Next.js** و **TypeScript** توسعه داده شده است. این پروژه به شما امکان را می‌دهد که لینک‌های طولانی را به آدرس‌های کوتاه و قابل‌اشتراک‌گذاری تبدیل کنید و علاوه بر آن، قابلیت‌های پیشرفته‌ای مانند تنظیم زمان انقضا، کد سفارشی، و نمایش QR Code را نیز در اختیار داشته باشید.

با استفاده از **Prisma ORM** و پایگاه داده **PostgreSQL**، تمام داده‌ها به صورت امن و پایدار ذخیره می‌شوند و سیستم **احراز هویت** مبتنی بر `next-auth` امنیت دسترسی‌ها را تضمین می‌کند. این سرویس به صورت **فول استک** پیاده‌سازی شده و برای استفاده در دستگاه‌های مختلف با **طراحی واکنش‌گرا** بهینه شده است.

---

## ✨ ویژگی‌های کلیدی

### 🔹 مدیریت لینک‌ها
- ✅ **کوتاه‌سازی لینک** - تبدیل لینک‌های بلند به آدرس‌های کوتاه
- ✅ **کد سفارشی ۶ رقمی** - امکان تعیین کد دلخواه برای لینک
- ✅ **ویرایش لینک‌ها** - بروزرسانی لینک اصلی یا کد کوتاه شده
- ✅ **حذف لینک** - پاک کردن لینک‌های غیرضروری از لیست
- ✅ **جستجو** - پیدا کردن سریع لینک‌های ذخیره شده

### 🔹 امکانات پیشرفته
- ⏱️ **زمان انقضا** - تنظیم تاریخ انقضا بر اساس روز، ساعت و دقیقه
- 📊 **شمارش کلیک‌ها** - آمار دقیق تعداد بازدید از هر لینک
- 📱 **QR Code** - تولید کد QR برای لینک کوتاه شده
- ⏳ **تایمر زنده** - نمایش زمان باقیمانده تا انقضای لینک
- 🛡️ **تایید اعتبار** - بررسی معتبر بودن لینک قبل از کوتاه‌سازی

### 🔹 مدیریت و سازماندهی
- 👤 **احراز هویت** - سیستم ورود/خروج امن با Google OAuth
- 🔄 **مسیریابی داینامیک** - هدایت خودکار به لینک اصلی
- 📋 **مرتب‌سازی پیشرفته** - بر اساس تاریخ انقضا، تعداد کلیک، و زمان ساخت
- 🎨 **طراحی واکنش‌گرا** - تجربه کاربری یکپارچه در تمام دستگاه‌ها

---

## 🛠️ تکنولوژی‌های استفاده شده

| شماره | تکنولوژی | نسخه | کاربرد |
|---------|----------|------|---------|
| 1️⃣ | **Next.js** | 16.2.6 | فریم‌ورک اصلی (Full-Stack) |
| 2️⃣ | **React** | 19.2.4 | کتابخانه ساخت رابط کاربری |
| 3️⃣ | **TypeScript** | 5.x | امنیت نوع‌ها و کدنویسی تمیز |
| 4️⃣ | **Prisma** | 7.8.0 | ORM و مدیریت دیتابیس |
| 5️⃣ | **PostgreSQL (`pg`)** | 8.21.0 | پایگاه داده اصلی |
| 6️⃣ | **next-auth** | 5.0.0 | احراز هویت و مدیریت نشست |
| 7️⃣ | **Tailwind CSS** | 4.x | استایل‌دهی و طراحی واکنش‌گرا |
| 8️⃣ | **SWR** | 2.4.1 | کش‌کردن و Polling داده‌ها |
| 9️⃣ | **React QR Code** | 2.2.0 | تولید کدهای QR |
| 🔟 | **Lucide React** | 1.20.0 | مجموعه آیکون‌های مدرن |

---

## 📦 پیش‌نیازها

- **Node.js** نسخه 18 یا بالاتر
- **npm** یا **pnpm** یا **yarn**
- **Docker** و **Docker Compose** (برای اجرای PostgreSQL)

> **نکته:** پروژه با Docker Compose نسخه 3.8+ سازگار است و بر روی تمام نسخه‌های جدید Docker (از 20.10 به بعد) به خوبی کار می‌کند.

---

## 🔧 نصب و راه‌اندازی

### ۱. کلون کردن مخزن

```bash
git clone https://github.com/mojavadb/link-shortener-service.git
cd link-shortener-service
```

### ۲. نصب وابستگی‌ها

```bash
pnpm install
```

### ۳. اجرای پایگاه داده PostgreSQL با Docker

```bash
docker-compose up -d
```

### ۴. تنظیم متغیرهای محیطی

**فایل اول: `.env`** - متغیرهای امن و محرمانه

```env
# اتصال به دیتابیس
DATABASE_URL="postgresql://user:password@localhost:5432/link_shortener"

# کلید امنیتی برای احراز هویت (توسط openssl تولید کنید)
AUTH_SECRET=your-super-secret-key-here
```

**فایل دوم: `.env.local`** - متغیرهای عمومی

```env
# دامنه اصلی برنامه
NEXT_PUBLIC_DOMAIN=http://localhost:3000

# کلیدهای Google OAuth (از Google Cloud Console دریافت کنید)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

<details>
<summary><b>🔐 چگونه AUTH_SECRET تولید کنیم؟</b></summary>

```bash
# با استفاده از OpenSSL
openssl rand -base64 32

# یا با Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
</details>

### ۵. اعمال Migrationهای دیتابیس

```bash
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
```

### ۶. اجرای پروژه در محیط توسعه

```bash
pnpm dev
```

### ۷. باز کردن در مرورگر

```
http://localhost:3000
```

---

## 📁 ساختار پروژه

```
link-shortener-service/
    ├── app/                                # صفحات و مسیرهای Next.js App Router
    │   ├── api/
    │   │   ├── auth/
    │   │   │   └── [...nextauth]/
    │   │   │       └── route.ts           # مسیر احراز هویت next-auth
    │   │   └── short-links/
    │   │       └── route.ts               # API مدیریت لینک‌های کوتاه
    │   ├── auth/
    │   │   └── page.tsx                   # صفحه ورود/خروج
    │   ├── created-links/
    │   │‌─────── page.tsx                  # صفحه نمایش همه لینک ها
    │   │   └── [...slug]/
    │   │       └── page.tsx               # ویرایش هر لینک در صفحه مجزا
    │   ├── s/
    │   │   └── [slug]/
    │   │       └── page.tsx               # مسیریابی داینامیک لینک‌ها
    │   ├── favicon.ico
    │   ├── globals.css                    # استایل‌های سراسری
    │   ├── layout.tsx                     # چیدمان اصلی برنامه
    │   ├── loading.tsx                    # کامپوننت لودینگ
    │   └── page.tsx                       # صفحه اصلی (داشبورد)
    │
    ├── components/                         # کامپوننت‌های React
    │   ├── AdvancedSpinner.tsx            # اسپینر پیشرفته
    │   ├── CreatedListLinks.tsx           # لیست لینک‌های ایجاد شده
    │   ├── DetailClicks.tsx               # نمایش جزئیات کلیک‌ها
    │   ├── Header.tsx                     # هدر برنامه
    │   ├── LinkCard.tsx                   # کارت نمایش لینک
    │   ├── LinkEditor.tsx                 # ویرایشگر لینک
    │   ├── LinkMaker.tsx                  # ساخت لینک جدید
    │   ├── Main.tsx                       # کامپوننت اصلی
    │   ├── ShowResult.tsx                 # نمایش نتیجه
    │   └── UserDropdown.tsx               # منوی کاربری
    │
    ├── lib/                                # کتابخانه‌ها و ابزارها
    │   ├── prisma.ts                      # کلاینت Prisma
    │   ├── prisma/                        # فایل‌های Prisma
    │   │   ├── migrations/                # فایل‌های Migration
    │   │   └── schema.prisma              # مدل‌های دیتابیس
    │   └── node_modules/                  # وابستگی‌های نصب شده
    │
    ├── prisma/                             # پیکربندی Prisma
    │   ├── migrations/                    # فایل‌های Migration
    │   └── schema.prisma                  # مدل‌های دیتابیس
    │
    ├── utils/                              # توابع کمکی
    │   └── urlValidator.ts                # اعتبارسنجی URL
    │
    ├── actions/                            # اکشن‌های سرور
    │   └── deleteUser.ts                  # حذف کاربر
    │
    ├── .env                                # متغیرهای محیطی (محرمانه)
    ├── .env.local                          # متغیرهای محیطی (عمومی)
    ├── .gitignore                          # فایل‌های ignored در Git
    ├── AGENTS.md                           # مستندات برای AI Agents
    ├── auth.ts                             # پیکربندی next-auth
    ├── CLAUDE.md                           # مستندات برای Claude AI
    ├── curl                                # فایل تست curl (اختیاری)
    ├── docker-compose.yml                  # پیکربندی Docker
    ├── eslint.config.mjs                   # تنظیمات ESLint
    ├── eslint.config.json                  # تنظیمات ESLint (JSON)
    ├── EXPLANATION.md                      # توضیحات تکمیلی
    ├── next-env.d.ts                       # تایپ‌های Next.js
    ├── next.config.ts                      # تنظیمات Next.js
    ├── package.json                        # وابستگی‌ها و اسکریپت‌ها
    ├── pnpm-lock.yaml                      # قفل وابستگی‌های pnpm
    ├── pnpm-workspace.yaml                 # تنظیمات workspace pnpm
    ├── postcss.config.mjs                 # تنظیمات PostCSS
    ├── prisma.config.ts                   # تنظیمات Prisma
    ├── prisma.ts                           # کلاینت Prisma (نسخه دیگر)
    ├── proxy.ts                            # تنظیمات پراکسی
    ├── README.md                           # همین فایل
    └── tsconfig.json                       # تنظیمات TypeScript
```
## 📡 مستندات API

<details>
<summary><b>📌 مشاهده تمام Endpointها</b></summary>

| متد | مسیر | توضیح | پارامترها | پاسخ نمونه |
|-----|------|-------|-----------|------------|
| `POST` | `/api/short-links` | ایجاد لینک کوتاه جدید | `{ "inputV": "...", "customCode?": "...", "expiredLeft?": "..." }` |
| `GET` | `/api/short-links` | دریافت لیست لینک‌های کاربر | `{ "links": [...], "total": 100 }` |
| `PUT` | `/api/short-links/[id]` | ویرایش لینک مشخص | `{ "inputV": "...", "customCode?": "...", "endexpire?": "...",  "resetClicks?": "...", "id" : "..." }` |
| `DELETE` | `/api/short-links/[id]` | حذف لینک | - | `{ "message": "Link deleted" }` |
| `GET` | `/s/[shortCode]` | بازدید از لینک کوتاه | - | `301 Redirect` به لینک اصلی |

</details>

---

## 🧪 تست‌ها

در حال حاضر تست‌های خودکاری برای این پروژه نوشته نشده است. در آینده برنامه‌ریزی برای اضافه کردن تست‌های واحد و یکپارچه‌سازی با استفاده از **Jest** و **React Testing Library** انجام خواهد شد.

اگر علاقه‌مند به مشارکت در نوشتن تست‌ها هستید، خوشحال می‌شویم! 🤝

## 🚀 استقرار (Deployment)

### با Vercel و Neon
پایگاه داده خود را در Neon بسازید و لینک نهایی پایگاه داده را در متغیر های محیطی به جای لینک پایگاه داده داکر قرار دهید.
خود برنامه نکست جس را داخل ورسل بارگزاری کنید.

## 🤝 راهنمای مشارکت

از مشارکت شما در بهبود این پروژه استقبال می‌کنیم!

1. **Fork** مخزن را انجام دهید
2. یک **Branch** جدید برای ویژگی خود بسازید:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. تغییرات خود را **Commit** کنید:
   ```bash
   git commit -m '✨ Add amazing feature'
   ```
4. به Branch خود **Push** کنید:
   ```bash
   git push origin feature/amazing-feature
   ```
5. یک **Pull Request** باز کنید

### قوانین مشارکت

- 📏 از **TypeScript** و قواعد ESLint استفاده کنید
- 📝 **مستندات** را در صورت نیاز به‌روز کنید
- 🧹 کد خود را **تمیز** و **خوانا** نگه دارید

---

## 🧑‍💻 توسعه‌دهنده

- **محمد جواد بابایی** - *توسعه‌دهنده اصلی* - [@mojavadb](https://github.com/mojavadb)

---

## 🙏 قدردانی

- **Next.js** تیم - برای فریم‌ورک فوق‌العاده
- **Prisma** - برای ORM قدرتمند
- **Vercel** - برای الهام‌بخشی در استقرار
- **Google Fonts** - برای فونت‌های رایگان

---

## 💡 نکات تکمیلی

### 🔤 فونت‌ها
فونت‌ها از **Google Fonts** بارگزاری می‌شوند. در صورت عدم دسترسی به اینترنت، فقط ظاهر برنامه تحت تأثیر قرار می‌گیرد و عملکرد اصلی تغییری نمی‌کند.

### 🎨 بهبودهای آینده
- ✨ بهبود رابط کاربری و انیمیشن‌ها
- 📊 داشبورد تحلیلی پیشرفته‌تر
- 🌙 حالت تاریک (Dark Mode)
- 📱 اپلیکیشن موبایل PWA

---

## 📞 ارتباط با ما

- 🐛 گزارش باگ: [Issues](https://github.com/mojavadb/link-shortener-service/issues)
- 📧 ایمیل: [ایمیل شما]
- 💬 گفتگو: [لینک گروه/کانال]

---

<div align="center">
  <sub>⭐</sub>
</div>
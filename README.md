# 📎 پروژه کوتاه‌کننده لینک (Link Shortener Service)

این تسک در دو مرحله پیاده سازی شده است. در این branch پروژه فقط به صورت فرانت اند پیاده سازی شده است. در شاخه بعدی پروژه به صورت فول استک پیاده سازی شده است.
در بخش فرانت اند همه تسک های ضروری و اختیاری به جز تست نویسی انجام شده است.
## امکانات

- کوتاه‌سازی لینک‌های بلند
- **کد سفارشی ۶ رقمی** (اختیاری)
- **زمان انقضا** برای لینک‌ها (روز، ساعت، دقیقه)
- **جستجو** در لینک‌های ذخیره شده
- **ذخیره خودکار** به وسلیه Prisma ORM و پایگاه داده Postgresql ذخیره میشود
- **حذف لینک** از لیست
- **نمایش QR Code** لینک کوتاه شده
- **تایمر زنده** برای نمایش زمان باقیمانده
- **تایید اعتبار** لینک قبل از کوتاه‌سازی
- **مسیریابی داینامیک** به لینک اصلی

## تکنولوژی‌ها

| Technology        | Version | Usage           |
| ----------------- | ------- | --------------- |
| Next.js           | 16.2.6  | Framework       |
| React             | 19.2.4  | UI Library      |
| TypeScript        | 5.x     | Type Safety     |
| Tailwind CSS      | 4.x     | Styling         |
| Prisma            | 7.8.0   | ORM             |
| PostgreSQL (`pg`) | 8.21.0  | Database Driver |
| React QR Code     | 2.2.0   | QR generation   |


## نصب و راه‌اندازی

### پیش نیاز ها

- Node.js نسخه 18 یا بالاتر
- npm یا yarn یا pnpm
- docker (برای نصب و اجرای Postgresql)

### مراحل نصب

1. **کلون کردن مخزن**

git clone https://github.com/mojavadb/link-shortener-service.git
cd link-shortener-service

2. **نصب وابستگی ها**

pnpm install (recom)

3. **اجرای پایگاه داده PostgreSQL با Docker**

docker compose up -d

4. **ایجاد فایل های کلید**

در root پروژه دو فایل متغیر محیطی ایجاد کنید.
###
داخل .env کلید مربوط به دیتابیس قرار دهید، مثال:
DATABASE_URL="postgresql://user:password@localhost:5432/link_shortener"
###
داخل .env.local دامنه را مشخص کنید، مثال:
NEXT_PUBLIC_DOMAIN=http://localhost:3000

5. **اعمال Migrationهای پایگاه داده**

pnpm dlx prisma migrate dev
pnpm dlx prisma generate

6. **اجرای پروژه در سیستم لوکال**

pnpm dev (recom)

7. **باز کردن در مرورگر**

http://localhost:3000/

8. **نکات**

فونت‌ها از Google Fonts لود می‌شوند و در صورت نبود اینترنت، فقط ظاهر تحت تأثیر قرار می‌گیرد.

این پیاده سازی به صورت فول استک انجام شده است.

اگر مجددا فرصتی باشد به بهبود رابط کاربری و انیمیشنی کردن ظاهر برنامه میپردازم.

فقط تست نویسی رو انجام ندادم. اگر فرصت داشتم احتمالا اون مورد رو هم انجام میدادم
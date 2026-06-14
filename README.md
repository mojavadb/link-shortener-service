# 📎 پروژه کوتاه‌کننده لینک (Link Shortener Service)

یک سرویس کوتاه‌کننده لینک ساخته‌شده با Next.js + TypeScript که امکان ساخت لینک‌های کوتاه، مدیریت آن‌ها و تولید QR Code را فراهم می‌کند.

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

npm install
#### or
yarn install
#### or
pnpm install (recom)

3. **به وجود آوردن کانتینر داکر برای اجرای پایگاه داده**

docker compose up -d

3. **اجرای پروژه در سیستم لوکال**

npm run dev
#### or
yarn dev
#### or
pnpm dev (recom)

4. **باز کردن در مرورگر**

http://localhost:3000/

5. **نکات**

فونت‌ها از Google Fonts لود می‌شوند و در صورت نبود اینترنت، فقط ظاهر تحت تأثیر قرار می‌گیرد.

این پیاده سازی به صورت فول استک انجام شده است.

تست‌نویسی هنوز انجام نشده و در برنامه توسعه آینده قرار دارد.

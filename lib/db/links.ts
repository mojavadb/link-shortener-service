import { yolodb } from 'yolodb';
import path from 'path';

// چون توی api به این نوع داده نیاز داریم export میکنیم
export interface Link {
  id: string;
  url: string;
  createdAt: Date;
}

// آدرس کامل فایل JSON
const dbPath = path.join(process.cwd(), 'data', 'links.json');
console.log("111111", dbPath);

// ایجاد جدول با کلید اصلی 'id' و داده اولیه خالی
export const linksTable = yolodb<Link>(
  dbPath,      // مسیر فایل
  'id',        // فیلد کلید اصلی
  []           // داده اولیه (آرایه خالی)
);
import { yolodb } from 'yolodb';
import path from 'path';

// چون توی api به این نوع داده نیاز داریم export میکنیم
export interface Link {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt?: number;
}

// آدرس ریکورد ها
const dbPath = path.join(process.cwd(), 'data', 'links.json');
console.log("111111", dbPath);

export const linksTable = yolodb<Link>(
  dbPath, 
  'id', 
  [] 
);
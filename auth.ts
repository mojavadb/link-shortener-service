
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
})


/*
احراز هویت از روش session based (database session):
چون که:

این سیستم با محوریت کاربر است، هر کاربر یک یا
چند لینک میتواند بسازد. باید همه چیز ذخیره شود.

ورود و خروج کاربر ها کاملا کنترل میشود: با حذف
session همه چیز مربوط به کاربر حذف میشود

دسترس کاربران کنترل شده و امن تر است: به دلیل ذخیره
در پایگاه داده

چون که از پریسما استفاده میکنیم باید آداپترش را
هم نصب کنیم
*/

/*
جریان کاری لاگین:
google => auth js => DB (User + session) => cookie
در هر درخواست داریم:
cookie => session lookup in DB => User => access granted
لاگ اوت:
session deleted from Db => cookie cleared
*/

/* 
نقش auth js:
login - session creation - session validation - logout
cookie management
*/
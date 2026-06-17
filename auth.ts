
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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
*/
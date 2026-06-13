// CRUD (Create, Read, Update, Delete) => POST, GET, PUT, DELETE

import { NextRequest, NextResponse } from 'next/server';
import { validateUrl } from '@/utils/urlValidator';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const links = await prisma.linkItem.findMany();
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت لینک های ثبت شده' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputV, customCode, expiredLeft }: { inputV: string, customCode: string, expiredLeft: number } = body;
    const errors: string[] = [];

    // چک کردن فرمت کد نهایی که کاربر داده. باید شش رقمی باشه و همچنین میتونه خالی باشه
    // در ضمن نمیتونه غیر از حروف کوچک و اعداد انگلیسی استفاده کنه
    if (customCode.length !== 6) {
      if (customCode.length !== 0) {
        errors.push("کد نهایی باید شش رقمی باشد");
      }
    } else {
      if (!(/^[a-z0-9]*$/.test(customCode))) {
        errors.push("کاراکتر های کد نهایی باید حروف کوچک و اعداد باشند.");
      }
    }

    // این یک میدل ور برای اعتبار سنجی لینک ورودی است
    if (!validateUrl(inputV).isValid) {
      errors.push(validateUrl(inputV).error || "آدرس مشکل دارد");
    }

    // اینجا چک میکنیم که لینک از قبل تو پایگاه داده ثبت نشده باشه
    const existingUrl = await prisma.linkItem.findFirst({
      where: {
        mainUrl: inputV
      }
    });

    if (existingUrl) {
      errors.push(`این لینک از قبل با کد ${existingUrl?.finalCode} وجود دارد.`);
    }

    // اینجا چک میکنیم که لینک از قبل تو پایگاه داده ثبت نشده باشه
    const existingCode = customCode
      ? await prisma.linkItem.findFirst({
          where: {
            finalCode: customCode
          }
        })
      : null;

    if (existingCode) {
      errors.push("کد نهایی از قبل موجود است.");
    }

    // اگر کاربر کد نهایی رو خودش داده و مشکلی هم نداشته کد نهایی اون رو میزاریم
    // وگرنه:
    // میسازیم کد تصادفی رو که قبلا در پایگاه داده نبوده
    if (errors.length > 0) {
      return NextResponse.json(
        { message: errors },
        { status: 400 }
      );
    }

    let newGeneratedCode: string;

    while (true) {
      newGeneratedCode = customCode?.trim()
        ? customCode
        : Math.random().toString(36).substring(2, 8);

      try {
        const link = await prisma.linkItem.create({
          data: {
            mainUrl: inputV,
            finalCode: newGeneratedCode,
            expiresAt: expiredLeft > 0
              ? new Date(Date.now() + expiredLeft)
              : null,
          },
        });

        return NextResponse.json(
          { code: newGeneratedCode },
          { status: 201 }
        );

      } catch (e: any) {
        if (e.code === "P2002") {
          continue;
        }
        throw e;
      }
    }

  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

// PUT نداریم طبق تسک هایی که در پی دی اف ارسال شدند
// زمانی احتیاج میشود که بخواهیم اطلاعات را به روز رسانی کنیم

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(searchParams, id);

    if (!id) {
      return NextResponse.json(
        { error: 'شناسه ثبت نشده است.' },
        { status: 400 }
      );
    }

    // linksTable.delete(id);

    return NextResponse.json(
      { message: 'لینک حذف شد' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در حذف لینک' },
      { status: 500 }
    );
  }
}
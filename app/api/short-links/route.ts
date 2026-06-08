// CRUD (Create, Read, Update, Delete) => POST, GET, PUT, DELETE

import { NextRequest, NextResponse } from 'next/server';
import { linksTable, Link } from '@/lib/db/links';
import { validateUrl } from '@/utils/urlValidator';

export async function GET() {
  try {
    const links = linksTable.all();
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
    const { inputV } = body;

    // این یک میدل ور برای اعتبار سنجی لینک ورودی است
    if (!validateUrl(inputV).isValid) {
      return NextResponse.json(
        { message: [validateUrl(inputV).error, "inputV"] },
        { status: 400 }
      );
    }

    // اینجا چک میکنیم که لینک از قبل تو پایگاه داده ثبت نشده باشه
    if (linksTable.all().find(link => link.mainUrl === inputV)) {
      return NextResponse.json(
        { message: [`این لینک از قبل با کد ${linksTable.all().find(link => link.mainUrl === inputV)?.finalCode} وجود دارد.`, "inputV"] },
        { status: 400 }
      );
    }

    // اینجا میسازیم کد تصادفی رو که قبلا در پایگاه داده نبوده
    let newGeneratedCode: string = "";
    do {
      newGeneratedCode = Math.random().toString(36).substring(2, 8);
    } while (linksTable.all().some(link => link.finalCode === newGeneratedCode));

    // ساخت و اضافه کردن لینک جدید
    const newUser: Link = {
      id: Date.now().toString(),
      mainUrl: inputV,
      finalCode: newGeneratedCode,
      createdAt: Date.now(),
    };
    linksTable.insert(newUser);

    return NextResponse.json({
      "code": newGeneratedCode
    }, { status: 201 });
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
    console.log(searchParams ,id);
    
    if (!id) {
      return NextResponse.json(
        { error: 'شناسه ثبت نشده است.' },
        { status: 400 }
      );
    }

    linksTable.delete(id);

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
// CRUD (Create, Read, Update, Delete) => POST, GET, PUT, DELETE

import { NextRequest, NextResponse } from 'next/server';
import { linksTable, Link } from '@/lib/db/links';

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
    const { inputV, generatedCode } = body;

    if (!inputV) {
      return NextResponse.json(
        { error: 'لینک اصلی را وارد کنید.' },
        { status: 400 }
      );
    }
    if (!generatedCode){
      return NextResponse.json(
        { error: 'کد تولید نشده است' },
        { status: 400 }
      );
    }

    const newUser: Link = {
      id: Date.now(),
      mainUrl: inputV,
      finalCode: generatedCode,
      createdAt: Date.now(),  
    };

    linksTable.insert(newUser);
    
    return NextResponse.json("لینک جدید ثبت شد", { status: 201 });
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

    if (!id) {
      return NextResponse.json(
        { error: 'شناسه در url ثبت نشده است.' },
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
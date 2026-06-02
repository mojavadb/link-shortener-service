// POST, GET, PUT, DELETE = CRUD (create, Read, Update, Delete)

import { NextRequest, NextResponse } from "next/server";

export async function POST(data : NextRequest) {
    const body = await data.json();
    const { inputV } = body;
    console.log("test");

    return(
        NextResponse.json({
            inputV
        })
    );
}
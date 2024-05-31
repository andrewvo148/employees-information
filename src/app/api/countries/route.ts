import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function GET(request: NextRequest) {
    const countries = await prisma.country.findMany();
    return NextResponse.json({ countries})
}


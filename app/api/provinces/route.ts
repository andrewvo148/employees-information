import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function GET(request: NextRequest) {
    const provinces = await prisma.province.findMany();
    return NextResponse.json({ provinces})
}


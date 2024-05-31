import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function GET(request: NextRequest) {
    const contractTypes = await prisma.ContractType.findMany();
    return NextResponse.json({ contractTypes })
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function GET(request: NextRequest) {
    const laborNatures = await prisma.LaborNature.findMany();
    return NextResponse.json({ laborNatures })
}
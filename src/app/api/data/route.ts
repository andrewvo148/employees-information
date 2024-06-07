import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function GET(request: NextRequest) {
    
    const jobPositions = await prisma.JobPosition.findMany();
    return NextResponse.json({ jobPositions })
}
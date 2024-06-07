import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET(request: NextRequest, { params }: { params: { model: string } }) {
    try {

      const model = params.model;

      // Check if the model exists in Prisma
      if (!(model in prisma)) {
        return NextResponse.json({ error: `Model ${model} does not exist in Prisma schema.` }, { status: 400 });
    }


      const records = await prisma[model].findMany();
      return NextResponse.json({ data: records })
    
    } catch(e) {
        console.error(e);
        return NextResponse.json({ error: 'An error occurred while fetching data.' }, { status: 500 });

    }
   
}

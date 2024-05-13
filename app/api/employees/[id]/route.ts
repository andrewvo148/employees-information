import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET(request: NextRequest, 
  context: { params: { id: string }}) {
    try {
      
      const id = Number(context.params.id);
        console.log(id)

        const employee = await prisma.employee.findUnique({
            where: {
              id: id,
            },
          })
    
        return NextResponse.json({ employee })
    } catch(e) {
        console.error(e)
    }
   
}


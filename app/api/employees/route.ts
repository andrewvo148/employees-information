import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  if (body.id) {
    // Update employee if ID exists
    const employee = await prisma.employee.update({
      where: { id: body.id },
      data: { ...body },
    });
    return NextResponse.json(employee);
  } else {
    // Create new employee if ID doesn't exist
    const newEmployee = await prisma.employee.create({
      data: { ...body },
    });
    return NextResponse.json(newEmployee);
  }
}

export async function GET(request: NextRequest) {
  const employees = await prisma.employee.findMany();
  const total = await prisma.employee.count();
  return NextResponse.json({ total, employees });
}

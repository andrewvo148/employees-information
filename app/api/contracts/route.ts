import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  if (body.id) {
    // Update employee if ID exists

    const { id, jobPositionId, departmentId, laborNatureId, contractTypeId, ...data } = body; // Destructure id from body and store the rest in data
    console.log(data)

    const updateData = {
      ...data,
      jobPosition: jobPositionId ? { connect: { id: jobPositionId } } : undefined,
      department: departmentId ? { connect: { id: departmentId } } : undefined,
      laborNature: laborNatureId ? { connect: { id: laborNatureId } } : undefined,
      contractType: contractTypeId ? { connect: { id: contractTypeId } } : undefined,
      
    };
    const employee = await prisma.employee.update({
      where: { id },
     data: updateData
    });
  
    return NextResponse.json(employee);
  } else {

    const { jobPositionId, departmentId, laborNatureId, contractTypeId, ...data } = body; 
    console.log(data)

    const newData = {
      ...data,
      // Check if jobPositionId is provided and use connect to set the new job position
      jobPosition: jobPositionId ? { connect: { id: jobPositionId } } : undefined,
      department: departmentId ? { connect: { id: departmentId } } : undefined,
      laborNature: laborNatureId ? { connect: { id: laborNatureId } } : undefined,
      contractType: contractTypeId ? { connect: { id: contractTypeId } } : undefined,
    };

    // Create new employee if ID doesn't exist
    const newEmployee = await prisma.employee.create({
      data: { ...newData },
    });
    return NextResponse.json(newEmployee);
  }
}


export async function DELETE(request: NextRequest ) {
  const body = await request.json();
  console.log(body);
  await prisma.employee.deleteMany({
    where: {
      id: {
        in: body.ids
      }
    }}
    )

    return NextResponse.json("success");

}

export async function GET(request: NextRequest) {
  const contracts = await prisma.contract.findMany();
  const total = await prisma.contract.count();
  return NextResponse.json({ total, contracts });
}


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { read, writeFileXLSX, utils, WorkBook } from "xlsx";
import dayjs from 'dayjs';

const format = "YYYY-MM-DD"
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!file) return NextResponse.json({ message: "failure" });

    const isFile = file instanceof File;

    if (!isFile) return NextResponse.json({ message: "failure" });

    const buffer = await file.arrayBuffer();
    const workbook = read(buffer, {cellDates: true});
    workbook.SheetNames.forEach((s) => {
      console.log(s);
    });

    const employeesSheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawData = utils.sheet_to_json(employeesSheet, { header: 1});
    console.log(JSON.stringify(rawData));


    for (const r of rawData.slice(1)) {
        
      let birdDay = null;
      if (r[15]) {
         birdDay = dayjs(r[15], format);
      }

      let identifyNumberIssuedDate = null
      if (r[19]) {
        identifyNumberIssuedDate = dayjs(r[19], format);
      }
       

      let emp = {
        fullName: r[1],
        employeeCode: r[2],
        birthDay: birdDay,
        currentAddress: r[25],
        nativeAddress: r[24],
        mobilePhone:           r[21],
        homePhone:             r[22],
        identifyNumber: r[18],
        identifyNumberIssuedPlace: r[20], 
        identifyNumberIssuedDate: identifyNumberIssuedDate,
        department: {
          connectOrCreate: {
            where: {
              name: r[4],
            },
            create: {
              name: r[4],
            },
          },
        },

        jobPosition: {
          connectOrCreate: {
            where: {
              name: r[3],
            },
            create: {
              name: r[3],
            },
          },
        },
        jobPositionName: r[3],

        gender: {
          connectOrCreate: {
            where: {
              name: r[14],
            },
            create: {
              name: r[14],
            },
          },
        },
        
        genderName: r[14],
      };

      try {
        const employee = await prisma.employee.upsert({
          where: { id: Number(r[0]) },
          update: {
            ...emp,
          },
          create: {
            // id: Number(r[0]),
            ...emp,
            // Add other fields here as per your schema
          },
        });

        console.log(`Upserted employee with id: ${employee.id}`);
      } catch (e) {
        console.log(e);

      }

    }


    return NextResponse.json({ message: "success" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "failure" });
  }
}

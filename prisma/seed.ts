import fs from 'fs';
import csvParser from 'csv-parser'
import prisma from '../src/lib/prisma';


const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
    const records: Promise<void>[] = []; // This will store promises for each row's processing.
    fs.createReadStream('prisma/data.csv')
        .pipe(csvParser())
        .on('data', async (row) => {
            const processRow = async () => {
            try {
                    console.log(row)
                

                    const province = await prisma.province.upsert({
                        where: { id: row.provinceId },
                        update: {},
                        create: {
                            id: row.provinceId,
                            displayName: row.province,
                        },
                    });

                    const district = await prisma.district.upsert({
                        where: { id: row.districtId },
                        update: {},
                        create: {
                            id: row.districtId,
                            displayName: row.district,
                            provinceId: province.id
                        },
                    });



                    const ward = await prisma.ward.upsert({
                        where: { id: row.wardId },
                        update: {},
                        create: {
                            id: row.wardId,
                            displayName: row.ward,
                            districtId: district.id
                        },
                    });

                    console.log('Row inserted successfully:', row);

                    //console.log({ alice });
                } catch (error) {
                    console.error('Error inserting row:', error);
                    //throw new Error(error);
                }
            };

            records.push(processRow()); // Push the promise returned by processRow into the array

        })
        .on('end', async () => {
            await Promise.all(records).then(() => {
                prisma.$disconnect().then(() => {
                    console.log('Seeding completed and database connection closed.');
                });
            }).catch((error) => {
                console.error('Error during database seeding:', error);
                prisma.$disconnect().finally(() => {
                    process.exit(1);
                });
            });
        });
}

main()


//   .then(async () => {
//    // await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//    // await prisma.$disconnect()
//     process.exit(1)
//   })
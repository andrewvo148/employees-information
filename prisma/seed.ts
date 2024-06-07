import fs from 'fs';
import csvParser from 'csv-parser'
import prisma from '../src/lib/prisma';

async function main() {

    let records: any[]=[];

    fs.createReadStream('prisma/data.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            records.push(row);
        })        
    
        .on('end', async () => {
            console.log('end');
            console.log(records.length)

            for (const row of records) {
                const wardId = "VN" + row.provinceId + row.districtId + row.wardId;
                const districtId = "VN" + row.provinceId + row.districtId;
                const provinceId = "VN" + row.provinceId;

                try {
                    const ward = await prisma.ward.create({
                        data: {
                            locationID: wardId,
                            displayName: row.ward,
                            district: {
                                connectOrCreate: {
                                    where: {
                                        locationID: districtId,
                                    },
                                    create: {
                                        locationID: districtId,
                                        displayName: row.district,
                                        province: {
                                            connectOrCreate: {
                                                where: {
                                                    locationID: provinceId,
                                                },
                                                create: {
                                                    locationID: provinceId,
                                                    displayName: row.province,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    console.log('Row inserted successfully:', ward);
                } catch (error) {
                    console.error('Error inserting row:', error);
                }
            }
               
        });

}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
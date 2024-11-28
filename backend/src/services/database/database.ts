import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { exec } from "child_process";
import { drivers } from "./drivers";

interface Drivers {
    id: number;
    name: string;
    description: string;  
    vehicle: string; 
    rating: number;
    comment: string;
    tax: Decimal;
    min_km: number;
}

interface Trip {
    id: number;     
    customer_id: string;  
    origin: string;   
    destination: string;   
    distance: number;    
    duration: string;   
    value: Decimal;    
    driver_id: number;  
    driver_name: string;    
}

const prisma = new PrismaClient();

async function populateDrivers() {
const driversCount = await prisma.drivers.count();
    if (driversCount === 0) {
        console.log('Populando banco com motoristas iniciais...');

        // Cria os motoristas iniciais
        await prisma.drivers.createMany({
            data: drivers
        });

        console.log('Motoristas iniciais criados com sucesso!');
    } else {
        console.log('Motoristas já existentes no banco .');
    }
}

// migra o schema do prisma para o banco de dados para criar as tabelas de acordo com o schema
exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error applying migrations: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
    }
    console.log(`Migrations applied successfully: ${stdout}`);
    populateDrivers();
});

// busca a lista de motoristas 
async function getDrivers(): Promise<Drivers[]>{
    return await prisma.drivers.findMany();
}

// busca a lista de motoristas 
export async function getDriversByDistance(distance: number): Promise<Drivers[]>{
    const distanceInK = distance / 1000;
    return await prisma.drivers.findMany({
        where:{
            min_km: {
                lt: Number(distanceInK)
            }
        }
    });
}

// salva os dados da viajem
export async function saveTrip(trip: Trip){
    return await prisma.trip.create({
        data: trip
    });
}

// // get user by id
// export async function getUserById(id: number) {
//     return await prisma.user.findUnique({
//         where: {
//             id: id,
//         },
//     });
// }

// // update user
// export async function updateUser(id: number, user: User) {
//     return await prisma.user.update({
//         where: {
//             id: id,
//         },
//         data: user,
//     });
// }

// // delete user
// export async function deleteUser(id: number) {
//     return await prisma.user.delete({
//         where: {
//             id: id,
//         },
//     });
// }


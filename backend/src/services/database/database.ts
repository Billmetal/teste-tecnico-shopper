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
    id?: number;    
    customer_id: string;  
    origin: string;   
    destination: string;   
    distance: number;    
    duration: string;   
    value: Decimal;    
    driver_id: number;  
    driver_name: string; 
    date?: Date;   
}

interface CheckDriver {
    id?: number;
    name?: string;
}

interface HasDriver {
    exist: boolean;
    min_km: number;
}

interface CustomerDriverId {
    customer_id: string;
    driver_id: number;
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
export async function getDrivers(): Promise<Drivers[]>{
    return await prisma.drivers.findMany();
}

// busca a lista de motoristas 
export async function getDriversByDistance(distance: number): Promise<Drivers[]>{
    const drivers: Drivers[] =  await prisma.drivers.findMany();
    return drivers.filter(driver => driver.min_km < (distance / 1000));
}

// Verifica se um motorista existe e retorna sua quilometragem mínima
export async function driverExists(checkDriver: CheckDriver): Promise<HasDriver> {
    const driver = await prisma.drivers.findUnique({
        where: {
            id: checkDriver.id,
            name: checkDriver.name
        }
    });
    return driver ? {exist: true, min_km: driver.min_km} : {exist: false, min_km: 0};
}

// salva os dados da viajem
export async function saveTrip(trip: Trip){
    return await prisma.trip.create({
        data: trip
    });
}

// retorna a lista de viajens de um user
export async function getTripsByUserId(id: string): Promise<Trip[]> {
    const trip: Trip[] =  await prisma.trip.findMany({
        where: {
            customer_id: id,
        },
    });
    return trip;
}

// retorna a lista de viajens de um user com um motorista
export async function getTripsByUserAndDriverId(userDriver: CustomerDriverId): Promise<Trip[]> {
    const trip: Trip[] =  await prisma.trip.findMany({
        where: {
            customer_id: userDriver.customer_id,
            AND: {
                driver_id: userDriver.driver_id
            }
        },
    });
    return trip;
}


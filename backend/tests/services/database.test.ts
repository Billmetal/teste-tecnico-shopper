import { Decimal } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client";

interface Drivers {
    name: string;
    description: string;  
    vehicle: string; 
    rating: number;
    comment: string;
    tax: Decimal;
    min_km: number;
}

interface CheckDriver {
    id?: number;
    name?: string;
}

interface Trip {     
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

function isDriversList(data: any): data is Drivers[] {
    return Array.isArray(data);
}

function isTripList(data: any): data is Trip[] {
    return Array.isArray(data);
}

describe("verifica se a tabela de motoristas está populada", () => {
    const prismaTest = new PrismaClient();
    it("Deve buscar uma lista de motoristas no banco de dados", async () => {
        const data = await prismaTest.drivers.findMany();;
        expect(isDriversList(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);
    });

    it("getDriversByDistance deve retornar uma lista de motoristas filtrada por Km menor 1500 m", async () => {
        const drivers: Drivers[] =  await prismaTest.drivers.findMany(); 
        const filteredDrivers: Drivers[] =  drivers.filter(driver => driver.min_km < (1500 / 1000));
        filteredDrivers.forEach(element => {
            expect(element.min_km).toBeLessThanOrEqual((1500 / 100));
        });
    });

    it("deve buscar um motorista pelo id ou nome", async () => {
        const checkDriver: CheckDriver = {id: 5, name: "Gustavo"}
        const driver = await prismaTest.drivers.findUnique({
            where: {
                id: checkDriver.id,
                name: checkDriver.name
            }
        });
        expect(driver).toBeDefined();
    });

    it("verifica a lista de Trip feitas pelo customer_id", async () => {
        const trips = await prismaTest.trip.findMany({
            where: {
                customer_id: "",
            },
        });
        expect(isTripList(trips)).toBeTruthy();
    });

    afterAll(async () => {
        await prismaTest.$disconnect(); 
    });
});
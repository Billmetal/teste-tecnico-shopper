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

function isDriversList(data: any): data is Drivers[] {
    return Array.isArray(data);
} 

describe("verifica se a tabela de motoristas está populada", () => {
    const prismaTest = new PrismaClient();
    it("Deve buscar uma lista de motoristas no banco de dados", async () => {
        const data = await prismaTest.drivers.findMany();;
        expect(isDriversList(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);
        console.log("Teste Data = "+data);
    });

    it("getDriversByDistance deve retornar uma lista de motoristas filtrada por Km menor 1500 m", async () => {
        const drivers: Drivers[] =  await prismaTest.drivers.findMany(); 
        const filteredDrivers: Drivers[] =  drivers.filter(driver => driver.min_km < (1500 / 1000));
        filteredDrivers.forEach(element => {
            expect(element.min_km).toBeLessThanOrEqual((1500 / 100));
        });
        console.log("Teste Filtro = "+filteredDrivers);
    });

    afterAll(async () => {
        await prismaTest.$disconnect(); 
    });
});
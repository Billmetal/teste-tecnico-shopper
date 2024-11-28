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
    it("getDrivers deve retornar uma lista de motoristas", async () => {
        const data = await prismaTest.drivers.findMany();;
        expect(isDriversList(data)).toBeTruthy();
    });

    afterAll(async () => {
        await prismaTest.$disconnect(); 
    });
});
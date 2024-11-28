import request from "supertest";
import { checkEstimateDataIn }  from "../../src/utils/utils";
import app from "../../src";
import { exec } from "child_process";

interface EstimateBody {
    customer_id?: string; 
    origin?: string; 
    destination?: string;
}

interface EstimateError {
    error_code: string;
    error_description: string;
}

interface LatLong {
    latitude: number;
    longitude: number;
}

interface Review {
    rating: number;
    comment: string;
}

interface Driver {
    id: number; 
    name: string; 
    description: string; 
    vehicle: string; 
    review: Review; 
    value: number;
}

interface MapResponse {
    origin: LatLong; 
    destination: LatLong;
    distance: number; 
    duration: string;
    routeResponse: object;
}

interface EstimateResponse {
    response: MapResponse;
    options: Driver[];
}

// mocka a função exec
jest.mock("child_process", () => ({
    exec: jest.fn(),
}));

function isEstimateError(data: any): data is EstimateError {
    return (
        typeof data.error_code === 'string' &&
        typeof data.error_description === 'string'
    );
}

function isEstimateResponse(data: any): data is EstimateResponse {
    return (
        typeof data.response.duration === 'string' &&
        typeof data.response.destination === "object" && 
        typeof data.response.routeResponse === "object" &&
        typeof data.options[0].value === "number"
    );
}  

describe("Impedindo prisma migrate", () => {
    it("não deve executar o prisma migrate", () => {
        expect(exec).not.toHaveBeenCalled();
    });
});

describe('Testes de verificação de entrada de EstimateBody para o método checkEstimateDataIn', () => {
    it('entrada sem valor ', () => {
        expect(checkEstimateDataIn({})).toBeFalsy();
    });

    it('entradas customer_id , origin e destination em branco ', () => {
        expect(checkEstimateDataIn({customer_id: "", origin: "", destination: ""})).toBeFalsy();
    });

    it('entrada customer_id não informado ', () => {
        expect(checkEstimateDataIn({origin: "origin address", destination: "destination address"})).toBeFalsy();
    });

    it('entrada origin não informado ', () => {
        expect(checkEstimateDataIn({customer_id: "customer_id",  destination: "destination address"})).toBeFalsy();
    });

    it('entrada destination não informado  ', () => {
        expect(checkEstimateDataIn({customer_id: "customer_id", origin: "origin address"})).toBeFalsy();
    });

    it('entradas origin e destination iguais ', () => {
        expect(checkEstimateDataIn({customer_id: "customer_id", origin: "address 2 ", destination: " Address 2"})).toBeFalsy();
    });

    it('entradas customer_id , origin e destination corretas ', () => {
        expect(checkEstimateDataIn({customer_id: "customer_id", origin: "origin address", destination: "destination address"})).toBeTruthy();
    });
});

describe("Teste para a rota /ride/estimate", () => {
    it('Verificando retorno de erro para problemas de entrada 1 ', async () => {
        const body: EstimateBody = { };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(400);
        expect(isEstimateError(response.body)).toBeTruthy();
    });

    it('Verificando retorno de erro para problemas de entrada 2 ', async () => {
        const body: EstimateBody = { customer_id: "customer_id", origin: "origin address" };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(400);
        expect(isEstimateError(response.body)).toBeTruthy();
    });

    it('Verificando retorno de erro para problemas de entrada 3 ', async () => {
        const body: EstimateBody = { customer_id: "customer_id", origin: "address 2 ", destination: " Address 2" };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(400);
        expect(isEstimateError(response.body)).toBeTruthy();
    });

    it('Verificando retorno de sucesso ', async () => {
        const body: EstimateBody = { customer_id: "customer_id", origin: "Avenida Paulista 900", destination: "Avenida Faria Lima 1200" };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(200);
        expect(isEstimateResponse(response.body)).toBeTruthy();
    });
});
import app from "../src";
import request from "supertest";

interface TripsParams {
    customer_id: string;
    driver_id?: string;
}

interface TripsError {
    error_code: string;
    error_description: string;
}

interface Driver {
    id: number; 
    name: string;
}

interface Rides {
    id: number; 
    date: Date; 
    origin: string; 
    destination: string; 
    distance: number; 
    duration: string; 
    driver: Driver;
    value: number; 
}

interface TripsResponse {
    customer_id: string; 
    rides: Rides[];
}

function isSuccessResponse(resp: any): resp is TripsResponse {
    return resp.customer_id === "string" && 'rides' in resp && Array.isArray(resp.rides);
}   
  
function isErrorResponse(resp: any): resp is TripsError {
    return resp.error_code === "string" && resp.error_description === 'string';
}

describe("Teste para a rota /ride/{customer_id}?driver_id={driver_id}", () => {
    it("Verifica se customer_id em branco retorna error", async () => {
        const params: TripsParams = {customer_id: ""};
        const response = await request(app).get(`/ride/${params.customer_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveReturnedWith<TripsError>({error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado"});
    });

    it("Verifica se retorna a lista de Trips para o customer_id  ou se estiver vazia retorna NO_RIDES_FOUND", async () => {
        const params: TripsParams = {customer_id: "ssdvdvfvdv"};
        const response = await request(app).get(`/ride/${params.customer_id}`);
        if(isSuccessResponse(response.body)){
            expect(response.status).toBe(200);
            expect(response.body).toHaveReturnedWith<TripsResponse>();
            expect(response.body).toHaveProperty("customer_id");
            expect(response.body.rides).toHaveReturnedWith<Rides[]>();
        }
        if(isErrorResponse(response.body)){
            expect(response.status).toBe(404);
            expect(response.body).toHaveReturnedWith<TripsError>({error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado"});
        }
    });

    it("Verifica se um driver_id inválido retorna error de INVALID_DRIVER", async () => {
        const params: TripsParams = {customer_id: "ssdvdvfvdv", driver_id: "-50"};
        const response = await request(app).get(`/ride/${params.customer_id}?driver_id=${params.driver_id}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveReturnedWith<TripsError>({error_code: "INVALID_DRIVER", error_description: "Motorista invalido"});
        params.driver_id = "10000";
        const responseB = await request(app).get(`/ride/${params.customer_id}?driver_id=${params.driver_id}`);
        expect(responseB.status).toBe(400);
        expect(responseB.body).toHaveReturnedWith<TripsError>({error_code: "INVALID_DRIVER", error_description: "Motorista invalido"});
    });
});
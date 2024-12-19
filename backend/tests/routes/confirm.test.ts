import app from "../src";
import { checkTripDataIn } from "../src/utils/utils";
import request from "supertest";

interface Trip {    
    customer_id: string;  
    origin: string;   
    destination: string;   
    distance: number;    
    duration: string; 
    driver: {
        id: number;
        name: string;
    };
    value: number;        
}

interface CheckError {
    success?: boolean;
    status?: number;
    error_code?: string;
    error_description?: string;
}

interface ConfirmError {
    error_code: string;
    error_description: string;
}


describe('Testes de verificação de entrada de Trip para o método checkTripDataIn', () => {
    it('origin e destination recebidos não podem estar em branco ', () => {
        const entryData: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "", distance: 1500,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 400, 
            error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        });
        entryData.origin = "";
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 400, 
            error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        });
    });

    it('O customer_id não pode estar em branco ', () => {
        const entryData: Trip = {
            customer_id: "", origin: "Address origin", destination: "Address destination", distance: 1500,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 400, 
            error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        });
    });

    it('O origin e destination recebidos não podem ser iguais', () => {
        const entryData: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address origin", distance: 1500,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 400, 
            error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        });
    });

    it('Informação do motorista informada tem que ser válida', () => {
        const entryData: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 1500,
            duration: "35 min",driver: {id: 50, name: ""}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 404, 
            error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado"
        });
        entryData.driver.id = -5;
        entryData.driver.name = "Paulo";
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 404, 
            error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado"
        });
    });

    it('Quilometragem informada deve ser válida', () => {
        const entryData: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 0,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: false, status: 406, 
            error_code: "INVALID_DISTANCE", error_description: "Quilometragem inválida para o motorista"
        });
    });

    it('todas informações corretas e retorno de sucesso ', () => {
        const entryData: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 1500,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        expect(checkTripDataIn(entryData)).toHaveReturnedWith<CheckError>({ success: true });
    });
});

describe("Teste para a rota /ride/confirm", () => {
    it('Verificando retorno de erro para problemas de entrada vazia ', async () => {
        const body = { };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(400);
        expect(response.body).toHaveReturnedWith<ConfirmError>({error_code: "INVALID_DATA",error_description: "Os dados fornecidos no corpo da requisição são inválidos"});
    });

    it('Verificando retorno de erro para problemas de entrada sem destination ', async () => {
        const body: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "", distance: 1500,
            duration: "35 min",driver: {id: 50, name: "Mariana"}, value: 32.15
        };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(400);
        expect(response.body).toHaveReturnedWith<ConfirmError>({error_code: "INVALID_DATA",error_description: "Os dados fornecidos no corpo da requisição são inválidos"});
    });

    it('Verificando retorno de erro para problemas de entrada de motorista ', async () => {
        const body: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 1500,
            duration: "35 min",driver: {id: -10, name: ""}, value: 32.15
        };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(404);
        expect(response.body).toHaveReturnedWith<ConfirmError>({error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado"});
    });

    it('Verificando retorno de problemas de distancia ', async () => {
        const body: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 1000,
            duration: "15 min",driver: {id: 3, name: "Ricardo"}, value: 32.15
        };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(406);
        expect(response.body).toHaveReturnedWith<ConfirmError>({error_code: "INVALID_DISTANCE", error_description: "Quilometragem inválida para o motorista"});
    });

    it('Verificando retorno de sucesso ', async () => {
        const body: Trip = {
            customer_id: "iiasbdubssdsnd", origin: "Address origin", destination: "Address destination", distance: 2600,
            duration: "15 min",driver: {id: 3, name: "Ricardo"}, value: 32.15
        };
        const response = await request(app).post("/ride/estimate").send(body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveReturnedWith({success: true});
    });
});
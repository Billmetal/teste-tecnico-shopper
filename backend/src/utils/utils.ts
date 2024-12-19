import { Decimal } from "@prisma/client/runtime/library";

interface EstimateBody {
    customer_id?: string; 
    origin?: string; 
    destination?: string;
}

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
    success: boolean;
    status?: number;
    error_code?: string;
    error_description?: string;
}

/* Método que verifica se os endereços de origem e destino recebidos estão em branco, 
    se o id do usuário está em branco e se os endereços de origem e destino são iguais*/
export function checkEstimateDataIn(body: EstimateBody): boolean{
    if(body.origin === undefined || body.origin === ""){
        return false;
    }

    if(body.destination === undefined || body.destination === ""){
        return false;
    }

    if(body.customer_id === undefined || body.customer_id === ""){
        return false;
    }

    if(body.origin.toLowerCase().trim() === body.destination.toLowerCase().trim() ){
        return false;
    }

    return true;
}

// Método de cálculo de valor baseado na taxa sobre a distância
export function calculateValue(tax_km: Decimal, distancie: number): number {
    const distancieKm = new Decimal(distancie).div(1000);
    const value = tax_km.times(distancieKm);
    return parseFloat(value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toString());
}

/** Método que verifica se os endereços de origem e destino, e o id do usuário estão em branco, 
    Verifica se a origem e destino são iguais, Se um motorista é uma opção válida, e se a quilometragem informada 
    é válida para o motorista selecionado.*/
export function checkTripDataIn(body: Trip): CheckError {
    if(body.origin === undefined || body.origin === "" || body.destination === undefined || body.destination === "" || 
        body.customer_id === undefined || body.customer_id === "" || body.origin.toLowerCase().trim() === body.destination.toLowerCase().trim()) {
        return { 
            success: false,
            status: 400, 
            error_code: "INVALID_DATA", 
            error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        };
    }

    if(body.driver.id === null || body.driver.id === undefined || typeof body.driver.id !== "number" || body.driver.id < 0 || body.driver.name === null || 
        typeof body.driver.name !== "string" || body.driver.name === undefined || body.driver.name === "") {
        return { 
            success: false,
            status: 404, 
            error_code: "DRIVER_NOT_FOUND", 
            error_description: "Motorista não encontrado"
        };
    }

    if(body.distance === null || body.distance === undefined || typeof body.distance !== "number" || body.distance <= 0 ) {
        return { 
            success: false,
            status: 406, 
            error_code: "INVALID_DISTANCE", 
            error_description: "Quilometragem inválida para o motorista"
        };
    }

    return {
        success: true
    };
} 
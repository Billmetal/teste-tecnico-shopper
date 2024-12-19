import { Router, Request, Response } from 'express';
import { driverExists, saveTrip } from '../services/database/database';
import { Decimal } from '@prisma/client/runtime/library';
import { checkTripDataIn } from '../utils/utils';

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

interface ConfirmCheck {
    success?: boolean;
    status?: number;
    error_code?: string;
    error_description?: string;
}

interface ConfirmError {
    error_code: string;
    error_description: string;
}

interface Driver {
    id?: number;
    name?: string;
}

interface HasDriver {
    exist: boolean;
    min_km: number;
}

const routerConfirm = Router();

// rota que recebe os detalhes da viajem associado ao id do user e salva no banco
routerConfirm.patch("/confirm", async (req: Request, res: Response): Promise<any> => {
    const body: Trip = req.body;
    const entryData: ConfirmCheck = checkTripDataIn(body);
    if(entryData.success){
        const driver: Driver = { id: body.driver.id, name: body.driver.name };
        const hasDriver: HasDriver = await driverExists(driver);
        if(hasDriver.exist){
            if(hasDriver.min_km <= (body.distance / 1000)) {
                return await saveTrip({
                    customer_id: body.customer_id,
                    origin: body.origin,
                    destination: body.destination,
                    distance: body.distance,
                    duration: body.duration, 
                    driver_id: body.driver.id, 
                    driver_name: body.driver.name, 
                    value: new Decimal(body.value)
                }).then(() => {
                    return res.status(200).json({success: true});
                }).catch((error: Error) => {
                    const dbError: ConfirmError = {error_code: "ERROR", error_description: error.message};
                    return res.status(500).json(dbError);
                });
            } else {
                const lowDistance: ConfirmError = {error_code: "INVALID_DISTANCE", error_description: "Quilometragem inválida para o motorista"};
                return res.status(406).json(lowDistance);
            } 
        } else {
            const noDriver: ConfirmError = {error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado"};
            return res.status(404).json(noDriver);
        }
    } else {
        const confirmError: ConfirmError = {error_code: entryData.error_code!, error_description: entryData.error_description!};
        return res.status(entryData.status!).json(confirmError);
    }
});

export default routerConfirm;
import { Decimal } from '@prisma/client/runtime/library';
import { Router, Request, Response } from 'express';
import { saveTrip } from '../services/database/database';

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

const routerConfirm = Router();

// rota que recebe os detalhes da viajem associado ao id do user e salva no banco
routerConfirm.patch("/confirm", async (req: Request, res: Response) => {
    const body: Trip = req.body;
    return await saveTrip(body).then(() => {
        const success: boolean = true;
        res.status(200).json(success);
    }).catch((error: Error) => {
        res.status(500).json({ message: error.message });
    });
});

export default routerConfirm;
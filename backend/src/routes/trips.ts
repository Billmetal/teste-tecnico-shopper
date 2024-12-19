import { Decimal } from '@prisma/client/runtime/library';
import { Router, Request, Response } from 'express';
import { driverExists, getTripsByUserAndDriverId, getTripsByUserId } from '../services/database/database';

interface TripsParams {
    customer_id: string;
    driver_id?: string;
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

interface TripsError {
    error_code: string;
    error_description: string;
}

interface HasDriver {
    exist: boolean;
    min_km: number;
}

const routerTrips = Router();

routerTrips.get("/:customer_id", async (req: Request, res: Response): Promise<any> =>{
    const tripsParams: TripsParams = { customer_id: req.params.customer_id, driver_id: req.query.driver_id as string };
    if(tripsParams.customer_id === null || tripsParams.customer_id === undefined || tripsParams.customer_id === "" ){
        const noId: TripsError = {error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado"};
        return res.status(404).json(noId);
    }
    if(tripsParams.driver_id){
        const hasDriver: HasDriver = await driverExists({ id: Number(tripsParams.driver_id) });
        if(hasDriver.exist){
            const trips: Trip[] = await getTripsByUserAndDriverId({ customer_id: tripsParams.customer_id, driver_id: Number(tripsParams.driver_id) });
            if(trips.length === 0){
                const noTrips: TripsError = {error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado"};
                return res.status(404).json(noTrips);
            } else {
                const response: TripsResponse = {customer_id: tripsParams.customer_id,
                    rides: trips.map<Rides>(trip => ({
                        id: trip.id!,
                        date: trip.date!,
                        origin: trip.origin,
                        destination: trip.destination,
                        distance: trip.distance,
                        duration: trip.duration,
                        value: trip.value.toNumber(),
                        driver: {
                            id: trip.driver_id,
                            name: trip.driver_name
                        }
                    })).sort((a, b) => b.date.getTime() - a.date.getTime())
                };
                return res.status(200).json(response);
            }
        } else {
            const noDriver: TripsError = {error_code: "INVALID_DRIVER", error_description: "Motorista invalido"};
            return res.status(400).json(noDriver);
        }
    } else {
        const trips: Trip[] = await getTripsByUserId(tripsParams.customer_id);
        if(trips.length === 0){
            const noTrips: TripsError = {error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado"};
            return res.status(404).json(noTrips);
        } else {
            const response: TripsResponse = {customer_id: tripsParams.customer_id,
                rides: trips.map<Rides>(trip => ({
                    id: trip.id!,
                    date: trip.date!,
                    origin: trip.origin,
                    destination: trip.destination,
                    distance: trip.distance,
                    duration: trip.duration,
                    value: trip.value.toNumber(),
                    driver: {
                        id: trip.driver_id,
                        name: trip.driver_name
                    }
                })).sort((a, b) => b.date.getTime() - a.date.getTime())
            };
            return res.status(200).json(response);
        }
    }
});

export default routerTrips;
import { Router, Request, Response } from 'express';
import { checkEstimateDataIn, calculateValue } from '../utils/utils';
import { calculateRoute } from '../services/map_api/mapapi';
import { getDriversByDistance } from '../services/database/database';

interface EstimateBody {
    customer_id: string; 
    origin: string; 
    destination: string;
}

interface EstimateError {
    error_code: string;
    error_description: string;
}

interface MapDistance {
    origin: string; 
    destination: string;
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

const routerEstimate = Router();

// Rota que recebe um id , origem e destino e retorna distancia , motoristas e valor 
routerEstimate.post('/estimate', async (req: Request, res: Response): Promise<any> => {
  const estimateBody: EstimateBody = req.body;
  if (checkEstimateDataIn(estimateBody)) {
    const routeData: MapDistance = { origin: estimateBody.origin, destination: estimateBody.destination };
    return calculateRoute(routeData).then((response: MapResponse) => {
        return getDriversByDistance(response.distance).then((drivers) => {
            const driversPrices: Driver[] = drivers.map(driver => {
                return {
                    id: driver.id,
                    name: driver.name,
                    description: driver.description,
                    vehicle: driver.vehicle,
                    review: {
                        comment: driver.comment,
                        rating: driver.rating
                    },
                    value: calculateValue(driver.tax,response.distance)
                }
            });
            const estimateResponse: EstimateResponse = {
                response: response,
                options: driversPrices.sort((a, b) => a.value - b.value)
            }
            return res.status(200).json(estimateResponse);
        }).catch((e: Error) => {
            const error: EstimateError = {
                error_code: e.name,
                error_description: e.message
            }
            return res.status(400).json(error);
        });
    }).catch((e: Error) => {
        const error: EstimateError = {
            error_code: e.name,
            error_description: e.message
        }
        return res.status(400).json(error);
    });
  } else {
    const error: EstimateError = {
        error_code: "INVALID_DATA",
        error_description: "Os dados fornecidos no corpo da requisição são inválidos"
    }
    return res.status(400).json(error);
  }
});

export default routerEstimate;
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../../config/config';

interface MapDistance {
  origin: string; 
  destination: string;
}

interface BodyRoute {
  origin:  {
    address: string;
  };
  destination: {
    address: string;
  };
  travelMode: string;
  units?: string;
}

interface MapResponse {
  origin: {
    latitude: number;
    longitude: number;
  }; 
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number; 
  duration: string;
  routeResponse: object;
}

type MapApiRespErr = MapResponse | Error;

// Criação de uma instância do Axios para consumir api do Google maps
const api: AxiosInstance = axios.create({
  baseURL: config.googleApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    "X-Goog-FieldMask": "routes,routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation"
  },
});

export async function calculateRoute(body: MapDistance): Promise<MapApiRespErr> {
    const bodyRoute: BodyRoute = {
      origin: {
        address: body.origin 
      } ,
      destination: {
        address: body.destination
      },
      travelMode: "DRIVE"
    };
    return api.post('/v2:computeRoutes',bodyRoute,{
      params: {
        key: config.googleApiKey
      }
    }).then((response) => {
      const data = response.data.routes[0];
      const resp: MapResponse = {
        origin: data.legs[0].startLocation.latLng,
        destination: data.legs[0].endLocation.latLng,
        distance: data.distanceMeters,
        duration: data.duration,
        routeResponse: data
      };
      return resp;
    }).catch((error: Error) => {
      return error;
    });
}
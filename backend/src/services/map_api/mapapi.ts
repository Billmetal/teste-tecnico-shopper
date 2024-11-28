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
}

interface LatLong {
  latitude: number;
  longitude: number;
}

interface MapResponse {
  origin: LatLong; 
  destination: LatLong;
  distance: number; 
  duration: string;
  routeResponse: object;
}

// Criação de uma instância do Axios para consumir api do Google maps
const api: AxiosInstance = axios.create({
  baseURL: config.googleApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${config.googleApiKey}`
  },
});

export async function calculateRoute(body: MapDistance): Promise<any> {
    const bodyRoute: BodyRoute = {
      origin: {
        address: body.origin 
      } ,
      destination: {
        address: body.destination
      },
      travelMode: "DRIVE"
    };
    return api.post('/v2:computeRoutes', bodyRoute).then((response) => {
      const data = response.data.routes[0];
      const resp: MapResponse = {
        origin: data.legs[0].startLocation,
        destination: data.legs[0].endLocation,
        distance: data.distanceMeters,
        duration: data.duration,
        routeResponse: data
      };
      return resp;
    }).catch((error: Error) => {
      return error;
    });
}
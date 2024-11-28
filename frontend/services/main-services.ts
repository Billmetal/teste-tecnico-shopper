"use server";
import axios from "axios";
import { API_URL } from "@/utils/urls";

interface ApiResponse {
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
    options: {
        id: number;
        name: string;
        description: string;
        vehicle: string;
        review: {
            rating: number;
            comment: string;
        };
        value: number;
    }[];
    routeResponse: object;
}

interface ApiErrorResponse {
    error_code: string;
    error_description: string;
}

export const solicitacaoService = async (payload: string): Promise<any> => {
    // let axiosCreate = axios.create({
    //     validateStatus: function (status) {
    //         return status >= 200;
    //     },
    // });

    let axiosCreate = axios.create();

    let config = {
        method: "post",
        url: API_URL.URL + "ride/estimate",
        headers: {
            "Content-Type": "application/json",
        },
        data: payload,
    };

    try {
        // let data = await axiosCreate(config).then(({ data }) => data);
        // return data;
        // const { data } = await axiosCreate(config);
        // return data;
        const { data } = await axiosCreate(config);

        if (data.error_code) {
            return data as ApiErrorResponse;
        }

        return data as ApiResponse;
    } catch (err) {
        return null;
    }
};

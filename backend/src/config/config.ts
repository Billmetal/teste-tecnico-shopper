interface Config {
    googleApiUrl: string | undefined;
    googleApiKey: string | undefined;
}

export const config: Config = {
    googleApiUrl: process.env.GOOGLE_API_URL,
    googleApiKey: process.env.GOOGLE_API_KEY
};
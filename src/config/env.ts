import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
};

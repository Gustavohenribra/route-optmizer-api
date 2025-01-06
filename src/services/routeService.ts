import { Client, TravelMode, Language, TrafficModel } from '@googlemaps/google-maps-services-js';
import { config } from '../config/env';

const client = new Client({});

export async function getOptimizedRoute(
  locations: string[],
  mode: TravelMode
): Promise<any> {
  try {
    const geocodedLocations = await Promise.all(
        locations.map((location) => geocodeAddress(location))
    );

    const params: any = {
        key: config.googleMapsApiKey,
        origin: geocodedLocations[0],
        destination: geocodedLocations[geocodedLocations.length - 1],
        mode,
        language: Language.pt_BR,
      };
  
      if (geocodedLocations.length > 2) {
        params.waypoints = geocodedLocations.slice(1, -1).map((loc) => `via:${loc}`);
        params.optimizeWaypoints = true;
      }
  
      const response = await client.directions({ params });
  
      if (response.data.routes.length === 0) {
        throw new Error('Nenhuma rota encontrada entre os endereços fornecidos.');
      }

    return response.data.routes;
  } catch (error) {
    console.error('Error fetching route:', error);
    throw new Error('Failed to fetch route optimization.');
  }
}

export async function geocodeAddress(address: string): Promise<string> {
    try {
        const response = await client.geocode({
            params: {
                key: config.googleMapsApiKey,
                address,
                language: Language.pt_BR,
            },
        });

        if (response.data.results.length === 0) {
            throw new Error(`Address not found: ${address}`);
        }

        const location = response.data.results[0].geometry.location;
        return `${location.lat},${location.lng}`;
    } catch (error) {
        console.error(`Error geocoding address: ${address}`, error);
        throw new Error(`Failed to geocode address: ${address}`);
    }
}

export async function calculateFuelCost(
  locations: string[],
  mode: TravelMode,
  fuelConsumption: number,
  fuelPrice: number
): Promise<any> {
  try {
    const geocodedLocations = await Promise.all(
      locations.map((location) => geocodeAddress(location))
    );

    const params: any = {
      key: config.googleMapsApiKey,
      origin: geocodedLocations[0],
      destination: geocodedLocations[geocodedLocations.length - 1],
      mode,
      language: Language.pt_BR,
    };

    const response = await client.directions({ params });

    if (response.data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada.');
    }

    const distanceMeters = response.data.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0);
    const distanceKm = distanceMeters / 1000;
    const fuelCost = (distanceKm / fuelConsumption) * fuelPrice;

    return {
      distance: `${distanceKm.toFixed(2)} km`,
      fuelCost: fuelCost.toFixed(2),
    };
  } catch (error) {
    console.error('Erro ao calcular custo de combustível:', error);
    throw new Error('Falha ao calcular custo de combustível.');
  }
}

export async function getRouteWithTraffic(
    locations: string[],
    mode: TravelMode,
    departureTime: string
  ): Promise<any> {
    try {
      const geocodedLocations = await Promise.all(
        locations.map((location) => geocodeAddress(location))
      );
  
      const params: any = {
        key: config.googleMapsApiKey,
        origin: geocodedLocations[0],
        destination: geocodedLocations[geocodedLocations.length - 1],
        waypoints: geocodedLocations.slice(1, -1).map((loc) => `via:${loc}`),
        mode,
        departure_time: departureTime === 'now' ? 'now' : new Date(departureTime).getTime(),
        language: Language.pt_BR,
        traffic_model: TrafficModel.pessimistic,
      };
  
      const response = await client.directions({ params });
  
      if (response.data.routes.length === 0) {
        throw new Error('Nenhuma rota encontrada com as condições fornecidas.');
      }
  
      const route = response.data.routes[0];
      const legs = route.legs.map((leg: any) => ({
        start_address: leg.start_address,
        end_address: leg.end_address,
        distance: leg.distance.text,
        duration: leg.duration.text,
        duration_in_traffic: leg.duration_in_traffic?.text || "N/A",
      }));
  
      return {
        summary: route.summary,
        legs,
      };
    } catch (error) {
      console.error('Erro ao buscar rota com tráfego:', error);
      throw new Error('Falha ao buscar rota com tráfego.');
    }
  }  
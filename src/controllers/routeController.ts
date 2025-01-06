import { getOptimizedRoute, calculateFuelCost, getRouteWithTraffic } from '../services/routeService';
import { Action } from './baseController';

class RouteController {
    optimizeRoute: Action = async (req, res, next) => {
        try {
            const { locations, mode } = req.body;

            if (!locations || locations.length < 2) {
                res.status(400).json({ error: 'Pelo menos dois locais são necessários.' });
                return;
            }

            const routes = await getOptimizedRoute(locations, mode || 'driving');
            res.status(200).json({ routes });
            return;
        } catch (err: any) {
            res.status(500).json({
                error: 'Erro ao otimizar a rota. Tente novamente mais tarde.',
                details: err.message || 'Erro desconhecido.',
            });
            next(err);
        }
    };

    calculateFuelCost: Action = async (req, res, next) => {
        try {
            const { locations, mode, fuelConsumption, fuelPrice } = req.body;

            if (!locations || locations.length < 2) {
                res.status(400).json({ error: 'Pelo menos dois locais são necessários.' });
                return;
            }

            if (!fuelConsumption || !fuelPrice) {
                res.status(400).json({ error: 'Consumo e preço do combustível são obrigatórios.' });
                return;
            }

            const costDetails = await calculateFuelCost(locations, mode || 'driving', fuelConsumption, fuelPrice);
            res.status(200).json(costDetails);
            return;
        } catch (err: any) {
            res.status(500).json({
                error: 'Erro ao calcular custo de combustível.',
                details: err.message || 'Erro desconhecido.',
            });
            next(err);
        }
    };

    getTrafficConditions: Action = async (req, res, next) => {
        try {
            const { locations, mode, departureTime } = req.body;

            if (!locations || locations.length < 2) {
                res.status(400).json({ error: 'Pelo menos dois locais são necessários.' });
                return;
            }

            const trafficDetails = await getRouteWithTraffic(locations, mode || 'driving', departureTime || 'now');
            res.status(200).json({ trafficDetails });
            return;
        } catch (err: any) {
            res.status(500).json({
                error: 'Erro ao buscar condições de tráfego.',
                details: err.message || 'Erro desconhecido.',
            });
            next(err);
        }
    };
}

export default new RouteController;
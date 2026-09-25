import { Coordinates } from '../../domain/entities/Coordinates.js';
import { calculateAntipodeCoordinates } from '../../domain/services/antipodeCalculator.js';
import { fetchWeatherData } from '../../infrastructure/external-apis/openMeteoClient.js';

export class GetAntipodeWeatherUseCase {
  async execute(rawLatitude, rawLongitude) {
    // 1. Validate coordinates using Domain Entity
    const originCoords = new Coordinates(rawLatitude, rawLongitude);

    // 2. Calculate antipode using Domain Service
    const antipodeCoords = calculateAntipodeCoordinates(originCoords.latitude, originCoords.longitude);

    // 3. Fetch weather metrics in parallel
    const [originWeather, antipodeWeather] = await Promise.all([
      fetchWeatherData(originCoords.latitude, originCoords.longitude),
      fetchWeatherData(antipodeCoords.latitude, antipodeCoords.longitude)
    ]);

    // 4. Return aggregated payload
    return {
      origin: {
        coordinates: { latitude: originCoords.latitude, longitude: originCoords.longitude },
        weather: originWeather
      },
      antipode: {
        coordinates: antipodeCoords,
        weather: antipodeWeather
      }
    };
  }
}
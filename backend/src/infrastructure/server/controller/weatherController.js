import { GetAntipodeWeatherUseCase } from '../../../application/use-cases/GetAntipodeWeatherUseCase.js';

const getAntipodeWeatherUseCase = new GetAntipodeWeatherUseCase();

export async function getAntipodeWeather(req, res) {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameters "lat" and "lng" are required.'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const weatherData = await getAntipodeWeatherUseCase.execute(latitude, longitude);

    return res.status(200).json({
      status: 'success',
      data: weatherData
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message || 'An unexpected error occurred while fetching antipode weather.'
    });
  }
}
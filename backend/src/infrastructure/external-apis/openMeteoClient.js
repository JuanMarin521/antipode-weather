import axios from 'axios';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches current weather metrics for specified coordinates.
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<Object>} Weather details
 */
export async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await axios.get(OPEN_METEO_BASE_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        timezone: 'auto'
      }
    });

    return response.data.current_weather;
  } catch (error) {
    console.error(`[OpenMeteo Error] Failed to fetch weather for coordinates (${latitude}, ${longitude}):`, error.message);
    throw new Error('Failed to retrieve weather data from external service');
  }
}
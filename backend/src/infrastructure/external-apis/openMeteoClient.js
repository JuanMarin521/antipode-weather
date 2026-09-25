import axios from "axios";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Fetches current weather data from the Open-Meteo API based on the provided latitude and longitude.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} - weather details
 */

export async function fetchCurrentWeather(latitude, longitude) {
    try {
        const response = await axios.get(OPEN_METEO_BASE_URL, {
            params:{
                latitude,
                longitude,
                current_weather: true,
                timezone: 'auto'
            }
        });

        return response.data.current_weather;
    } catch (error) {
        console.error(`[openMeteo Error] Failed to fetch weather for coordinates (${latitude}, ${longitude}): ${error.message}`);
        throw new Error("Failed to retrieve weather data.");
    }
}
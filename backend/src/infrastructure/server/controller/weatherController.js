import {calculateAntipodeCoordinates} from '../../../domain/services/antipodeCalculator.js';
import {fetchWeatherData} from '../../external-apis/openMeteoClient.js';

//controller function to handle the request for antipode weather data

export async function getAntipodeWeather(req, res) {
    try{
        const {lat, lng}  = req.query;

        //validate presence of parameters
        if(!lat || !lng){
            return res.status(400).json({
                status: "error",
                message: "Missing required query parameters: lat and lng are required."
            });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    //validate cordinate ranges
    if(isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180){
        return res.status(400).json({
            status: "error",
            message: "Invalid coordinates. Latitude must be between -90 and 90, and longitude must be between -180 and 180."
        });
    }

    //1. Calculate the antipode coordinates
    const antipodeCoordinates = calculateAntipodeCoordinates(latitude, longitude);

    //2. Fetch the weather data for the antipode coordinates in parallel
    const [originalWeather, antipodeWeather] = await Promise.all([
        fetchWeatherData(latitude, longitude),
        fetchWeatherData(antipodeCoordinates.latitude, antipodeCoordinates.longitude) 
    ]);

    //3. Return with the formatted payload
    return res.status(200).json({
        status: "success",
        data: {
            origin: {
                coordinates: { latitude, longitude },
                weather: originalWeather
            },
            antipode:  {
                coordinates: antipodeCoordinates,
                weather: antipodeWeather
            }
        
        }
    });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message || "An unexpected error occurred while processing the request."
        });
    }
}



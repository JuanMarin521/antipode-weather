import {Router} from 'express';
import {getAntipodeWeather} from '../controller/weatherController.js';

const router = Router();

/**
 * @route   GET /api/v1/weather/antipode
 * @desc    Get weather for given coordinates and its antipode
 * @access  Public
 */

router.get ('/antipode', getAntipodeWeather);

export default router;

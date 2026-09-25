/**
 * Calculates the exact geographic antipode for a given set of coordinates.
 * @param {number} latitude - Latitude in degrees (-90 to 90)
 * @param {number} longitude - Longitude in degrees (-180 to 180)
 * @returns {{latitude: number, longitude: number}} Calculated antipode coordinates
 */

export function calculateAntipodeCoordinates(latitude, longitude) {
    const antipodeLat= -latitude;
    const antipodeLng = longitude > 0 ? longitude - 180 : longitude + 180;

    return {
        latitude: Number(antipodeLat.toFixed(6)), // rounding to 6 decimal places for precision
        longitude: Number(antipodeLng.toFixed(6)) // rounding to 6 decimal places for precision
    };
}
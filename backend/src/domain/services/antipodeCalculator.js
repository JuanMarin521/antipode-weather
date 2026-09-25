import { Coordinates } from '../entities/Coordinates.js';

/**
 * Calculates the exact geographic antipode coordinates.
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Coordinates} New Coordinates instance for the antipode
 */
export function calculateAntipodeCoordinates(latitude, longitude) {
  const antipodeLat = -latitude;
  const antipodeLng = longitude > 0 ? longitude - 180 : longitude + 180;

  // Retornamos una nueva instancia de la Entidad Coordinates (así se valida automáticamente el resultado)
  return new Coordinates(
    Number(antipodeLat.toFixed(6)),
    Number(antipodeLng.toFixed(6))
  );
}
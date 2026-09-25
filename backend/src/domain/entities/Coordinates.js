export class Coordinates {
  constructor(latitude, longitude) {
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      throw new Error('Invalid latitude. Value must be between -90 and 90.');
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      throw new Error('Invalid longitude. Value must be between -180 and 180.');
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default interface LocationCoordinates {
  [location: string]: {
    latitude: number;
    longitude: number;
    positionOnMap: {
      x: number;
      y: number;
    };
  };
}

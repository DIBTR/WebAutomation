interface LocationCoordinates {
  [location: string]: {
    latitude: number;
    longitude: number;
    positionOnMap: {
      x: number;
      y: number;
    };
  };
}

const locationDetails: LocationCoordinates = {
  NAO: {
    latitude: 66,
    longitude: -33,
    positionOnMap: {
      x: 516,
      y: 360,
    },
  },
};

export default locationDetails;

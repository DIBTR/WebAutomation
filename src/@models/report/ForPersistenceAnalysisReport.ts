import LocationCoordinates from "@models/ForLocation"

export default interface ForPersistenceAnalysisReport {
  locationDetails: LocationCoordinates,
  source: string,
  windHeight: [],
  persistenceAnalysis: {
    weatherWindow: [''],
    significantWaveHeight: [''],
    wavePeriod: [''],
    meanWindSpeed: ['']
  }
  expectedResultsFor8Window: []
}

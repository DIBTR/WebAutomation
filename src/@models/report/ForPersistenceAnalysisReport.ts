export default interface ForPersistenceAnalysisReport {
  source : string,
  windHeight :[],
  persistenceAnalysis : {
    weatherWindow : [''],
    significantWaveHeight : [''],
    wavePeriod:[''],
    meanWindSpeed:['']
  }
}

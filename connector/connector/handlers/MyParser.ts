import { DataContainer, DataType, log, ParseOptions, Parser } from '@tableau/taco-toolkit/handlers'

interface FeatureRow {
  eventData: string,
  eventName: string,
  levelName: string,
  sessionID: string,
  sessionURL: string,
  timestamp: number
}

interface FetcherResult {
  [rowName: string]: FeatureRow
}

export default class MyParser extends Parser<FetcherResult> {
  parse(fetcherResult: FetcherResult, { dataContainer }: ParseOptions): DataContainer {
    const tableName = 'Telemetry data'
    log(`parsing started for '${tableName}'`)

    const containerBuilder = Parser.createContainerBuilder(dataContainer)
    const { isNew, tableBuilder } = containerBuilder.getTable(tableName)

    if (isNew) {
      tableBuilder.setId('telemetryData')
      tableBuilder.addColumnHeaders([
        {
          id: 'timestamp',
          alias: 'timestamp',
          dataType: DataType.Float,
        },
        {
          id: 'eventData',
          alias: 'eventData',
          dataType: DataType.String,
        },
        {
          id: 'eventName',
          alias: 'eventName',
          dataType: DataType.String,
        },
        {
          id: 'levelName',
          alias: 'levelName',
          dataType: DataType.String,
        },
        {
          id: 'sessionID',
          alias: 'sessionID',
          dataType: DataType.String,
        },
        {
          id: 'sessionURL',
          alias: 'sessionURL',
          dataType: DataType.String,
        },
      ])
    }

    let data: FeatureRow[] = Object.keys(fetcherResult).map(key => fetcherResult[key])

    tableBuilder.addRows(data.map(row => { return { ...row } }))

    return containerBuilder.getDataContainer()
  }
}

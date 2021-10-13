import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';
import Moment from 'moment'
import Numeral from 'numeral'

import { SensorData, ReadingData } from './RemoteDataTypes';


// Create a map of sensor id => sensor, with only sensors of the given type.
function sensorMapOfType (sensors: SensorData[], sensorType: string) {

  const sensorsMap = new Map<number, SensorData>();

  for (const sensor of sensors) {
    if (sensor.type === sensorType) {
      sensorsMap.set(sensor.id, sensor)
    }
  }

  return sensorsMap;
}


// Given a map of sensor id -> sensor, create a map of sensor id -> readings, for only the specified sensors
function datasetsForSensors (readingData: ReadingData[], sensorsMap: Map<number, SensorData>) {

  const datasets = new Map<number, ReadingData[]>();

  for (const item of readingData) {

    const sensor = sensorsMap.get(item.sensorId)

    if (!sensor) {
      continue;
    }

    if (!datasets.get(item.sensorId)) {
      datasets.set(item.sensorId, []) 
    }

    (datasets.get(item.sensorId) as ReadingData[]).push(item)

  }

  return datasets;
}

// Transform reading data into the shape required by Victory
function processReadingData (readingData: ReadingData[]) {

  return readingData.map ( reading => {
    return {
      x: Moment(reading.time).unix(),
      y: reading.value//.toFixed(1)
    }
  })

}

type ReadingsChartProps = {
  type: string,
  sensorData: SensorData[],
  readingData: ReadingData[],
  yLabel: string,
}

function ReadingsChart (props: ReadingsChartProps) {

  const sensorsMap = sensorMapOfType(props.sensorData, props.type)
  const datasets = datasetsForSensors(props.readingData, sensorsMap)

  return <VictoryChart theme = { VictoryTheme.material }>

    <VictoryAxis
      label = "Time"
      style = { {
        axisLabel: { padding: 30 },
        tickLabels: {fontSize: 8, padding: 5}
      } }
      tickFormat = { value => {
        return Moment(value).format('hh:mm:ss')
      }}
    />
    <VictoryAxis dependentAxis
      label = { props.yLabel }
      style = { {
        axisLabel: { padding: 40 }
      } }
    />

    { Array.from(datasets).map( ([key, dataset]) => {
        return <VictoryLine key = { key } data = { processReadingData(dataset) }>
        </VictoryLine>
      })
    }

  </VictoryChart>


}



export default ReadingsChart
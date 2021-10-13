import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';
import Moment from 'moment'

import { ReadingData, SensorData } from './RemoteDataTypes';
import { ReadingDataForGraphing } from './DataFunctions';

// Seven colours for use on the charts. These have been chosen to be legible compared to each other, and we happen to know that we won't have more datasets than this. Designing chart colour schemes to clearly slow many different datasets is a challenge that I've not taken on here, we'll just loop through the colours again in the event we have more than 7 datasets (though our fixed dataset has at most two).

const chartColours = [
  '#0099e0',
  '#ffa600',
  '#ff72c1',
  '#7c92ef',
  '#ff6e8d',
  '#c883e4',
  '#ff8452',
]

function assignColours (readingData: Map<number, ReadingData[]>) {

  const datasetColourAssignments = new Map<number, string>()

  let chartColourIndex = 0

  for (const id of readingData.keys()) {
    datasetColourAssignments.set(id, chartColours[chartColourIndex])

    if (chartColourIndex >= chartColours.length) {
      chartColourIndex = 0
    }
    else {
      chartColourIndex += 1
    }
  }

  return datasetColourAssignments
}

function legendData (
  readingData: Map<number, ReadingData[]>,
  sensorData: Map<number, SensorData>,
  datasetColourAssignments: Map<number, string>) {

  return Array.from(readingData).map( ([id, dataset]) => {
    return {
      name: (sensorData.get(id) as SensorData).name,
      symbol: {
        fill: datasetColourAssignments.get(id)
      },
    }
  })


}

type ReadingsChartProps = {
  readingData: Map<number, ReadingData[]>,
  sensorData: Map<number, SensorData>,
  yLabel: string,
}

function ReadingsChart (props: ReadingsChartProps) {

  const datasetColourAssignments = assignColours(props.readingData)

  return <VictoryChart
    theme = { VictoryTheme.material }
    style = { {
      background: {
        fill: 'rgba(0, 0, 0, 0)'
      },
    } }
  >

    <VictoryAxis
      label = 'Time'
      style = { {
        axisLabel: { padding: 30, fill: 'white' },
        tickLabels: { fontSize: 4, padding: 5, fill: 'white' }
      } }
      tickFormat = { value => {
        return Moment(value).format('MMM DD, hh:mm:ss')
      } }
    />
    <VictoryAxis dependentAxis
      label = { props.yLabel }
      style = { {
        axisLabel: { padding: 40, fontSize: 10, fill: 'white'},
        tickLabels: { fontSize: 8, padding: 5, fill: 'white' }
      } }
    />

    <VictoryLegend
      y = { 20 }
      orientation = 'horizontal'
      data = { legendData(props.readingData, props.sensorData, datasetColourAssignments) }
      style = { {
        labels: {
          fill: 'white',
          fontSize: 10
        }
      } }
    />

    { Array.from(props.readingData).map( ([id, dataset]) => {
        return <VictoryLine
          key = { id }
          data = { ReadingDataForGraphing(dataset) }
          style = { {
            data: {
              stroke: datasetColourAssignments.get(id)
            },
            labels: {
              fill: 'white',
              fontSize: 8,
            }
          } }
          interpolation = { 'cardinal' }
          labels = { victoryDataPoint => {
            return victoryDataPoint.datum.y.toFixed(1)
          }}
          labelComponent = {
            <VictoryLabel renderInPortal dy = { -5 } />
          }
        />
      })
    }

  </VictoryChart>


}





export default ReadingsChart
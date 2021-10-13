import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';
import Moment from 'moment'

import { ReadingData } from './RemoteDataTypes';
import { ReadingDataForGraphing } from './DataFunctions';

type ReadingsChartProps = {
  readingData: Map<number, ReadingData[]>,
  yLabel: string,
}

function ReadingsChart (props: ReadingsChartProps) {


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

    { Array.from(props.readingData).map( ([key, dataset]) => {
        return <VictoryLine key = { key } data = { ReadingDataForGraphing(dataset) }>
        </VictoryLine>
      })
    }

  </VictoryChart>


}





export default ReadingsChart
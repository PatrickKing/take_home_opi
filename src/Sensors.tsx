import React from 'react';
import { useState, useEffect } from 'react';
import Moment from 'moment'
import Typography from '@mui/material/Typography';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';

import { SensorData } from './RemoteDataTypes';
import { requestSensorData } from './Requests'

function dateFormatter (params: GridValueFormatterParams) {
  return Moment(params.value as string).format('MMM DD, YYYY')
}

const sensorColumns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Sensor Type',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 150,
    valueFormatter: dateFormatter
  },
  {
    field: 'units',
    headerName: 'Unit',
    width: 150,
  }
]

function Sensors () {

  const [sensorData, setSensorData] = useState<null | [SensorData]>(null);

  useEffect( () => {
    requestSensorData(setSensorData)
  }, [setSensorData])

  if (sensorData === null) {
    return <div>
      <span>Loading ...</span>
    </div>
  }

  return <div>

    <Typography variant = "h1" component = 'h1'>
      Sensors
    </Typography>


    <div style = { {height: 400} }>
      <DataGrid
        rows = { sensorData }
        columns = { sensorColumns }
        pageSize = { 10 }
      />
    </div>


  </div>

    // </Paper>
}

export default Sensors
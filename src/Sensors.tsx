import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { SensorData } from './RemoteDataTypes';

function getSensorData (setSensorData: (data: null | [SensorData]) => void) {
  Axios.get('sensors.json')
  .then( response => {
    setSensorData(response.data);
  })
  .catch( error => {
    console.error("Couldn't get sensor data.")
  })
}

function tableBody(sensorData: null | [SensorData],) {

  if (sensorData === null) {
    return [
     <TableRow key = 'no-data' >
        <TableCell component="th" scope="row"> Loading ... </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    ]
  }
  else {
    return sensorData.map( (sensor) => (
      <TableRow key = { sensor.id } >
        <TableCell component="th" scope="row">
          {sensor.name}
        </TableCell>
        <TableCell> { sensor.type } </TableCell>
        <TableCell> { Moment(sensor.createdAt).format('MMM DD, YYYY') } </TableCell>
        <TableCell> { sensor.units } </TableCell>
      </TableRow>
    ))
  }

}

function Sensors () {

  const [sensorData, setSensorData] = useState<null | [SensorData]>(null);

  useEffect( () => {
    getSensorData(setSensorData)
  }, [setSensorData])

  return <div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableBody(sensorData) }
        </TableBody>
      </Table>
    </TableContainer>

  </div>

}

export default Sensors
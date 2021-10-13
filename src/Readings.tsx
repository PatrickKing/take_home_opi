import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import ReadingsChart from './ReadingsChart'
import { SensorData, ReadingData } from './RemoteDataTypes';
import { requestSensorData, requestReadingData } from './Requests'


function toggleUnit (temperatureUnit: 'C' | 'F', setTemperatureUnit: (type: 'C' | 'F') => void,) {

  if (temperatureUnit === 'C') {
    setTemperatureUnit('F')
  }
  else {
    setTemperatureUnit('C')
  }

}

function convertReadings (readingData: ReadingData[], temperatureUnit: 'C' | 'F') {
  // TODO: In the real world, we might want to check the unit specified on the sensor here
  // TODO: we apply this conversion to all the data, including humidity data, before it's passed through. the way the app is structured right now, this is harmless. But we can fix this.

  if (temperatureUnit === 'C') {
    return readingData
  }
  else {
    return readingData.map( item => {
      return {
        time: item.time,
        sensorId: item.sensorId,
        value: item.value * 1.8 + 32,
      }
    })
  }
}


function Readings () {

  const [sensorData, setSensorData] = useState<null | [SensorData]>(null);

  useEffect( () => {
    requestSensorData(setSensorData)
  }, [setSensorData])

  const [readingData, setReadingData] = useState<null | [ReadingData]>(null);

  useEffect( () => {
    requestReadingData(setReadingData)
  }, [setReadingData])

  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');


  if (sensorData === null || readingData === null) {
    return <div>
      <span> Loading ... </span>
    </div>
  }

  const unitConvertedReadingData = convertReadings(readingData, temperatureUnit)

  return <div>

    <h2>Temperature Sensor Readings</h2>
    <ReadingsChart 
      type = { 'Temperature Sensor' }
      sensorData = { sensorData }
      readingData = { unitConvertedReadingData }
      yLabel = { `Temperature ${temperatureUnit}` }
    />

    <Button onClick = { () => toggleUnit(temperatureUnit, setTemperatureUnit) }>
      { `Switch to ${temperatureUnit === 'C' ? 'F' : 'C'}` }
    </Button>

    <h2>Humidity Sensor Readings</h2>
    <ReadingsChart 
      type = { 'Humidity Sensor' }
      sensorData = { sensorData }
      readingData = { readingData }
      yLabel = { 'Humidity (%)' }
    />
  </div>
}

export default Readings
import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ReadingsChart from './ReadingsChart'
import { SensorData, ReadingData } from './RemoteDataTypes';
import { requestSensorData, requestReadingData } from './Requests'

import { SensorMapOfType, DatasetsForSensors, UnitConvertReadings} from './DataFunctions'

function toggleUnit (temperatureUnit: 'C' | 'F', setTemperatureUnit: (type: 'C' | 'F') => void,) {

  if (temperatureUnit === 'C') {
    setTemperatureUnit('F')
  }
  else {
    setTemperatureUnit('C')
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


  const humiditySensorsMap = SensorMapOfType(sensorData, 'Humidity Sensor')
  const temperatureSensorsMap = SensorMapOfType(sensorData, 'Temperature Sensor')

  const humidityDatasets = DatasetsForSensors(readingData, humiditySensorsMap)
  const temperatureDatasets = DatasetsForSensors(readingData, temperatureSensorsMap)

  const unitConvertedTemperatureDatasets = UnitConvertReadings(temperatureDatasets, temperatureUnit)


  return <div>

    <Typography variant="h1" component='h1'>
      Readings
    </Typography>

    <Typography variant="h2" component='h2'>
      Temperature Sensor Readings
    </Typography>

    <Button onClick = { () => toggleUnit(temperatureUnit, setTemperatureUnit) }>
      { `Switch to ${temperatureUnit === 'C' ? '°F' : '°C'}` }
    </Button>

    <ReadingsChart
      readingData = { unitConvertedTemperatureDatasets }
      sensorData = { temperatureSensorsMap }
      yLabel = { `Temperature °${temperatureUnit}` }
    />

    <Typography variant="h2" component='h2'>
      Humidity Sensor Readings
    </Typography>

    <ReadingsChart
      readingData = { humidityDatasets }
      sensorData = { humiditySensorsMap }
      yLabel = { 'Humidity (%)' }
    />
  </div>
}

export default Readings
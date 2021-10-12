import React from 'react';
import { useState, useEffect } from 'react';


import ReadingsChart from './ReadingsChart'
import { SensorData, ReadingData } from './RemoteDataTypes';
import { requestSensorData, requestReadingData } from './Requests'



function Readings () {

  const [sensorData, setSensorData] = useState<null | [SensorData]>(null);

  useEffect( () => {
    requestSensorData(setSensorData)
  }, [setSensorData])

  const [readingData, setReadingData] = useState<null | [ReadingData]>(null);

  useEffect( () => {
    requestReadingData(setReadingData)
  }, [setReadingData])

  if (sensorData === null || readingData == null) {
    return <div>
      <span> Loading ... </span>
    </div>
  }


  return <div>
    <ReadingsChart 
      type = { 'Temperature Sensor' }
      sensorData = { sensorData }
      readingData = { readingData }
    />
    <ReadingsChart 
      type = { 'Humidity Sensor' }
      sensorData = { sensorData }
      readingData = { readingData }
    />
  </div>
}

export default Readings
import Axios from 'axios';

import { SensorData, ReadingData } from './RemoteDataTypes';


function requestSensorData (setSensorData: (data: null | [SensorData]) => void) {
  Axios.get('sensors.json')
  .then( response => {
    setSensorData(response.data);
  })
  .catch( error => {
    console.error("Couldn't get sensor data.")
  })
}

function requestReadingData (setReadingData: (data: null | [ReadingData]) => void) {
  Axios.get('readings.json')
  .then( response => {
    setReadingData(response.data);
  })
  .catch( error => {
    console.error("Couldn't get reading data.")
  })
}

export { requestSensorData, requestReadingData }

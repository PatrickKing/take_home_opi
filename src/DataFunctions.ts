import Moment from 'moment'
import { SensorData, ReadingData } from './RemoteDataTypes';

// Each of these is intended to remain a pure function, without side effects

// Create a map of sensor id => sensor, with only sensors of the given type.
function SensorMapOfType (sensors: SensorData[], sensorType: string) {

  const sensorsMap = new Map<number, SensorData>();

  for (const sensor of sensors) {
    if (sensor.type === sensorType) {
      sensorsMap.set(sensor.id, sensor)
    }
  }

  return sensorsMap;
}


// Given a map of sensor id -> sensor, create a map of sensor id -> readings, for only the specified sensors
function DatasetsForSensors (readingData: ReadingData[], sensorsMap: Map<number, SensorData>) {

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
function ReadingDataForGraphing (readingData: ReadingData[]) {

  return readingData.map ( reading => {
    return {
      x: Moment(reading.time).unix(),
      y: reading.value//.toFixed(1)
    }
  })

}

// If needed, convert a map of temperature readings from C to F
function UnitConvertReadings (readingData: Map<number, ReadingData[]>, temperatureUnit: 'C' | 'F') {
  // TODO: In the real world, we might want to check that the unit specified on the sensor here is C. Since all of my source data is in degrees C, for the purposes of this exercise I'll assume that this is part of my "API"'s contract.

  if (temperatureUnit === 'C') {
    return readingData
  }
  else {

    const convertedReadingData = new Map<number, ReadingData[]>();

    for (const [key, readings] of readingData.entries()) {

      convertedReadingData.set(key, readings.map( reading => {
        return {
          time: reading.time,
          sensorId: reading.sensorId,
          value: reading.value * 1.8 + 32,
        }
      }))
    }

    return convertedReadingData
  }

}


export {
  SensorMapOfType,
  DatasetsForSensors,
  ReadingDataForGraphing,
  UnitConvertReadings
}

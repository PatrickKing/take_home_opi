
type SensorData = {
  id: number,
  name: string,
  type: "Temperature Sensor" | "Humidity Sensor",
  createdAt: string,
  units: 'Celsius' | '%'
}

type ReadingData = {
  time: string,
  sensorId: number,
  value: number,
}

export {SensorData, ReadingData}

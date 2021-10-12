import React from 'react';

import { useState, useEffect } from 'react';
import Axios from 'axios';
import { ReadingData } from './RemoteDataTypes';

function getReadingData (setReadingData: (data: null | [ReadingData]) => void) {
  Axios.get('readings.json')
  .then( response => {
    setReadingData(response.data);
  })
  .catch( error => {
    console.error("Couldn't get reading data.")
  })
}


function Readings () {

  const [readingData, setReadingData] = useState<null | [ReadingData]>(null);

  useEffect( () => {
    getReadingData(setReadingData)
  }, [setReadingData])

  return <div></div>

}

export default Readings
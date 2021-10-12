import React from 'react';

import { useState, useEffect } from 'react';
import { ReadingData } from './RemoteDataTypes';
import { requestReadingData } from './Requests'




function Readings () {

  const [readingData, setReadingData] = useState<null | [ReadingData]>(null);

  useEffect( () => {
    requestReadingData(setReadingData)
  }, [setReadingData])

  return <div></div>

}

export default Readings
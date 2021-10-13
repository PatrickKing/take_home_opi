import React from 'react';
import Typography from '@mui/material/Typography';


function Home () {

  return <div>
    <Typography variant = 'h1' component = 'h1'>
      Home
    </Typography>

    <Typography variant = 'body1' component = 'p' sx = { { mb: 1 } }>
      Please take a look at this tiny React app, demonstrating the data fetch and display, and temperature conversion features detailed in the requirements.
    </Typography>

    <Typography variant = 'body1' component = 'p' sx = { { mb: 1 } }>
      Among the tools included: React Router, Material UI, the Material UI DataGrid, the Victory charting library, Axios for HTTP requests, Moment for nice date formatting.
    </Typography>

    <Typography variant = 'body1' component = 'p' sx = { { mb: 1 } }>
      Among the stretch goals: I've attempted to put together a simple but effective visual design for the app, and the sensors table also comes with sort, filter, and hide features (which came for free with DataGrid). 
    </Typography>

    <Typography variant = 'body1' component = 'p' sx = { { mb: 1 } }>
      (Fun fact, the current stable versions of material-ui (5.x) and @mui/x-data-grid (4.x) are incompatible in subtle ways. This took me a little while to discover.)
    </Typography>

    <Typography variant = 'body1' component = 'p' sx = { { mb: 1 } }>
      Patrick King
    </Typography>
  </div>

}

export default Home
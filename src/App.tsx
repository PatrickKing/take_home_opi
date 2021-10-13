import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Sensors from './Sensors'
import Readings from './Readings'
import Home from './Home'



function App () {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#e9c437',
        light: '#fff76b',
        dark: '#b39400',
      },
      secondary: {
        main: '#e96a37',
        light: '#e96a37',
        dark: '#b13a08',
      },
    }
  });

  return (
    <Router>
      <div className="App">
        <ThemeProvider theme = { theme }>
          <CssBaseline />

          <Container maxWidth = 'md'>
            <Paper sx = { { p: 2 } } elevation = { 2 }>

              <ButtonGroup variant="contained">
                <Button component = { Link } to = '/'>Home</Button>
                <Button component = { Link } to = '/sensors'>Sensors</Button>
                <Button component = { Link } to = '/readings'>Readings</Button>
              </ButtonGroup>

              <Switch>
                <Route path = "/sensors">
                  <Sensors />
                </Route>

                <Route path="/readings">
                  <Readings />
                </Route>

                <Route path="/">
                  <Home />
                </Route>
              </Switch>

            </Paper>
          </Container>

        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './App.css';
import Sensors from './Sensors'
import Readings from './Readings'
import Home from './Home'



function App () {
  return (
    <Router>
      <div className="App">
        <CssBaseline />

        <ButtonGroup variant="contained">
          <Link to = "/"><Button>Home</Button></Link>
          <Link to = "/sensors"><Button>Sensors</Button></Link>
          <Link to = "/readings"><Button>Readings</Button></Link>
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

      </div>
    </Router>
  );
}

export default App;

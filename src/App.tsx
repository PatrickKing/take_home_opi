import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Sensors from './Sensors'
import Readings from './Readings'



function App () {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/sensors">Sensors</Link>
          <Link to="/readings">Readings</Link>
        </header>

        <Switch>

          <Route path="/sensors">
            <Sensors />
          </Route>

          <Route path="/readings">
            <Readings />
          </Route>

          <Route path="/">
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

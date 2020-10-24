import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Registration} />
        </Switch>
    </div>
  );
}

export default App;

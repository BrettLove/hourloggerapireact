import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { CreateDay } from './components/Create';
import { DeleteDay } from './components/Delete';
import { EditDay } from './components/Edit';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const baseUrl = 'https://localhost:5001/api/hourlogger/';

function App() {
  return (
    <Switch>
      <Route exact path='/' render={(props) => <Home {...props} baseUrl={baseUrl} />} />
      <Route path='/create' render={(props) => <CreateDay {...props} baseUrl={baseUrl} />} />
      <Route path='/delete' render={(props) => <DeleteDay {...props} baseUrl={baseUrl} />} />
      <Route path='/edit' render={(props) => <EditDay {...props} baseUrl={baseUrl} />} />
    </Switch>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { CreateDay } from './components/Create';
import { DeleteDay } from './components/Delete';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/create' component={CreateDay} />
      <Route path='/delete' component={DeleteDay} />
      </Switch>
  );
}

export default App;

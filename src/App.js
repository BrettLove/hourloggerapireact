import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { CreateDay } from './components/CreateDay';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/create' component={CreateDay} />
      </div>
  );
}

export default App;

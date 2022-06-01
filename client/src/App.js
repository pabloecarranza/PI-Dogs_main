import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import landingPage from './components/landingPage';
import Home from './components/Home';
import DogDetail from './components/DogDetail';
import DogCreate from './components/DogCreate';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/'component={ landingPage }/>
        <Route  path='/dogs/:id'component={ DogDetail }/>
        <Route  path='/home'component={ Home }/>
        <Route  path='/newDog/'component={ DogCreate }/>
        <Route  path='/about'component={ About }/>
      </div>
    </BrowserRouter>
  );
}

export default App;



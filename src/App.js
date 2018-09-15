import React, { Component } from 'react';
import './App.css';
import Home from './views/Home'

class App extends Component {

  render() { 

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Konux case study</h1>
        </header>
        <div className="App-intro">
        <Home />
        </div>
      </div>
    );
  }
}

export default App;

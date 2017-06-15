import React, { Component } from 'react';
import './App.css';
import Calculator from './Calculator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Interest calculator',
    }
  }
  
  render() {
    let title = this.state.title;
    return (
      <div className="page-wrapper">
        <div className="medium-container">
          <h1>{title}</h1>
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;

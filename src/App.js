import React, {Component} from 'react';
import './App.css';
import Tables from './components/tables'

class App extends Component {
  render(){
    const tableA = {
      start: 8,
      step: 1,
      max: 29,
      width: 20,
      ltr: true,
      up: true,
      name: "RED"
    };
    const tableB = {
      start: 231,
      step: 1,
      max: 247,
      width: 30,
      ltr: true,
      up: true,
      name: "GREEN"
    };
    const tableC = {
      start: 47,
      step: 2,
      max: 81,
      width: 40,
      ltr: false,
      up: true,
      name: "BLUE"
    };
    return (
      <div className="tables">
        <Tables table={tableA}/>
        <Tables table={tableB}/>
        <Tables table={tableC}/>
      </div>
    );
  }

}

export default App;

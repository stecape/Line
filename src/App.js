import React, { Component } from 'react'
import Ramp from './components/Ramp'
import './App.css'

class App extends Component {
  render() {
    var yes = true
    var no = false
    var style = (green) => {
      return {
        color: green ? '#3fb855' : 'black',
        fillColor: green ? '#3fb855' : 'black',
        fill: green ? '#3fb855' : 'black',
        stroke: green ? '#3fb855' : 'black'
      }
    }
    return (
			<svg width="800" height="600" viewBox="0 0 400 300" >
        <Ramp x="20" y="20" green={yes} id="1" />
        <line x1="44" y1="32" x2="144" y2="32" style={style(yes)} />
        <Ramp x="144" y="20" green={no} id="2" />
			</svg>
    );
  }
}

export default App;

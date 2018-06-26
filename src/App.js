import React, { Component } from 'react'
import Ramp from './components/Ramp'
import TestPoint from './components/TestPoint'
import Input from './components/Input'
import Output from './components/Output'
import './App.css'

export default class App extends Component {
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
        <Input
          x={0}
          y={28}
          green={yes}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="c"
          varValue={3.0E8}
        />
        <line x1="24" y1="32" x2="70" y2="32" style={style(yes)} />
        <Ramp
          x={70}
          y={20}
          green={yes}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="pi"
          varValue={3.1415926}
        />
        <line x1="94" y1="32" x2="144" y2="32" style={style(yes)} />
        <TestPoint
          x={144}
          y={26}
          green={yes}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="h"
          varValue={6.626}
        />
        <line x1="156" y1="32" x2="206" y2="32" style={style(yes)} />
        <Ramp
          x={206}
          y={20}
          green={yes}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="g"
          varValue={9.81}
        />
        <line x1="230" y1="32" x2="280" y2="32" style={style(yes)} />
        <Output
          x={280}
          y={28}
          green={yes}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="the answer"
          varValue={42}
        />
      </svg>
    )
  }
}

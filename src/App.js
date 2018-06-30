import React, { Component } from 'react'
import axios from 'axios'
import Ramp from './components/Ramp'
import TestPoint from './components/TestPoint'
import Input from './components/Input'
import Line from './components/Line'
import Output from './components/Output'
import SwitchNO from './components/SwitchNO'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selection: "Regulator1"
    }
  }

  axiosFunc = () => {
    axios.get('data.html').then(results => {
      this.setState(results.data[this.state.selection])
    })
  }

  componentDidMount() {
    this.axiosFunc()
    axios.get('data.html').then(results => {
      var options = Object.keys(results.data).map( reg => {
        return <option key={reg} value={reg}>{reg}</option>
      })
      this.setState({options: options})
    })
    this.interval = setInterval(this.axiosFunc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    var bool = (bool) => { return bool === "1" ? true : false }
    
    var change = (event) => this.setState({selection: event.target.value})

    return (
      <div>
        <select onChange={change} value={this.state.selection}>
          {this.state.options}
  			</select>
        <svg width="1920" height="1080" viewBox="0 0 960 540" >
          <Input
            x={0}
            y={28}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="c"
            varValue={this.state.c}
          />
          <Line x1="24" y1="32" x2="70" y2="32" green={true} />
          <SwitchNO
            x={70}
            y={26}
            green={bool(this.state.enable)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="enable"
            varValue={bool(this.state.enable)}
          />
          <Line x1="82" y1="32" x2="120" y2="32" green={bool(this.state.enable)} />
          <Ramp
            x={120}
            y={20}
            green={bool(this.state.enable)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="pi"
            varValue={this.state.pi}
          />
          <Line x1="144" y1="32" x2="194" y2="32" green={bool(this.state.enable)} />
          <TestPoint
            x={194}
            y={26}
            green={bool(this.state.enable)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="h"
            varValue={this.state.h}
          />
          <Line x1="206" y1="32" x2="256" y2="32" green={bool(this.state.enable)} />
          <SwitchNO
            x={256}
            y={26}
            green={bool(this.state.enable) && bool(this.state.auto)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="auto"
            varValue={bool(this.state.auto)}
          />
          <Line x1="268" y1="32" x2="318" y2="32" green={bool(this.state.enable) && bool(this.state.auto)} />
          <Ramp
            x={318}
            y={20}
            green={bool(this.state.enable) && bool(this.state.auto)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="g"
            varValue={this.state.g}
          />
          <Line x1="342" y1="32" x2="392" y2="32" green={bool(this.state.enable) && bool(this.state.auto)} />
          <Output
            x={392}
            y={28}
            green={bool(this.state.enable) && bool(this.state.auto)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="the answer"
            varValue={this.state.theAnswer}
          />
        </svg>
      </div>
    )
  }
}

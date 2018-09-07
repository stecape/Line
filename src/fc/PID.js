import React, { Component } from 'react'
import axios from 'axios'
import Ramp from '../components/Ramp'
import TestPoint from '../components/TestPoint'
import Input from '../components/Input'
import Line from '../components/Line'
import Output from '../components/Output'
import SwitchNO from '../components/SwitchNO'
import SwitchNC from '../components/SwitchNC'
import Difference from '../components/Difference'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default class PID extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selection: "PID 1"
    }
  }

  axiosFunc = () => {
    axios.get('data/PID.html').then(results => {
      this.setState(results.data[this.state.selection])
    })
  }

  componentDidMount() {
    this.axiosFunc()
    axios.get('data/PID.html').then(results => {
      var options = Object.keys(results.data).map( reg => {
        return <MenuItem key={reg} value={reg}>{reg}</MenuItem>
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
        <Typography variant="title" color="inherit">
          PID
        </Typography>
        <Select onChange={change} value={this.state.selection}>
          {this.state.options}
  			</Select>
        <svg viewBox="0 0 480 270" >
          <Input
            x={0}
            y={128}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_SetValue_IN"
            varValue={this.state.re_SetValue_IN}
          />
          <Line x1="24" y1="132" x2="70" y2="132" green={true} />
          <Input
            x={0}
            y={168}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ActValue_IN"
            varValue={this.state.re_ActValue_IN}
          />
          <Line x1="24" y1="172" x2="76" y2="172" green={true} />
          <Line x1="76" y1="172" x2="76" y2="138" green={true} />
          <Difference
            x={70}
            y={126}
            green={bool(this.state.enable)}
          />
          <Line x1="82" y1="132" x2="102" y2="132" green={true} />
          <Line x1="102" y1="132" x2="102" y2="102" green={true} />
          <Line x1="102" y1="102" x2="122" y2="102" green={true} />
          <Line x1="102" y1="132" x2="122" y2="132" green={true} />
          <SwitchNC
            x={122}
            y={96}
            green={bool(this.state.enable)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_InvertError_IN"
            varValue={bool(this.state.enable)}
          />
        </svg>
      </div>
    )
  }
}
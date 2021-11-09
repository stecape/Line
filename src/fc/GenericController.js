import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/TestPoint'
import Input from '../components/Input'
import Line from '../components/Line'
import SwitchNC from '../components/SwitchNC'
import Inversion from '../components/Inversion'
import Difference from '../components/Difference'
import IndexInput from '../components/IndexInput'
import Typography from '@mui/material/Typography'

export default class GenericController extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      index: 1
    }
  }

  axiosFunc = () => {
    axios.get('data/ProbeData.html').then(results => {
      this.setState(results.data.ProbeData)
    })
  }

  componentDidMount() {
    this.axiosFunc()
    axios.get('data/ProbeData.html').then(results => {
      this.setState(results.data.ProbeData)
    })
    this.interval = setInterval(this.axiosFunc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    var bool = (bool) => { return bool === "1" ? true : false }

    return (
      <div>
        <Typography variant="title" color="inherit">
          Generic Controller
        </Typography>

        <IndexInput index={Math.round(this.state.index)} />

        <svg viewBox="0 0 960 540" >


          {/*                                                                 Setpoint, Actual e Calcolo dell'errore */}
          <Input
            x={0}
            y={128}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_SetValue_IN"
            varValue={this.state.Real_0}
          />
          <Line x1={24} y1={132} x2={70} y2={132} green={true} />
          <Input
            x={0}
            y={168}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ActValue_IN"
            varValue={this.state.Real_1}
          />
          <Line x1={24} y1={172} x2={76} y2={172} green={true} />
          <Line x1={76} y1={172} x2={76} y2={138} green={true} />
          <Difference
            x={70}
            y={126}
            green={true}
            signPosOffsetX={0}
            signPosOffsetY={0}
          />
          <Line x1={82} y1={132} x2={102} y2={132} green={true} />


          {/*                                                                                 Inversione dell'errore */}
          <Line x1={102} y1={132} x2={102} y2={102} green={!bool(this.state.Bool_0)} /> 
          <Line x1={102} y1={102} x2={122} y2={102} green={!bool(this.state.Bool_0)} />
          <SwitchNC
            x={122}
            y={96}
            green={!bool(this.state.Bool_0)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_InvertError_IN"
            varValue={bool(this.state.Bool_0)}
          />
          <Line x1={134} y1={102} x2={154} y2={102} green={!bool(this.state.Bool_0)} />
          <Line x1={154} y1={132} x2={154} y2={102} green={!bool(this.state.Bool_0)} />
          <Line x1={102} y1={132} x2={122} y2={132} green={bool(this.state.Bool_0)} />
          <Inversion
            x={122}
            y={126}
            green={bool(this.state.Bool_0)}
          />
          <Line x1={134} y1={132} x2={154} y2={132} green={bool(this.state.Bool_0)} />
          <Line x1={154} y1={132} x2={174} y2={132} green={true} />
          <TestPoint
            x={174}
            y={126}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Error_TP"
            varValue={this.state.Real_19}
          />
          <Line x1={186} y1={132} x2={206} y2={132} green={true} />


        </svg>
      </div>
    )
  }
}
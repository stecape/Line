import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Limitator from './Limitator'
import Line from './Line'
import '../App.css'

import {withRouter} from "react-router-dom";

class PIDPlaceHolder extends Component {
  constructor(props){
    super(props)

    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(event) {
    var value = this.state.referenceID
    var data = '"ProbeData".ProbeIndex =' + value.toString()
    axios.post('writeIndex.html', data).then(results => {
      console.log(results.data)
      this.props.history.push('/PID')
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.reGpIN !== undefined) {
      return {
        green: nextProps.green,
        reGpIN: nextProps.reGpIN,
        rekPIN: nextProps.rekPIN,
        reTiIN: nextProps.reTiIN,
        reTdIN: nextProps.reTdIN,
        reTimeBaseIN: nextProps.reTimeBaseIN,
        boPIDEnableIN: nextProps.boPIDEnableIN,
        boIntegralEnableIN: nextProps.boIntegralEnableIN,
        boResetIntegratorIN: nextProps.boResetIntegratorIN,
        boPIDAntiWindUpEnableIN: nextProps.boPIDAntiWindUpEnableIN,
        boDerivativeEnableIN: nextProps.boDerivativeEnableIN,
        boPIDHoldIN: nextProps.boPIDHoldIN,
        boPIDManualControlBumplessIN: nextProps.boPIDManualControlBumplessIN,
        rePIDManualControlBumplessTiIN: nextProps.rePIDManualControlBumplessTiIN,
        rePIDOutMaxIN: nextProps.rePIDOutMaxIN,
        rePIDOutMinIN: nextProps.rePIDOutMinIN,
        rePIDOutMaxScalingIN: nextProps.rePIDOutMaxScalingIN,
        rePIDOutMinScalingIN: nextProps.rePIDOutMinScalingIN,
        referenceID: nextProps.referenceID
      }
    }
    return
  }

  render() {

    var ID = "PIDPlaceHolder" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

    var decodeEntities = (function() {
      // this prevents any overhead from creating the object each time
      var element = document.createElement('div');

      function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
          element.innerHTML = str
          str = element.textContent
          element.textContent = ''
        }

        return str
      }

      return decodeHTMLEntities
    })()

    var style = (green) => {
      return {
        color: green ? '#bf360c' : '#78909c',
        fillColor: green ? '#bf360c' : '#78909c',
        fill: green ? '#bf360c' : '#78909c',
        stroke: green ? '#bf360c' : '#78909c'
      }
    }
    
    var text = {
      fontFamily: "Verdana",
      fontSize: 15,
      strokeWidth: 0.3
    }
    
    var label = {
      fontFamily: "Verdana",
      fontSize: 6,
      strokeWidth: 0.1
    }


    return(
      <g>
        <defs>
          <g id={ID}>
            <rect width="260" height="200" fill="none" />
            <text x="46" y="16" style={text}>PID</text>
            <text x="2" y="12" style={label}>SET</text>
            <text x="2" y="28" style={label}>ACT</text>
            <text x="2" y="44" style={label}>reGpIN: {decodeEntities(this.state.reGpIN)}</text>
            <text x="2" y="56" style={label}>rekPIN: {decodeEntities(this.state.rekPIN)}</text>
            <text x="2" y="68" style={label}>reTiIN: {decodeEntities(this.state.reTiIN)}</text>
            <text x="2" y="80" style={label}>reTdIN: {decodeEntities(this.state.reTdIN)}</text>
            <text x="2" y="92" style={label}>reTimeBaseIN: {decodeEntities(this.state.reTimeBaseIN)}</text>
            <text x="2" y="104" style={label}>rePIDManualControlBumplessTiIN: {decodeEntities(this.state.rePIDManualControlBumplessTiIN)}</text>
            <text x="2" y="116" style={label}>boPIDEnableIN: {this.state.boPIDEnableIN ? "true" : "false"}</text>
            <text x="2" y="128" style={label}>boIntegralEnableIN: {this.state.boIntegralEnableIN ? "true" : "false"}</text>
            <text x="2" y="140" style={label}>boResetIntegratorIN: {this.state.boResetIntegratorIN ? "true" : "false"}</text>
            <text x="2" y="152" style={label}>boPIDAntiWindUpEnableIN: {this.state.boPIDAntiWindUpEnableIN ? "true" : "false"}</text>
            <text x="2" y="164" style={label}>boDerivativeEnableIN: {this.state.boDerivativeEnableIN ? "true" : "false"}</text>
            <text x="2" y="176" style={label}>boPIDHoldIN: {this.state.boPIDHoldIN ? "true" : "false"}</text>
            <text x="2" y="188" style={label}>boPIDManualControlBumplessIN: {this.state.boPIDManualControlBumplessIN ? "true" : "false"}</text>

            <text x="160" y="12" style={label}>rePIDOutMaxIN: {(Number(decodeEntities(this.state.rePIDOutMaxIN))  * Number(decodeEntities(this.state.rePIDOutMaxScalingIN)) / 100).toFixed(5)}</text>
            <Line x1={206} y1={50} x2={206} y2={16} green={this.state.green} />
            <Line x1={206} y1={0} x2={206} y2={4} green={this.state.green} />

            <text x="160" y="190" style={label}>rePIDOutMinIN: {(Number(decodeEntities(this.state.rePIDOutMinIN))  * Number(decodeEntities(this.state.rePIDOutMinScalingIN)) / 100).toFixed(5)}</text>
            <Line x1={206} y1={62} x2={206} y2={182} green={this.state.green} />
            <Line x1={206} y1={192} x2={206} y2={200} green={this.state.green} />
            
            <Line x1={212} y1={56} x2={260} y2={56} green={this.state.green} />

            <Limitator 
              x={200}
              y={50}
              green={this.state.green}
            />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="260" height="200" fill="transparent" cursor="pointer" onClick={this.handleClick} />
      </g>
    )
  }
}

export default withRouter(PIDPlaceHolder)


PIDPlaceHolder.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  referenceID: 0,
  reGpIN: 0,
  rekPIN: 0,
  reTiIN: 0,
  reTdIN: 0,
  reTimeBaseIN: 0,
  boPIDEnableIN: false,
  boIntegralEnableIN: false,
  boResetIntegratorIN: false,
  boAntiWindUpEnableIN: false,
  boDerivativeEnableIN: false,
  boPIDManualControlBumplessIN: false,
  rePIDManualControlBumplessTiIN: 0,
  rePIDOutMaxIN: 0,
  rePIDOutMinIN: 0,
  rePIDOutMaxScalingIN: 0,
  rePIDOutMinScalingIN: 0
}

PIDPlaceHolder.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  referenceID: PropTypes.number,
  reGpIN: PropTypes.number,
  rekPIN: PropTypes.number,
  reTiIN: PropTypes.number,
  reTdIN: PropTypes.number,
  reTimeBaseIN: PropTypes.number,
  boPIDEnableIN: PropTypes.bool,
  boIntegralEnableIN: PropTypes.bool,
  boResetIntegratorIN: PropTypes.bool,
  boAntiWindUpEnableIN: PropTypes.bool,
  boDerivativeEnableIN: PropTypes.bool,
  boPIDManualControlBumplessIN: PropTypes.bool,
  rePIDManualControlBumplessTiIN: PropTypes.number,
  rePIDOutMaxIN: PropTypes.number,
  rePIDOutMinIN: PropTypes.number,
  rePIDOutMaxScalingIN: PropTypes.number,
  rePIDOutMinScalingIN: PropTypes.number
}
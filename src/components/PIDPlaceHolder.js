import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Limitator from './Limitator'
import Line from './Line'
import '../App.css'


export default class PIDPlaceHolder extends Component {
  constructor(props){
    super(props)

    this.state = {
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
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
      boAntiWindUpEnableIN: nextProps.boAntiWindUpEnableIN,
      boDerivativeEnableIN: nextProps.boDerivativeEnableIN,
      boPIDManualControlBumplessIN: nextProps.boPIDManualControlBumplessIN,
      rePIDManualControlBumplessTiIN: nextProps.rePIDManualControlBumplessTiIN,
      rePIDOutMaxIN: nextProps.rePIDOutMaxIN,
      rePIDOutMinIN: nextProps.rePIDOutMinIN,
      rePIDOutMaxScalingIN: nextProps.rePIDOutMaxScalingIN,
      rePIDOutMinScalingIN: nextProps.rePIDOutMinScalingIN
    }
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
            <text x="2" y="44" style={label}>reGpIN: {this.state.reGpIN}</text>
            <text x="2" y="56" style={label}>rekPIN: {this.state.rekPIN}</text>
            <text x="2" y="68" style={label}>reTiIN: {this.state.reTiIN}</text>
            <text x="2" y="80" style={label}>reTdIN: {this.state.reTdIN}</text>
            <text x="2" y="92" style={label}>reTimeBaseIN: {this.state.reTimeBaseIN}</text>
            <text x="2" y="104" style={label}>boPIDEnableIN: {this.state.boPIDEnableIN}</text>
            <text x="2" y="116" style={label}>boIntegralEnableIN: {this.state.boIntegralEnableIN}</text>
            <text x="2" y="128" style={label}>boResetIntegratorIN: {this.state.boResetIntegratorIN}</text>
            <text x="2" y="140" style={label}>boAntiWindUpEnableIN: {this.state.boAntiWindUpEnableIN}</text>
            <text x="2" y="152" style={label}>boDerivativeEnableIN: {this.state.boDerivativeEnableIN}</text>
            <text x="2" y="164" style={label}>boPIDManualControlBumplessIN: {this.state.boPIDManualControlBumplessIN}</text>
            <text x="2" y="176" style={label}>rePIDManualControlBumplessTiIN: {this.state.rePIDManualControlBumplessTiIN}</text>


            <text x="160" y="12" style={label}>rePIDOutMaxIN: {this.state.rePIDOutMaxIN  * this.state.rePIDOutMaxScalingIN / 100}</text>
            <Line x1={206} y1={50} x2={206} y2={16} green={true} />
            <Line x1={206} y1={0} x2={206} y2={4} green={true} />

            <text x="160" y="190" style={label}>rePIDOutMinIN: {this.state.rePIDOutMinIN  * this.state.rePIDOutMinScalingIN / 100}</text>
            <Line x1={206} y1={62} x2={206} y2={182} green={true} />
            <Line x1={206} y1={192} x2={206} y2={200} green={true} />
            
            <Line x1={212} y1={56} x2={260} y2={56} green={true} />

            <Limitator 
              x={200}
              y={50}
              green={true}
            />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="260" height="200" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: true})} />
      </g>
    )
  }
}

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
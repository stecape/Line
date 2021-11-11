import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../App.css'


export default class Integrative extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      green: nextProps.green,
      varName: nextProps.varName,
      varValue: nextProps.varValue,
    }
  }

  render() {

    var ID = "Integrative" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
      fontSize: 6,
      strokeWidth: 0.1
    }
    
    return(
      <g>
      <defs>
            <g id={ID}>
              <rect width="12" height="12" fill="none" />
              <text x="4" y="8" style={text}>&int;</text>
            </g>
          </defs>
          <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
      </g>
    )
  }
}

Integrative.defaultProps = {
  x: 0,
  y: 0,
  green: false
}

Integrative.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool
}
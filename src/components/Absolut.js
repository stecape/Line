import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class Absolut extends Component {
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

    var ID = "Absolute" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

    var style = (green) => {
      return {
        color: green ? '#bf360c' : '#78909c',
        fillColor: green ? '#bf360c' : '#78909c',
        fill: green ? '#bf360c' : '#78909c',
        stroke: green ? '#bf360c' : '#78909c'
      }
    }

  	return(
  		<g>
				<defs>
          <g id={ID}>
            <rect width="12" height="12" fill="none" />
            <line x1="2" y1="2" x2="6" y2="6" />
            <line x1="6" y1="6" x2="10" y2="2" />
            <line x1="6" y1="2" x2="6" y2="10" />
            <line x1="2" y1="6" x2="10" y2="6" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="12" height="12" fill="transparent" cursor="pointer" />
   		</g>
  	)
  }
}

Absolut.defaultProps = {
  x: 0,
  y: 0,
  green: false
}

Absolut.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool
}
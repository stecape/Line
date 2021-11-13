import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../App.css'


export default class Limitator extends Component {
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

    var ID = "Limitator" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
          <g id={ID} transform={"rotate(" + this.props.rotate +" 6 6)"} >
            <rect width="12" height="12" fill="none" />
            <line x1="2" y1="2" x2="4" y2="4" />
            <line x1="4" y1="4" x2="8" y2="4" />
            <line x1="8" y1="4" x2="10" y2="2" />
            <line x1="0" y1="6" x2="12" y2="6" />
            <line x1="2" y1="10" x2="4" y2="8" />
            <line x1="4" y1="4" x2="8" y2="4" />
            <line x1="4" y1="8" x2="8" y2="8" />
            <line x1="8" y1="8" x2="10" y2="10" />
          </g>
	      </defs>
	      <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
	    </g>
  	)
  }
}

Limitator.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  rotate: 0
}

Limitator.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  rotate: PropTypes.number
}
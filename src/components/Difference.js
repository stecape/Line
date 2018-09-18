import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class Difference extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      green: nextProps.green
    }
  }

  render() {

    var ID = "Difference" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
          <g id={ID}  >
            <circle  cx="6" cy="6" r="6" fillOpacity="0" />
            <polygon points="12,6 7,8 7,4" transform={"rotate(" + this.props.rotate +" 6 6)"} />
            <line x1={14 + this.props.signPosOffsetX } y1={14 + this.props.signPosOffsetY } x2={18 + this.props.signPosOffsetX } y2={14 + this.props.signPosOffsetY } />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
  		</g>
  	)
  }
}

Difference.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  rotate: 0,
  signPosOffsetX: 0,
  signPosOffsetY: 0
}

Difference.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  rotate: PropTypes.number,
  signPosOffsetX: PropTypes.number,
  signPosOffsetY: PropTypes.number
}
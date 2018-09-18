import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class SwitchNC extends Component {
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

    var ID = "SwitchNC" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
      strokeWidth: 0.1,
      fill: 'gray',
      stroke: 'gray'
    }
    
  	return(
  		<g>
				<defs>
          <g id={ID} transform={"rotate(" + this.props.rotate +" 6 6)"} >
            <rect width="12" height="12" fill="none" />
            <line x1="0" y1="6" x2="3" y2="6" />
            <line x1="3" y1="6" x2="3" y2="8" />
            <line x1={this.state.varValue ? "4" : "3"} y1={this.state.varValue ? "10" : "8"} x2="9" y2="6" />
            <line x1="9" y1="6" x2="12" y2="6" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="12" height="12" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-4 + this.props.textPosOffsetY} style={text}>{this.state.varValue ? "true" : "false"}</text> }
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
  		</g>
  	)
  }
}

SwitchNC.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  textPosOffsetX: 0,
  textPosOffsetY: 0,
  rotate: 0,
  varValue: "",
  varName: ""
}

SwitchNC.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  textPosOffsetX: PropTypes.number,
  textPosOffsetY: PropTypes.number,
  rotate: PropTypes.number,
  varValue: PropTypes.bool,
  varName: PropTypes.string
}
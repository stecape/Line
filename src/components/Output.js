import React, { Component } from 'react'
import '../App.css'


export default class Output extends Component {
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
    
    var ID = "Output" + Math.trunc(Math.random()*1000)

    var style = (green) => {
      return {
        color: green ? '#3fb855' : 'black',
        fillColor: green ? '#3fb855' : 'black',
        fill: green ? '#3fb855' : 'black',
        stroke: green ? '#3fb855' : 'black'
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
          <g id={ID}>
            <rect width="24" height="8" fillOpacity="0.3" fill="#0070CC" />
            <line x1="0" y1="0" x2="4" y2="4" />
            <line x1="0" y1="8" x2="4" y2="4" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="24" height="8" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-4 + this.props.textPosOffsetY} style={text}>{this.state.varValue}</text> }
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
  		</g>
  	)
  }
}
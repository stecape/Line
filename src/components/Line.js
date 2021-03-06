import React, { Component } from 'react'
import '../App.css'


export default class Line extends Component {
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
  	
  	var ID = "Line" + Math.trunc(Math.random()*1000)

    var style = (green) => {
      return {
        color: green ? '#3fb855' : 'black',
        fillColor: green ? '#3fb855' : 'black',
        fill: green ? '#3fb855' : 'black',
        stroke: green ? '#3fb855' : 'black'
      }
    }
    
    var getMarker = (x1, y1, x2, y2, type) => {
      let x = parseFloat(x2)-parseFloat(x1)
      let y = parseFloat(y2)-parseFloat(y1)
      var deg = Math.atan(y/x) * 180 / Math.PI
      var ax = parseFloat(x2)-1.4
      var ay = parseFloat(y2)+1.5
      var bx = parseFloat(x2)+1.4
      var by = parseFloat(y2)
      var cx = parseFloat(x2)-1.4
      var cy = parseFloat(y2)-1.5
      var arrow = ax + "," + ay + " " + bx + "," + by + " " + cx + "," + cy
      if (type==="startPoint") return <circle cx={parseFloat(x1)+1} cy={y1} r="2" transform={'rotate(' + deg + ')'} transform-origin={x1 + " " + y1} /> 
      if (type==="endPoint") return <circle cx={parseFloat(x2)-1} cy={y2} r="2" transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
      if (type==="arrow") return <polygon points={arrow} transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
    }
    
  	return(
  		<g>
		    <defs>
          <g id={ID}>
            <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} />
            {this.props.startPoint && getMarker(this.props.x1, this.props.y1, this.props.x2, this.props.y2, "startPoint") }
            {this.props.endPoint && getMarker(this.props.x1, this.props.y1, this.props.x2, this.props.y2, "endPoint") }
            {this.props.arrow && getMarker(this.props.x1, this.props.y1, this.props.x2, this.props.y2, "arrow") }
          </g>
        </defs>
        <use href={ "#" + ID } style={style(this.state.green)} />
        </g>
  	)
  }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class Input extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // if (nextProps.varName== "boTensionSetRampEnableIN" || nextProps.varName== "bo_ResetIntegrator_IN") {
    //   console.log(nextProps.varName, ": ", nextProps.varValue)
    // }
    return {
      green: nextProps.green,
      varName: nextProps.varName,
      varValue: nextProps.varValue,
      textPosOffsetX: nextProps.textPosOffsetX,
      textPosOffsetY: nextProps.textPosOffsetY,
    }
  }

  render() {

    var ID = "Input" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
      fontSize: 6,
      strokeWidth: 0.1,
      fill: 'gray',
      stroke: 'gray'
    }
    
  	return(
  		<g>
				<defs>
          <g id={ID}>
            <rect width="24" height="8" fillOpacity="0.3" />
            <line x1="18" y1="0" x2="24" y2="4" />
            <line x1="18" y1="8" x2="24" y2="4" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="24" height="8" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-4 + this.props.textPosOffsetY} style={text}>{this.props.logic ? this.props.varValue ? "true" : "false" : decodeEntities(this.props.varValue) }</text> }
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
  		</g>
  	)
  }
}

Input.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  textPosOffsetX: 0,
  textPosOffsetY: 0,
  varValue: "",
  varName: ""
}

Input.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  textPosOffsetX: PropTypes.number,
  textPosOffsetY: PropTypes.number,
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  varName: PropTypes.string
}
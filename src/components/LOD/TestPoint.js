import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../App.css'


export default class TestPoint extends Component {
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

    var ID = "TestPoint" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
            <rect width="12" height="12" fill="none" />
            <line x1="0" y1="0" x2="12" y2="12" />
            <line x1="0" y1="12" x2="12" y2="0" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="12" height="12" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-4 + this.props.textPosOffsetY} style={text}>{decodeEntities(this.state.varValue)}</text> }
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
  		</g>
  	)
  }
}

TestPoint.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  textPosOffsetX: 0,
  textPosOffsetY: 0,
  varValue: "",
  varName: ""
}

TestPoint.propTypes = {
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
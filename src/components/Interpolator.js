import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class Interpolator extends Component {
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

    var ID = "Interpolator" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
            <rect width="24" height="24" fill="none" />
            <line x1="4" y1="20" x2="20" y2="20" />
            <polygon points="20,20.5 20.86,20 20,19.5" />
            <line x1="4" y1="20" x2="4" y2="4" />            
            <polygon points="4.5,4 4,3.13 3.5,4" />
            <line x1="4" y1="20" x2="20" y2="4" />
            <line x1="14.5" y1="20" x2="14.5" y2="11" strokeDasharray="2" />
            <line x1="4" y1="11" x2="14.5" y2="11" strokeDasharray="2" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
        <rect x={this.props.x} y={this.props.y} width="24" height="24" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-4 + this.props.textPosOffsetY} style={text}>{decodeEntities(this.state.varValue)}</text> }
        { this.state.toggle && <text x={this.props.x + this.props.textPosOffsetX} y={this.props.y-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
      </g>
    )
  }
}

Interpolator.defaultProps = {
  x: 0,
  y: 0,
  green: false,
  textPosOffsetX: 0,
  textPosOffsetY: 0,
  varValue: "",
  varName: ""
}

Interpolator.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  green: PropTypes.bool,
  textPosOffsetX: PropTypes.number,
  textPosOffsetY: PropTypes.number,
  varValue: PropTypes.string,
  varName: PropTypes.string
}
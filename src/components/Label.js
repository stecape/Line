import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'


export default class Label extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      varValue: nextProps.varValue,
    }
  }

  render() {

    var ID = "Label" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

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
    
    var text = {
      fontFamily: "Verdana",
      fontSize: 6,
      strokeWidth: 0.1,
      fill: 'gray',
      stroke: 'gray'
    }
    
    return(
      <g id={ID}>
        <text x={this.props.x} y={this.props.y + 6} style={text}>{decodeEntities(this.props.varValue)}</text>
      </g>
    )
  }
}

Label.defaultProps = {
  x: 0,
  y: 0,
  varValue: ""
}

Label.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
}
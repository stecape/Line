import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'

var style = (green) => {
  return {
    color: green ? "#bf360c" : "#78909c",
    fillColor: green ? "#bf360c" : "#78909c",
    fill: green ? "#bf360c" : "#78909c",
    stroke: green ? "#bf360c" : "#78909c"
  };
};

var anchorsSet = (anchor, x, y) => {
  switch (anchor) {
    case 0:
      return [
        [x, y],
        [x + 12, y - 4],
        [x + 24, y],
        [x + 12, y + 4]
      ];

    case 1:
      return [
        [x - 12, y + 4],
        [x, y],
        [x + 12, y + 4],
        [x, y + 8]
      ];

    case 2:
      return [
        [x - 24, y],
        [x - 12, y - 4],
        [x, y],
        [x - 12, y + 4]
      ];

    case 3:
      return [
        [x - 12, y - 4],
        [x, y - 8],
        [x + 12, y - 4],
        [x, y]
      ];

    default:
      return [
        [x, y],
        [x, y],
        [x, y],
        [x, y]
      ];
  }
};

var getCoord = (anchor, x, y) => {
  switch (anchor) {
    case 0:
      return [x, y - 4];

    case 1:
      return [x - 12, y];

    case 2:
      return [x - 24, y - 4];

    case 3:
      return [x - 12, y - 8];

    default:
      return [x, y];
  }
};
export default function InputAnch () {
  

  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1])
      );
    }
  }, [xy, props]);

  static getDerivedStateFromProps(nextProps, prevProps){

    if (nextProps != prevProps) {
      

      return {
        green: nextProps.green,
        varName: nextProps.varName,
        varValue: nextProps.varValue,
        textPosOffsetX: nextProps.textPosOffsetX,
        textPosOffsetY: nextProps.textPosOffsetY,
      }
    }
  }

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
  		<g>
				<defs>
          <g id={this.props.ItemID}>
            <rect width="24" height="8" fillOpacity="0.3" />
            <line x1="18" y1="0" x2="24" y2="4" />
            <line x1="18" y1="8" x2="24" y2="4" />
          </g>
        </defs>
        <use x={coord[this.props.anchor][0]} y={coord[this.props.anchor][1]} href={ '#' + this.props.ItemID } style={style(this.state.green)} />
        <rect x={coord[this.props.anchor][0]} y={coord[this.props.anchor][1]} width="24" height="8" fill="transparent" cursor="pointer" onClick={() => this.setState({toggle: !this.state.toggle})} />
        { this.state.toggle && <text x={coord[this.props.anchor][0] + this.props.textPosOffsetX} y={coord[this.props.anchor][1]-4 + this.props.textPosOffsetY} style={text}>{this.props.logic ? this.props.varValue ? "true" : "false" : decodeEntities(this.props.varValue) }</text> }
        { this.state.toggle && <text x={coord[this.props.anchor][0] + this.props.textPosOffsetX} y={coord[this.props.anchor][1]-14 + this.props.textPosOffsetY} style={text}>{this.state.varName}</text> }
  		</g>
  	)
  }
}

InputAnch.defaultProps = {
  xy: [0, 0],
  green: false,
  textPosOffsetX: 0,
  textPosOffsetY: 0,
  varValue: "",
  varName: ""
}

InputAnch.propTypes = {
  xy: PropTypes.arrayOf(PropTypes.number),
  green: PropTypes.bool,
  textPosOffsetX: PropTypes.number,
  textPosOffsetY: PropTypes.number,
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  varName: PropTypes.string
}
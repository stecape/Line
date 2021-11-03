import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities} from '../common.js'

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

export default function Input (props) {
  const [xy, setXy] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [textPosOffsetXY, setTextPosOffsetXY] = useState([0, 0]);
  const [varValue, setVarValue] = useState("");
  const [varName, setVarName] = useState("");
  const [toggle, setToggle] = useState(true);
  const [anchor, setAnchor] = useState(0);
  

  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1])
      );
    }

    if (JSON.stringify(textPosOffsetXY) !== JSON.stringify(props.textPosOffsetXY)) {
      setTextPosOffsetXY(props.textPosOffsetXY);
    }

    if (green !== props.green) {
      setGreen(props.green);
    }

    if (varName !== props.varName) {
      setVarName(props.varName);
    }

    if (varValue !== props.varValue) {
      setVarValue(props.varValue);
    }

    if (anchor !== props.anchor) {
      setAnchor(props.anchor);
    }

  }, [xy, textPosOffsetXY, green, varName, varValue, anchor, props]);

  var decodeEntities = (() => {
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
  decodeEntities()
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <line x1="18" y1="0" x2="24" y2="4" />
          <line x1="18" y1="8" x2="24" y2="4" />
          <rect width="24" height="8" fillOpacity="0.3" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(props.anchor, xy[0], xy[1])[0]} y={getCoord(props.anchor, xy[0], xy[1])[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      { toggle && <text x={getCoord(props.anchor, xy[0], xy[1])[0] + textPosOffsetXY[0]} y={getCoord(props.anchor, xy[0], xy[1])[1]-4 + textPosOffsetXY[1]} style={textStyle}>{props.logic ? varValue ? "true" : "false" : decodeEntities(varValue) }</text> }
      { toggle && <text x={getCoord(props.anchor, xy[0], xy[1])[0] + textPosOffsetXY[0]} y={getCoord(props.anchor, xy[0], xy[1])[1]-14 + textPosOffsetXY[1]} style={textStyle}>{varName}</text> }
    </g>
  )
}

Input.defaultProps = {
  ItemID: "Goku",
  xy: [0, 0],
  anchor: 0,
  green: false,
  textPosOffsetXY: [0, 0],
  varValue: "",
  varName: "",
  logic: false
}

Input.propTypes = {
  ItemID: PropTypes.string,
  xy: PropTypes.arrayOf(PropTypes.number),
  anchor: PropTypes.number,
  green: PropTypes.bool,
  textPosOffsetXY: PropTypes.arrayOf(PropTypes.number),
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  varName: PropTypes.string,
  logic: PropTypes.bool
}
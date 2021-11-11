import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities} from '../common.js'

var anchorsSet = (anchor, x, y) => {
  switch (anchor) {
    case 0:
      return [
        [x, y],
        [x + 6, y - 6],
        [x + 12, y],
        [x + 6, y + 6]
      ];

    case 1:
      return [
        [x - 6, y + 6],
        [x, y],
        [x + 6, y + 6],
        [x, y + 12]
      ];

    case 2:
      return [
        [x - 12, y],
        [x - 6, y - 6],
        [x, y],
        [x - 6, y + 6]
      ];

    case 3:
      return [
        [x - 6, y - 6],
        [x, y - 12],
        [x + 6, y - 6],
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
      return [x, y - 6];

    case 1:
      return [x - 6, y];

    case 2:
      return [x - 12, y - 6];

    case 3:
      return [x - 6, y - 12];

    default:
      return [x, y];
  }
};

export default function TestPoint (props) {
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

  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <line x1="0" y1="0" x2="12" y2="12" />
          <line x1="0" y1="12" x2="12" y2="0" />
          <rect width="12" height="12" fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1])[0]} y={getCoord(anchor, xy[0], xy[1])[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      { toggle && <text x={getCoord(anchor, xy[0], xy[1])[0] + textPosOffsetXY[0]} y={getCoord(anchor, xy[0], xy[1])[1]-4 + textPosOffsetXY[1]} style={textStyle}>{props.logic ? varValue ? "true" : "false" : decodeEntities(varValue) }</text> }
      { toggle && <text x={getCoord(anchor, xy[0], xy[1])[0] + textPosOffsetXY[0]} y={getCoord(anchor, xy[0], xy[1])[1]-14 + textPosOffsetXY[1]} style={textStyle}>{varName}</text> }
    </g>
  )
}

TestPoint.defaultProps = {
  ItemID: "Goku",
  xy: [0, 0],
  anchor: 0,
  green: false,
  textPosOffsetXY: [0, 0],
  varValue: "",
  varName: "",
  logic: false
}

TestPoint.propTypes = {
  ItemID: PropTypes.string,
  xy: PropTypes.arrayOf(PropTypes.number),
  anchor: PropTypes.number,
  green: PropTypes.bool,
  textPosOffsetXY: PropTypes.arrayOf(PropTypes.number),
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  varName: PropTypes.string,
  logic: PropTypes.bool
}
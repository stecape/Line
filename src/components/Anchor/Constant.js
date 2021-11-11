import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities} from '../common.js'

var anchorsSet = (anchor, x, y, w) => {
  switch (anchor) {
    case 0:
      return [
        [x, y],
        [x + (w/2), y - 6],
        [x + w, y],
        [x + (w/2), y + 6]
      ];

    case 1:
      return [
        [x - (w/2), y + 6],
        [x, y],
        [x + (w/2), y + 6],
        [x, y + 12]
      ];

    case 2:
      return [
        [x - w, y],
        [x - (w/2), y - 6],
        [x, y],
        [x - (w/2), y + 6]
      ];

    case 3:
      return [
        [x - (w/2), y - 6],
        [x, y - 12],
        [x + (w/2), y - 6],
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

var getCoord = (anchor, x, y, w) => {
  switch (anchor) {
    case 0:
      return [x, y - 6];

    case 1:
      return [x - (w/2), y];

    case 2:
      return [x - w, y - 6];

    case 3:
      return [x - (w/2), y - 12];

    default:
      return [x, y];
  }
};

export default function Constant (props) {
  const [xy, setXy] = useState([-1, -1]);
  const [w, setW] = useState(42);
  const [green, setGreen] = useState(false);
  const [varValue, setVarValue] = useState("");
  const [toggle, setToggle] = useState(true);
  const [anchor, setAnchor] = useState(0);
  

  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1], w)
      );
    }

    if (w !== props.w) {
      setW(props.w);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1], props.w)
      );
    }

    if (green !== props.green) {
      setGreen(props.green);
    }

    if (varValue !== props.varValue) {
      setVarValue(props.varValue);
    }

    if (anchor !== props.anchor) {
      setAnchor(props.anchor);
    }

  }, [xy, green, varValue, anchor, w, props]);
  
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <rect width={w} height="12" fillOpacity="0.0" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w)[0]} y={getCoord(anchor, xy[0], xy[1], w)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      <text x={getCoord(0, xy[0], xy[1], w)[0] + 2} y={getCoord(0, xy[0], xy[1], w)[1] + 8} style={textStyle} cursor="pointer">{decodeEntities(varValue)}</text>
    </g>
  )
}

Constant.defaultProps = {
  ItemID: "Goku",
  xy: [0, 0],
  w: 12,
  anchor: 0,
  green: false,
  varValue: "",
  logic: false
}

Constant.propTypes = {
  ItemID: PropTypes.string,
  xy: PropTypes.arrayOf(PropTypes.number),
  w: PropTypes.number,
  anchor: PropTypes.number,
  green: PropTypes.bool,
  varValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])
}
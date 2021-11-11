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

export default function Derivative (props) {
  const [xy, setXy] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [anchor, setAnchor] = useState(0);


  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1])
      );
    }

    if (green !== props.green) {
      setGreen(props.green);
    }

    if (anchor !== props.anchor) {
      setAnchor(props.anchor);
    }

  }, [xy, green, anchor, props]);
    
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <text x="4" y="8" style={textStyle}>&part;</text>
          <rect width="12" height="12" fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1])[0]} y={getCoord(anchor, xy[0], xy[1])[1]} href={ '#' + props.ItemID } style={blockStyle(green)} />
    </g>
  )
}

Derivative.defaultProps = {
  ItemID: "Goku",
  xy: [0, 0],
  anchor: 0,
  green: false,
}

Derivative.propTypes = {
  ItemID: PropTypes.string,
  xy: PropTypes.arrayOf(PropTypes.number),
  anchor: PropTypes.number,
  green: PropTypes.bool,
}
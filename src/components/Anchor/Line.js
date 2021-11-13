import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord, getMarker} from '../common.js'

export default function Line (props) {
  const [base, setBase] = useState(dim.base);
  const [x1y1, setX1y1] = useState([-1, -1]);
  const [x2y2, setX2y2] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [anchor, setAnchor] = useState(0);
  
  useEffect(() => {

    if (JSON.stringify(x1y1) !== JSON.stringify(props.x1y1) || JSON.stringify(x2y2) !== JSON.stringify(props.x2y2)) {
      setX1y1(props.x1y1);
      setX2y2(props.x2y2);
      props.retAnchors(
        props.ItemID,
        [props.x1y1, props.x2y2]
      );
    }

    if (green !== props.green) {
      setGreen(props.green);
    }

    if (anchor !== props.anchor) {
      setAnchor(props.anchor);
    }

  }, [x1y1, x2y2, green, anchor, props]);
    
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <line x1={x1y1[0]} y1={x1y1[1]} x2={x2y2[0]} y2={x2y2[1]} />
          {props.startPoint && getMarker(dim.base, x1y1[0], x1y1[1], x2y2[0], x2y2[1], "startPoint") }
          {props.endPoint && getMarker(dim.base, x1y1[0], x1y1[1], x2y2[0], x2y2[1], "endPoint") }
          {props.arrow && getMarker(dim.base, x1y1[0], x1y1[1], x2y2[0], x2y2[1], "arrow") }
        </g>
      </defs>
      <use href={ "#" + props.ItemID } style={blockStyle(green)} />
      </g>
  )
}

Line.defaultProps = {
  base: dim.base,
  ItemID: "Goku",
  x1y1: [0, 0],
  x2y2: [0, 0],
  anchor: 0,
  startPoint: false,
  endPoint: false,
  arrow: false,
  green: false
}

Line.propTypes = {
  base: PropTypes.number,
  ItemID: PropTypes.string,
  x1y1: PropTypes.arrayOf(PropTypes.number),
  x2y2: PropTypes.arrayOf(PropTypes.number),
  anchor: PropTypes.number,
  startPoint: PropTypes.bool,
  endPoint: PropTypes.bool,
  arrow: PropTypes.bool,
  green: PropTypes.bool
}
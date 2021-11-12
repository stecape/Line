import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function Derivative (props) {
  const [h, setH] = useState(2*dim.base);
  const [w, setW] = useState(2*dim.base);
  const [xy, setXy] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [anchor, setAnchor] = useState(0);


  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1], w, h)
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
          <text x={w/3} y={h/3*2} style={textStyle}>&part;</text>
          <rect width={w} height={h} fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} />
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
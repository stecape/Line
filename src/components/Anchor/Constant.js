import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function Constant (props) {
  const [xy, setXy] = useState([-1, -1]);
  const [h, setH] = useState(2*dim.base);
  const [w, setW] = useState(dim.base/6*42);
  const [green, setGreen] = useState(false);
  const [varValue, setVarValue] = useState("");
  const [toggle, setToggle] = useState(true);
  const [anchor, setAnchor] = useState(0);
  

  useEffect(() => {
    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1], w, h)
      );
    }

    if (w !== dim.base/6*props.w) {
      setW(dim.base/6*props.w);
      props.retAnchors(
        props.ItemID,
        anchorsSet(props.anchor, props.xy[0], props.xy[1], dim.base/6*props.w, h)
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
          <rect width={w} height={h} fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      <text x={getCoord(0, xy[0], xy[1], w, h)[0] + 2*dim.base/6} y={getCoord(0, xy[0], xy[1], w, h)[1] + 9*dim.base/6} style={textStyle} cursor="pointer">{decodeEntities(varValue)}</text>
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
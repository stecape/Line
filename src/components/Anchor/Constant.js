import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function Constant (props) {
  const [base, setBase] = useState(dim.base);
  const [xy, setXy] = useState([-1, -1]);
  const [h, setH] = useState(2*dim.base);
  const [w, setW] = useState(dim.base*7);
  const [green, setGreen] = useState(false);
  const [varValue, setVarValue] = useState("");
  const [toggle, setToggle] = useState(true);
  const [anchor, setAnchor] = useState(0);
  
  //stile del testo dei componenti
  const textStyleOvr = {
    ...textStyle,
    fontSize: base*1.4
  }

  useEffect(() => {

    if (base !== props.base) {
      setBase(props.base);
      setH(2*props.base);
      setW(props.base/dim.base*props.w);
      props.retAnchors(
        props.ItemID,
        anchorsSet(anchor, xy[0], xy[1], props.base/dim.base*props.w, 2*props.base)
      );
    }

    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(anchor, props.xy[0], props.xy[1], w, h)
      );
    }

    if (w !== base/dim.base*props.w) {
      setW(base/dim.base*props.w);
      props.retAnchors(
        props.ItemID,
        anchorsSet(anchor, xy[0], xy[1], base/dim.base*props.w, h)
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

  }, [xy, green, varValue, anchor, w, base, props]);
  
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <rect width={w} height={h} fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      <text x={getCoord(0, xy[0], xy[1], w, h)[0] + 2*base/dim.base} y={getCoord(0, xy[0], xy[1], w, h)[1] + 9*base/dim.base} style={textStyleOvr} cursor="pointer">{decodeEntities(varValue)}</text>
    </g>
  )
}

Constant.defaultProps = {
  base: dim.base,
  ItemID: "Goku",
  xy: [0, 0],
  w: 2*dim.base,
  anchor: 0,
  green: false,
  varValue: "",
  logic: false
}

Constant.propTypes = {
  base: PropTypes.number,
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
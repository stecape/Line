import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function TestPoint (props) {
  const [base, setBase] = useState(dim.base);
  const [h, setH] = useState(2*dim.base);
  const [w, setW] = useState(2*dim.base);
  const [xy, setXy] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [textPosOffsetXY, setTextPosOffsetXY] = useState([0, 0]);
  const [varValue, setVarValue] = useState("");
  const [varName, setVarName] = useState("");
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
      setW(2*props.base);
      setH(2*props.base);
      props.retAnchors(
        props.ItemID,
        anchorsSet(anchor, xy[0], xy[1], 2*props.base, 2*props.base)
      );
    }

    if (JSON.stringify(xy) !== JSON.stringify(props.xy)) {
      setXy(props.xy);
      props.retAnchors(
        props.ItemID,
        anchorsSet(anchor, props.xy[0], props.xy[1], w, h)
      );
    }

    if (textPosOffsetXY[0] !== props.textPosOffsetXY[0]*base/dim.base || textPosOffsetXY[1] !== props.textPosOffsetXY[1]*base/dim.base) {
      setTextPosOffsetXY([props.textPosOffsetXY[0]*base/dim.base,props.textPosOffsetXY[1]*base/dim.base]);
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

  }, [xy, textPosOffsetXY, green, varName, varValue, anchor, base, props]);

  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <line x1="0" y1="0" x2={w} y2={h} />
          <line x1="0" y1={h} x2={w} y2="0" />
          <rect width={w} height={h} fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      { toggle && <text x={getCoord(anchor, xy[0], xy[1], w, h)[0] + textPosOffsetXY[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]-4*base/dim.base + textPosOffsetXY[1]*base/dim.base} style={textStyleOvr}>{props.logic ? varValue ? "true" : "false" : decodeEntities(varValue) }</text> }
      { toggle && <text x={getCoord(anchor, xy[0], xy[1], w, h)[0] + textPosOffsetXY[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]-14*base/dim.base + textPosOffsetXY[1]*base/dim.base} style={textStyleOvr}>{varName}</text> }
    </g>
  )
}

TestPoint.defaultProps = {
  base: dim.base,
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
  base: PropTypes.number,
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
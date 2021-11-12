import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function Connector (props) {
  const [h, setH] = useState(dim.base/3*4);
  const [w, setW] = useState(4*dim.base);
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
        anchorsSet(props.anchor, props.xy[0], props.xy[1], w, h)
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
          { props.input && <><line x1={w/4*3} y1="0" x2={w} y2={h/2} /><line x1={w/4*3} y1={h} x2={w} y2={h/2} /></> }
          { props.output && <><line x1="0" y1="0" x2={w/6} y2={h/2} /><line x1="0" y1={h} x2={w/6} y2={h/2} /></> }
          <rect width={w} height={h} fillOpacity="0.3" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} onClick={() => setToggle(!toggle)}/>
      { toggle && <text x={getCoord(anchor, xy[0], xy[1], w, h)[0] + textPosOffsetXY[0]*dim.base/6} y={getCoord(anchor, xy[0], xy[1], w, h)[1]-4*dim.base/6 + textPosOffsetXY[1]*dim.base/6} style={textStyle}>{props.logic ? varValue ? "true" : "false" : decodeEntities(varValue) }</text> }
      { toggle && <text x={getCoord(anchor, xy[0], xy[1], w, h)[0] + textPosOffsetXY[0]*dim.base/6} y={getCoord(anchor, xy[0], xy[1], w, h)[1]-14*dim.base/6 + textPosOffsetXY[1]*dim.base/6} style={textStyle}>{varName}</text> }
    </g>
  )
}

Connector.defaultProps = {
  ItemID: "Goku",
  xy: [0, 0],
  anchor: 0,
  green: false,
  textPosOffsetXY: [0, 0],
  varValue: "",
  varName: "",
  logic: false,
  input: false,
  output: false,
  innerRef: false
}

Connector.propTypes = {
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
  logic: PropTypes.bool,
  input: PropTypes.bool,
  output: PropTypes.bool,
  innerRef: PropTypes.bool
}
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../../App.css'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord} from '../common.js'

export default function Char (props) {
  const [base, setBase] = useState(dim.base);
  const [h, setH] = useState(2*dim.base);
  const [w, setW] = useState(2*dim.base);
  const [xy, setXy] = useState([-1, -1]);
  const [green, setGreen] = useState(false);
  const [anchor, setAnchor] = useState(0);
  const [cont, setCont] = useState("");
  
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

    if (green !== props.green) {
      setGreen(props.green);
    }

    if (anchor !== props.anchor) {
      setAnchor(props.anchor);
    }

    if (cont !== props.cont) {
      setCont(props.cont);
    }

  }, [xy, green, anchor, base, props]);
    
  return(
    <g>
      <defs>
        <g id={props.ItemID}>
          <text x={w/3} y={h/3*2} style={textStyleOvr}>{cont}</text>
          <rect width={w} height={h} fillOpacity="0.05" cursor="pointer"/>
        </g>
      </defs>
      <use x={getCoord(anchor, xy[0], xy[1], w, h)[0]} y={getCoord(anchor, xy[0], xy[1], w, h)[1]} href={ '#' + props.ItemID } style={blockStyle(green)} />
    </g>
  )
}

Char.defaultProps = {
  base: dim.base,
  ItemID: "Goku",
  xy: [0, 0],
  anchor: 0,
  green: false,
  cont: ""
}

Char.propTypes = {
  base: PropTypes.number,
  ItemID: PropTypes.string,
  xy: PropTypes.arrayOf(PropTypes.number),
  anchor: PropTypes.number,
  green: PropTypes.bool,
  cont: PropTypes.string,
}
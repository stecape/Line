import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import '../App.css'

var style = (green) => {
  return {
    color: green ? "#bf360c" : "#78909c",
    fillColor: green ? "#bf360c" : "#78909c",
    fill: green ? "#bf360c" : "#78909c",
    stroke: green ? "#bf360c" : "#78909c"
  };
};

var getCoord = (anchor, x1y1, x2y2) => {
  switch (anchor) {
    case 0:
      return x1y1;

    case 1:
      return x2y2;

    default:
      return x1y1;
  }
};
  
var getMarker = (x1, y1, x2, y2, type) => {
  let x = parseFloat(x2)-parseFloat(x1)
  let y = parseFloat(y2)-parseFloat(y1)
  var deg = Math.atan(y/x) * 180 / Math.PI
  var ax = parseFloat(x2)-1.4
  var ay = parseFloat(y2)+1.5
  var bx = parseFloat(x2)+1.4
  var by = parseFloat(y2)
  var cx = parseFloat(x2)-1.4
  var cy = parseFloat(y2)-1.5
  var arrow = ax + "," + ay + " " + bx + "," + by + " " + cx + "," + cy
  if (type==="startPoint") return <circle cx={parseFloat(x1)+1} cy={y1} r="2" transform={'rotate(' + deg + ')'} transform-origin={x1 + " " + y1} /> 
  if (type==="endPoint") return <circle cx={parseFloat(x2)-1} cy={y2} r="2" transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
  if (type==="arrow") return <polygon points={arrow} transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
}

export default function Line (props) {

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
          {props.startPoint && getMarker(x1y1[0], x1y1[1], x2y2[0], x2y2[1], "startPoint") }
          {props.endPoint && getMarker(x1y1[0], x1y1[1], x2y2[0], x2y2[1], "endPoint") }
          {props.arrow && getMarker(x1y1[0], x1y1[1], x2y2[0], x2y2[1], "arrow") }
        </g>
      </defs>
      <use href={ "#" + props.ItemID } style={style(green)} />
      </g>
  )
}

Line.defaultProps = {
  x1y1: [0, 0],
  x2y2: [0, 0],
  anchor: 0,
  startPoint: false,
  endPoint: false,
  arrow: false,
  green: false
}

Line.propTypes = {
  x1y1: PropTypes.number,
  x2y2: PropTypes.number,
  anchor: PropTypes.number,
  startPoint: PropTypes.bool,
  endPoint: PropTypes.bool,
  arrow: PropTypes.bool,
  green: PropTypes.bool
}
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Input from '../components/Anchor/Input'
import Line from '../components/Anchor/Line'
import Absolut from '../components/Anchor/Absolut'
import Constant from '../components/Anchor/Constant'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function AnalogInput (props){

  const [anchors, setAnchors] = useState({
    In1: [
      [30, 30],
      [30, 30],
      [30, 30],
      [30, 30]
    ]
  });
  const [results, setResults] = useState({});
  const [selection, setSelection] = useState("");
  const [options, setOptions] = useState([]);
  const [actual, setActual] = useState({});

  var actualData = axios.create({ baseURL: 'http://localhost:3000/awp/React/' });
  const Dataurl = 'data/Analog%20Input.html'
  const PageTitle = 'Analog Input'

  const retAnchors = (name, value) => {
    setAnchors((prevState) => ({ ...prevState, [name]: value }));
  };

  const getAnchors = (ItemID, anchor, offset) => {
    var dx = 0
    var dy = 0
    if (offset) {
      dx = offset[0]
      dy = offset[1]
    }
    try {
      return [anchors[ItemID][anchor][0]+dx,anchors[ItemID][anchor][1]+dy];
    } catch {
      return [10, 10];
    }
  };

  const axiosFunc = new Promise((onSuccess, onError) => {
    actualData.get(Dataurl).then(res => {
      if (JSON.stringify(res.data) !== JSON.stringify(results)){ 
        setResults(res.data)
      }
      onSuccess(res)
      onError()
    })
  })

  const getActs = (item) => {
    Object.keys(item).map((x) => {        
      setActual((prevState) => ({ ...prevState, [x]: item[x]}))
    })
  }

  useEffect(() => {
    var interval
    axiosFunc
    .then(res => {
      var opts = Object.keys(res.data).map( reg => {
        return <MenuItem key={reg} value={reg}>{reg}</MenuItem>
      })
      setOptions(opts)
      setSelection(Object.keys(res.data)[0])
      interval = setInterval(()=> {
        actualData.get(Dataurl).then(res => {
          setResults(res.data)
        })
      }, 10000)
    })

    // returned function will be called on component unmount 
    return () => {
      clearInterval(interval)
    }

  }, []);

  useEffect(() => {
    if(results[selection] != undefined) getActs(results[selection])
  }, [selection, results]);

  var bool = (bool) => { return bool === "1" ? true : false }
  
  var change = (event) => setSelection(event.target.value)

  return (
    <div>
      <Typography variant="h4" color="inherit">
        {PageTitle}
      </Typography>
      <Select onChange={change} value={selection}>
        {options}
      </Select>
      <svg viewBox="0 0 100% 270" transform="scale(1.5 1.5)" preserveAspectRatio="xMinYMin meet">
        <Input
          ItemID="c"
          anchor={0}
          xy={[20, 50]}
          green={true}
          textPosOffsetXY={[0, 0]}
          varName="c"
          varValue={actual.c}
          retAnchors={retAnchors}
        />
        <Line
          ItemID="l1"
          anchor={0}
          x1y1={getAnchors("c", 2)}
          x2y2={getAnchors("c", 2,[30, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <Input
          ItemID="Beauty"
          anchor={0}
          xy={getAnchors("l1", 1)}
          green={true}
          textPosOffsetXY={[0, 0]}
          varName="beauty"
          varValue={bool(actual.beauty)}
          retAnchors={retAnchors}
          logic
        />
        <Line
          ItemID="l2"
          anchor={0}
          x1y1={getAnchors("Beauty", 2)}
          x2y2={getAnchors("Beauty", 2,[30, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <Line
          ItemID="l2a"
          anchor={0}
          x1y1={getAnchors("l2", 1)}
          x2y2={getAnchors("l2", 1,[0, 25])}
          green={true}
          retAnchors={retAnchors}
          startPoint
        />
        <Line
          ItemID="l2b"
          anchor={0}
          x1y1={getAnchors("l2a", 1)}
          x2y2={getAnchors("l2a", 1,[20, 0])}
          green={true}
          retAnchors={retAnchors}
          arrow
        />
        <Absolut
          ItemID="abs"
          anchor={0}
          xy={getAnchors("l2b", 1)}
          green={true}
          retAnchors={retAnchors}
        />
        <Line
          ItemID="labs"
          anchor={0}
          x1y1={getAnchors("abs", 2)}
          x2y2={getAnchors("abs", 2,[24, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <Constant
          ItemID="const"
          anchor={0}
          xy={getAnchors("labs", 1)}
          w={50}
          varValue={"3.1415926"}
          green={false}
          retAnchors={retAnchors}
        />
        <Line
          ItemID="constl1"
          anchor={0}
          x1y1={getAnchors("const", 2)}
          x2y2={getAnchors("const", 2,[6, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <Line
          ItemID="constl2"
          anchor={0}
          x1y1={getAnchors("constl1", 1)}
          x2y2={getAnchors("constl1", 1,[0, 12])}
          green={true}
          retAnchors={retAnchors}
        />
      </svg>
    </div>
  )

}

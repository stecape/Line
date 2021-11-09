import React, { useState, useEffect } from "react";
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import InputAnch from '../components/InputAnch'
import LineAnch from '../components/LineAnch'


export default function FCTemplate (props){ //CUSTOMIZE HERE

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
  const Dataurl = 'data/FCTemplate.html' //CUSTOMIZE HERE
  const PageTitle = 'FCTemplate' //CUSTOMIZE HERE

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
      <svg viewBox="0 0 480 270" > {/* CUSTOMIZE HERE*/}
        <InputAnch
          ItemID="c"
          anchor={0}
          xy={[30, 30]}
          green={true}
          textPosOffsetXY={[0, 0]}
          varName="c"
          varValue={actual.c}
          retAnchors={retAnchors}
        />
        <LineAnch
          ItemID="l1"
          anchor={0}
          x1y1={getAnchors("c", 2)}
          x2y2={getAnchors("c", 2,[30, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <InputAnch
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
        <LineAnch
          ItemID="l2"
          anchor={0}
          x1y1={getAnchors("Beauty", 2)}
          x2y2={getAnchors("Beauty", 2,[30, 0])}
          green={true}
          retAnchors={retAnchors}
        />
        <LineAnch
          ItemID="l2a"
          anchor={0}
          x1y1={getAnchors("l2", 1)}
          x2y2={getAnchors("l2", 1,[0, 25])}
          green={true}
          retAnchors={retAnchors}
          startPoint
        />
        <LineAnch
          ItemID="l2b"
          anchor={0}
          x1y1={getAnchors("l2a", 1)}
          x2y2={getAnchors("l2a", 1,[20, 0])}
          green={true}
          retAnchors={retAnchors}
          arrow
        />
      </svg>
    </div>
  )

}

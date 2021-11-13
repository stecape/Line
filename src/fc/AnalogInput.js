import React, { useState, useEffect } from "react";
import axios from 'axios'
import Connector from '../components/Anchor/Connector'
import Line from '../components/Anchor/Line'
import Absolut from '../components/Anchor/Absolut'
import Constant from '../components/Anchor/Constant'
import Char from '../components/Anchor/Char'
import TestPoint from '../components/Anchor/TestPoint'
import Limitator from '../components/Anchor/Limitator'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import {blockStyle, textStyle, decodeEntities, dim, anchorsSet, getCoord, getAnchors} from '../components/common.js'
import { ChargingStationRounded } from "@mui/icons-material";

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
  const [base, setBase] = useState(2*dim.base);

  var actualData = axios.create({ baseURL: 'http://localhost:3000/awp/React/' });
  const Dataurl = 'data/Analog%20Input.html'
  const PageTitle = 'Analog Input'

  const retAnchors = (name, value) => {
    setAnchors((prevState) => ({ ...prevState, [name]: value }));
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
    <Grid container spacing={2}>
      <Grid item sm={8}>
          <Typography variant="h4" color="inherit">
            {PageTitle}
          </Typography>
      </Grid>
      <Grid item sm={4}>
        <Select onChange={change} value={selection}>
          {options}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <svg width="100%" height="1000" overflow="auto" preserveAspectRatio="none">
          <Connector
            ItemID="c"
            anchor={0}
            base={base}
            xy={[20, 50]}
            green={true}
            textPosOffsetXY={[0, 0]}
            varName="c"
            varValue={actual.c}
            retAnchors={retAnchors}
            input
          />
          <Line
            base={base}
            ItemID="l1"
            anchor={0}
            x1y1={getAnchors(base, anchors, "c", 2)}
            x2y2={getAnchors(base, anchors, "c", 2,[30, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Connector
            ItemID="Beauty"
            anchor={0}
            base={base}
            xy={getAnchors(base, anchors, "l1", 1)}
            green={true}
            textPosOffsetXY={[0, 0]}
            varName="beauty"
            varValue={bool(actual.beauty)}
            retAnchors={retAnchors}
            logic
            output
          />
          <Line
            base={base}
            ItemID="l2"
            anchor={0}
            x1y1={getAnchors(base, anchors, "Beauty", 2)}
            x2y2={getAnchors(base, anchors, "Beauty", 2,[30, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="l2a"
            anchor={0}
            x1y1={getAnchors(base, anchors, "l2", 1)}
            x2y2={getAnchors(base, anchors, "l2", 1,[0, 25])}
            green={true}
            retAnchors={retAnchors}
            startPoint
          />
          <Line
            base={base}
            ItemID="l2b"
            anchor={0}
            x1y1={getAnchors(base, anchors, "l2a", 1)}
            x2y2={getAnchors(base, anchors, "l2a", 1,[20, 0])}
            green={true}
            retAnchors={retAnchors}
            arrow
          />
          <Absolut
            base={base}
            ItemID="abs"
            anchor={0}
            xy={getAnchors(base, anchors, "l2b", 1)}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="labs"
            anchor={0}
            x1y1={getAnchors(base, anchors, "abs", 2)}
            x2y2={getAnchors(base, anchors, "abs", 2,[24, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Constant
            base={base}
            ItemID="const"
            anchor={0}
            xy={getAnchors(base, anchors, "labs", 1)}
            w={50}
            varValue={"3.1415926"}
            green={false}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="constl1"
            anchor={0}
            x1y1={getAnchors(base, anchors, "const", 2)}
            x2y2={getAnchors(base, anchors, "const", 2,[60, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="constl2"
            anchor={0}
            x1y1={getAnchors(base, anchors, "constl1", 1)}
            x2y2={getAnchors(base, anchors, "constl1", 1,[0, 12])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="constl3"
            anchor={0}
            x1y1={getAnchors(base, anchors, "constl2", 1)}
            x2y2={getAnchors(base, anchors, "constl2", 1,[12, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Char
            base={base}
            ItemID="der"
            anchor={0}
            xy={getAnchors(base, anchors, "constl3", 1)}
            green={true}
            retAnchors={retAnchors}
            cont="&part;"
          />
          <Line
            base={base}
            ItemID="lder"
            anchor={0}
            x1y1={getAnchors(base, anchors, "der", 2)}
            x2y2={getAnchors(base, anchors, "der", 2,[12, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Char
            base={base}
            ItemID="int"
            anchor={0}
            xy={getAnchors(base, anchors, "lder", 1)}
            green={true}
            retAnchors={retAnchors}
            cont="&int;"
          />
          <Line
            base={base}
            ItemID="lint"
            anchor={0}
            x1y1={getAnchors(base, anchors, "int", 2)}
            x2y2={getAnchors(base, anchors, "int", 2,[12, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <TestPoint
            base={base}
            ItemID="Test"
            anchor={0}
            xy={getAnchors(base, anchors, "lint", 1)}
            green={true}
            textPosOffsetXY={[0, 0]}
            varName="g"
            varValue={actual.g}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="ltp1"
            anchor={0}
            x1y1={getAnchors(base, anchors, "Test", 2)}
            x2y2={getAnchors(base, anchors, "Test", 2,[4, 0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="ltp2"
            anchor={0}
            x1y1={getAnchors(base, anchors, "ltp1", 1)}
            x2y2={getAnchors(base, anchors, "ltp1", 1,[0, 36])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="ltp3"
            anchor={0}
            x1y1={getAnchors(base, anchors, "ltp2", 1)}
            x2y2={getAnchors(base, anchors, "ltp2", 1,[-20, 0])}
            green={true}
            retAnchors={retAnchors}
            arrow
          />
          <Limitator
            base={base}
            ItemID="Lim"
            anchor={2}
            xy={getAnchors(base, anchors, "ltp3", 1)}
            green={true}
            textPosOffsetXY={[0, 0]}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="llim1"
            anchor={0}
            x1y1={getAnchors(base, anchors, "Lim", 0)}
            x2y2={getAnchors(base, anchors, "Lim", 0,[-20,0])}
            green={true}
            retAnchors={retAnchors}
          />
          <Line
            base={base}
            ItemID="llim2"
            anchor={0}
            x1y1={getAnchors(base, anchors, "llim1", 1)}
            x2y2={getAnchors(base, anchors, "llim1", 1,[0,28])}
            green={true}
            retAnchors={retAnchors}
            arrow
          />
           bisogna centrare il testo di Char in qualche modo
          <Char
            base={base}
            ItemID="inv"
            anchor={1}
            xy={getAnchors(base, anchors, "llim2", 1)}
            green={true}
            retAnchors={retAnchors}
            cont="-1"
          />
        </svg>
      </Grid>
    </Grid>
  )

}

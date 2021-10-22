import React, { Component } from 'react'
import axios from 'axios'
import Ramp from '../components/Ramp'
import TestPoint from '../components/TestPoint'
import InputAnch from '../components/InputAnch'
import Line from '../components/Line'
import Output from '../components/Output'
import SwitchNO from '../components/SwitchNO'
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
  const [selection, setSelection] = useState({});
  const [options, setOptions] = useState({});

  const retAnchors = (name, value) => {
    setAnchors((prevState) => ({ ...prevState, [name]: value }));
  };

  const getAnchors = (ItemID, anchor) => {
    try {
      return anchors[ItemID][anchor];
    } catch {
      return [10, 10];
    }
  };

  const axiosFunc = () => {
    axios.get('data/Analog Input.html').then(res => {
      var data =res.data[selection]
      Object.keys(data).map((x) => {setResults((prevState) => ({ ...prevState, [x]: data[x]}))})
  })}

  useEffect(() => {
    axiosFunc()
    axios.get('data/Analog Input.html').then(results => {
      var options = Object.keys(results.data).map( reg => {
        return <MenuItem key={reg} value={reg}>{reg}</MenuItem>
      })
      setOptions((prevState)=>({...prevState, options: options}))
    })
    var interval = setInterval(axiosFunc, 1000)

    // returned function will be called on component unmount 
    return () => {
      clearInterval(interval)
    }

  }, []);


  var bool = (bool) => { return bool === "1" ? true : false }
  
  var change = (event) => setSelection({selection: event.target.value})

  return (
    <div>
      <Typography variant="title" color="inherit">
        Analog Input
      </Typography>
      <Select onChange={change} value={selection}>
        {options}
      </Select>
      <svg viewBox="0 0 480 270" >
        <InputAnch
          ItemID="In1"
          anchor={0}
          xy={getAnchors("In1", 0)}
          green={true}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="c"
          varValue={results.c}
          retAnchors={retAnchors}
        />
        <InputAnch
          ItemID="In2"
          anchor={1}
          xy={getAnchors("In1", 0)}
          green={true}
          textPosOffsetX={0}
          textPosOffsetY={0}
          varName="c"
          varValue={results.c}
          retAnchors={retAnchors}
        />
      </svg>
    </div>
  )

}

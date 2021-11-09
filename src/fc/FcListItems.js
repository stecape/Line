import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter, matchPath } from 'react-router'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import CachedIcon from '@mui/icons-material/Cached'
import CallReceivedIcon from '@mui/icons-material/CallReceived'
import CallMadeIcon from '@mui/icons-material/CallMade'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

class FcListItems extends Component {
  render () {
    var isSelected = (path) => {
      const match = !!matchPath(this.props.location.pathname, {
        path: path,
        exact: true,
        strict: false
      })
      return match
    }
    return(
      <div>
        <MenuItem divider component={Link} to="/" selected={isSelected("/")} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
        <MenuItem component={Link} to="/Regulator" selected={isSelected("/Regulator")}>
          <ListItemIcon>
            <CachedIcon />
          </ListItemIcon>
          <ListItemText primary="Regulator" />
        </MenuItem>
        <MenuItem component={Link} to="/AnalogInput" selected={isSelected("/AnalogInput")}>
          <ListItemIcon>
            <CallReceivedIcon />
          </ListItemIcon>
          <ListItemText primary="Analog Input" />
        </MenuItem>
        <MenuItem component={Link} to="/AnalogOutput" selected={isSelected("/AnalogOutput")}>
          <ListItemIcon>
            <CallMadeIcon />
          </ListItemIcon>
          <ListItemText primary="Analog Output" />
        </MenuItem>
        <MenuItem component={Link} to="/DiameterCalculation" selected={isSelected("/DiameterCalculation")}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="Diameter Calculation" />
        </MenuItem>
        <MenuItem component={Link} to="/GenericCntroller" selected={isSelected("/GenericCntroller")}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="Generic Cntroller" />
        </MenuItem>
        <MenuItem component={Link} to="/WinderTensionController" selected={isSelected("/WinderTensionController")}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="WinderTensionController" />
        </MenuItem>
        <MenuItem component={Link} to="/PID" selected={isSelected("/PID")}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="PID" />
        </MenuItem>
      </div>
    )
  }
}

export default withRouter(FcListItems)
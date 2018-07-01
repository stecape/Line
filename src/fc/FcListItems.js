import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter, matchPath } from 'react-router'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import CachedIcon from '@material-ui/icons/Cached'
import CallReceivedIcon from '@material-ui/icons/CallReceived'
import CallMadeIcon from '@material-ui/icons/CallMade'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

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
        <MenuItem button divider component={Link} to="/" selected={isSelected("/")} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
        <MenuItem button component={Link} to="/Regulator" selected={isSelected("/Regulator")}>
          <ListItemIcon>
            <CachedIcon />
          </ListItemIcon>
          <ListItemText primary="Regulator" />
        </MenuItem>
        <MenuItem button component={Link} to="/AnalogInput" selected={isSelected("/AnalogInput")}>
          <ListItemIcon>
            <CallReceivedIcon />
          </ListItemIcon>
          <ListItemText primary="Analog Input" />
        </MenuItem>
        <MenuItem button component={Link} to="/AnalogOutput" selected={isSelected("/AnalogOutput")}>
          <ListItemIcon>
            <CallMadeIcon />
          </ListItemIcon>
          <ListItemText primary="Analog Output" />
        </MenuItem>
        <MenuItem button component={Link} to="/DiameterCalculation" selected={isSelected("/DiameterCalculation")}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="Diameter Calculation" />
        </MenuItem>
      </div>
    )
  }
}

export default withRouter(FcListItems)
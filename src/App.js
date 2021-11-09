import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Regulator from './fc/Regulator'
import AnalogInput from './fc/AnalogInput'
import AnalogOutput from './fc/AnalogOutput'
import DiameterCalculation from './fc/DiameterCalculation'
import PID from './fc/PID'
import GenericController from './fc/GenericController'
import WinderTensionController from './fc/WinderTensionController'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import FcListItems from './fc/FcListItems'
import { adaptV4Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#f9683a',
      main: '#bf360c',
      dark: '#870000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a7c0cd',
      main: '#78909c',
      dark: '#4b636e',
      contrastText: '#f5f5f5',
    },
  },
})

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paperContent: {
    padding: 10,
    margin: 10,
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawer: false,
    }
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open
    })
  }

  render() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={this.props.classes.menuButton}
                color="inherit"
                onClick={this.toggleDrawer(true)}
                size="large">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={this.props.classes.flex}>
                Machine Web Tools
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper>
            <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                <List><FcListItems/></List>
              </div>
            </Drawer>
            <div className={this.props.classes.paperContent}>
              <Switch >
                <Redirect from='/index.html' to='/'/>
                <Route exact path="/" component={Home}/>
                <Route path="/Regulator" component={Regulator}/>
                <Route path="/AnalogInput" component={AnalogInput}/>
                <Route path="/AnalogOutput" component={AnalogOutput}/>
                <Route path="/DiameterCalculation" component={DiameterCalculation}/>
                <Route path="/PID" component={PID}/>
                <Route path="/GenericController" component={GenericController}/>
                <Route path="/WinderTensionController" component={WinderTensionController}/>
              </Switch>
            </div>
          </Paper>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default withStyles(styles)(App)
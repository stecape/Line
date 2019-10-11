import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import '../App.css'
import TextField from '@material-ui/core/TextField'


export default class IndexInput extends Component {
  constructor(props){
    super(props)

    this.state = {
      index:      1,
      nextValue:  0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({nextValue: event.target.value})
  }

  handleSubmit(event) {
    var value = this.state.nextValue
    var data = '"HMI".Index.Set.reHMI' + '=' + value.toString()
    axios.post('writeIndex.html', data).then(results => {
      console.log(results.data)
    })
    event.preventDefault()
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.index != prevState.index){
      return {
        index: nextProps.index,
        nextValue: nextProps.index
      }
    }
    return {}
  }

  render() {

    return(
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="standard-number"
          inputProps={{
            name:'"HMI".Index.Set.reHMI'
          }}
          label="Index"
          value={this.state.nextValue}
          onChange={this.handleChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </form>
    )
  }
}

IndexInput.defaultProps = {
  index: 1
}

IndexInput.propTypes = {
  index: PropTypes.number  
}
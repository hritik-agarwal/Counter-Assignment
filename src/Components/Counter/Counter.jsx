import React from 'react';
import axios from 'axios';
import './Counter.css';
import CurrentCount from '../CurrentCount/CurrentCount';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      initialise: 1,
      counterValue: 1,
      minValue: 0,
      maxValue: 1000,
      dataIsSending: false
    }
  }

  componentDidMount() {
    axios
      .get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/hritik.json')
      .then(response => {
        if (response.data !== null) {
          this.setState({ counterValue: response.data });
        } 
      })
  }

  updateInDatabase = () => {
    this.setState({ dataIsSending: true }, () => {
      axios
        .put('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', { "hritik": this.state.counterValue })
        .then(response => { this.setState({ dataIsSending: false }) })
    })
  }

  handleIncrement = () => {
    if (this.state.counterValue >= this.state.maxValue ) return;
    this.setState((prevState) => ({counterValue: prevState.counterValue + 1}), () => { this.updateInDatabase();})
  }
  
  handleDecrement = () => {
    if (this.state.counterValue <= this.state.minValue) return;
    this.setState((prevState) => ({counterValue: prevState.counterValue - 1}), () => { this.updateInDatabase();})
  }

  handleValueChange = (e) => {
    let val = parseInt(e.target.value);
    if (val === '' || val === isNaN) { this.setState({ counterValue: -1 }); return;}
    if (val < this.state.minValue || val > this.state.maxValue) return;
    this.setState({ counterValue: val }, () => { this.updateInDatabase();})
  }

  handleMaximum = (e) => {
    let val = parseInt(e.target.value);
    if (val === isNaN || val < 0) return;
    this.setState({ maxValue: val }, () => {
      if (this.state.counterValue > this.state.maxValue) {
        this.setState({ counterValue: this.state.maxValue }, () => {this.updateInDatabase();})
      }
    })
  }

  handleInitialize = e => {
    let val = parseInt(e.target.value);
    if (val === '' || val === isNaN) { this.setState({ counterValue: -1 }); return;}
    if (val < this.state.minValue || val > this.state.maxValue) return;
    this.setState({ initialise: val, counterValue: val }, () => { this.updateInDatabase();});
  }
  
  render() {
    return (
      <div className='counter'>

        <div id="loader">
          { this.state.dataIsSending ? <div><span id="spinner"></span> Saving counter value</div> : null}
        </div>

        <div id="mainControls">
          <button id="decrementCounterButton" onClick={this.handleDecrement}>-</button>
          <input id="counterField" type="text" value={this.state.counterValue >=0 ? this.state.counterValue : ''} onChange={this.handleValueChange}/>
          <button id="incrementCounterButton" onClick={this.handleIncrement}>+</button>
        </div>

        <CurrentCount count={this.state.counterValue} />

        <div id="featureControls">
          <input type="number" value={this.state.initialise} onChange={this.handleInitialize} min="1" /> Initialize counter <br />
          <input type="number" value={this.state.maxValue} onChange={this.handleMaximum} min="1" /> Set counter maximum value 
        </div>

      </div>
    )
  }
}

export default Counter;
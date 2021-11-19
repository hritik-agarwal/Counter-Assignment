import React from 'react';
import axios from 'axios';
import './Counter.css';
import CounterValue from '../CounterValue/CounterValue';

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

  // api call to fetchi the data from the database to ensure the counterValue is initialized with previous update to counterValue
  componentDidMount() {
    axios
      .get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/hritik.json')
      .then(response => {
        if (response.data !== null) {
          this.setState({ counterValue: response.data });
        } 
      })
  }

  // api call to update database with new counterValue 
  updateInDatabase = () => {
    this.setState({ dataIsSending: true }, () => {
      axios
        .put('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', { "hritik": this.state.counterValue })
        .then(response => { this.setState({ dataIsSending: false }) })
    })
  }

  // increment the counter value whenever user clicks on the increment button & also update the change in database
  handleIncrement = () => {
    if (this.state.counterValue >= this.state.maxValue ) return;
    this.setState((prevState) => ({counterValue: prevState.counterValue + 1}), () => { this.updateInDatabase();})
  }
  
  // decrement the counter value whenever user clicks on the increment button & also update the change in database
  handleDecrement = () => {
    if (this.state.counterValue <= this.state.minValue) return;
    this.setState((prevState) => ({counterValue: prevState.counterValue - 1}), () => { this.updateInDatabase();})
  }

  // update the counterValue & the database whenever the user directly types into the counter value display field
  handleValueChange = (e) => {
    let val = parseInt(e.target.value);
    if (val === '' || val === isNaN) { this.setState({ counterValue: -1 }); return;}
    if (val < this.state.minValue || val > this.state.maxValue) return;
    this.setState({ counterValue: val }, () => { this.updateInDatabase();})
  }

  // update the maxValue of the counter set by the user and set counterValue to max if it is more than the maxValue
  handleMaximum = (e) => {
    let val = parseInt(e.target.value);
    if (val === isNaN || val < 0) return;
    this.setState({ maxValue: val }, () => {
      if (this.state.counterValue > this.state.maxValue) {
        this.setState({ counterValue: this.state.maxValue }, () => {this.updateInDatabase();})
      }
    })
  }

  // initialize the counter value set by the user
  handleInitialize = e => {
    let val = parseInt(e.target.value);
    if (val === '' || val === isNaN) { this.setState({ counterValue: -1 }); return;}
    if (val < this.state.minValue || val > this.state.maxValue) return;
    this.setState({ initialise: val, counterValue: val }, () => { this.updateInDatabase();});
  }
  
  render() {
    return (
      <div className='counter'>

        {/* The loader is shown whenever the counter value is changed */}
        <div id="loader">
          { this.state.dataIsSending ? <div><span id="spinner"></span> Saving counter value</div> : null}
        </div>

        {/* Main Controls of the counter which are increment, decrement and the input field which also works as the counter value display */}
        <div id="mainControls">
          <button id="decrementCounterButton" onClick={this.handleDecrement}>-</button>
          <input id="counterField" type="text" value={this.state.counterValue >=0 ? this.state.counterValue : ''} onChange={this.handleValueChange}/>
          <button id="incrementCounterButton" onClick={this.handleIncrement}>+</button>
        </div>

        {/* An additional component to show the current value of the counter. It takes the current counter value as prop and display it below the main controls. */}
        <CounterValue count={this.state.counterValue} />

        {/* These are additional functionalities - to initialize counter with new value and to set the maximum value the counter will go to */}
        <div id="featureControls">
          <input type="number" value={this.state.initialise} onChange={this.handleInitialize} min="1" /> Initialize counter <br />
          <input type="number" value={this.state.maxValue} onChange={this.handleMaximum} min="1" /> Set counter maximum value 
        </div>

      </div>
    )
  }
}

export default Counter;
import React, { Component } from 'react';
import './Timer.css';

function isValueValid(value){    
  return !isNaN(parseFloat(value)) && isFinite(value) && value < 60 && value >= 0;
}

class InputGroup extends React.Component {
  constructor(){
    super();
    this.state = {
      min: '',
      sec: ''
    }
  }
  handleChangeMin(event) {
    if (isValueValid(event.target.value)){
      this.setState({
        min: parseInt(event.target.value, 10)
      })
    } else {
      this.setState({
        min: ''
      })
    }
  }
  handleChangeSec(event) {
    if (isValueValid(event.target.value)){
      this.setState({
        sec: parseInt(event.target.value, 10)
      })
    } else {
      this.setState({
        sec: ''
      })
    }
  }
  handleAddTimer() {
  	if (isValueValid(this.state.min) && isValueValid(this.state.sec)){
	    let ms = (this.state.min * 60 + this.state.sec) * 1000;
	    this.props.onAddTimer(ms);
	    this.resetInputs();
	  }
  }
  resetInputs() {
    this.setState({
      min: '',
      sec: ''
    })
  }

  render() {
    return (
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Min" 
          value={this.state.min} 
          onChange={this.handleChangeMin.bind(this)} />
        <input 
          type="text" 
          placeholder="Sec" 
          value={this.state.sec} 
          onChange={this.handleChangeSec.bind(this)} />
        <button className="btn" onClick={this.handleAddTimer.bind(this)}>Set counter</button>
      </div>
    );
  }
}


class Timer extends Component {
  constructor(){
    super();
    this.state = {
      value: 1500000,
      isCounting: false
    }
  }

  setCounter(newTime) {
    this.setState({      
      value: newTime
    })
    this.stopCounting();
  }

  counting(){
    var newValue = this.state.value;
    newValue = newValue - 1000;
    this.setState({
      value: newValue
    })
  }

  startCounting(){
    if (!this.state.isCounting) {
      this.timer = setInterval(this.counting.bind(this), 1000);
      this.setState({
        isCounting: true
      })
    }
  }
  stopCounting(){
    clearInterval(this.timer);
    this.setState({
      isCounting: false
    })
  }
  resetCounting(){
    clearInterval(this.timer);
    this.setState({
      value: 1500000,
      isCounting: false
    })
  }

  convertTime(milliseconds) {
    var sec = milliseconds/1000;  
    var minAmount = Math.floor(sec/60);
    var secAmount = Math.floor(sec%60);
    if (secAmount < 10) secAmount = '0' + secAmount; 
    return minAmount + ':' + secAmount;
  }



  render() {
    let shownTime = this.convertTime(this.state.value);

    return (
      <div className="timer">
        <h1 className="timer__title">Timer</h1>

        <div className="timer__counter">{shownTime}</div>

        <div className="timer__buttons">
          <button className="btn" onClick={this.startCounting.bind(this)}>Start</button>
          <button className="btn" onClick={this.stopCounting.bind(this)}>Stop</button>
          <button className="btn" onClick={this.resetCounting.bind(this)}>Reset</button>
        </div>

        <InputGroup onAddTimer={this.setCounter.bind(this)} />

      </div>
    );
  }
}

export default Timer;






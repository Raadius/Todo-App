import { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      timeLeft: this.props.seconds,
      interval: 0,
      isRunning: false,
    };
  }

  convertSeconds(secondsLeft) {
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft - minutes * 60;
    if (minutes < 10) {
      minutes = `${0}${minutes}`;
    }
    if (secondsLeft < 10) {
      secondsLeft = `${0}${secondsLeft}`;
    }
    return { minutes: minutes, seconds: seconds };
  }

  componentDidMount() {
    let timeLeft = this.convertSeconds(this.state.timeLeft);
    console.log(timeLeft);
    this.setState({ minutes: timeLeft.minutes, seconds: timeLeft.seconds });
    this.interval = setInterval(() => {
      this.props.changeTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isRunning, minutes, seconds } = this.state;
    return (
      <span className="description">
        {isRunning ? (
          <button className="icon icon-pause" onClick={this.stopCounting}></button>
        ) : (
          <button className="icon icon-play" onClick={this.startCounting}></button>
        )}
        <span>
          {minutes}:{seconds}
        </span>
      </span>
    );
  }
}

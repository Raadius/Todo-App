import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
export default class Task extends Component {
  state = {
    editable: false,
    value: '',
    date: '',
    id: '',
    isRunning: false,
    created: formatDistanceToNow(this.props.date, { includeSeconds: true }),
  };

  interval = 0;
  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({ created: formatDistanceToNow(this.props.date, { includeSeconds: true }) }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static defaultProps = {
    id: 0,
    description: '',
    date: Date.now(),
    time: '',
    onDeleted: () => {},
    onCheckDone: () => {},
    onToggleEdit: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.number,
    date: PropTypes.object,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
  };

  onEditing = () => {
    this.setState({
      editable: true,
      value: this.props.description,
    });
    document.addEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.setState({
        editable: false,
      });
      document.removeEventListener('keydown', this.onKeyDown);
    }
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
      date: new Date(),
      id: this.props.id,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onToggleEdit(this.state.value);
    this.setState({
      editable: false,
      date: '',
      value: '',
    });
  };

  startCounting = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.refreshTimer();
    }, 1000);
    this.setState({ isRunning: true });
  };

  stopCounting = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  };

  render() {
    const { description, onDeleted, onCheckDone, completed, minutes, seconds } = this.props;
    const { editable, value, created, isRunning } = this.state;
    let classNames = '';
    if (completed) {
      classNames += 'completed';
    }
    if (editable) {
      classNames += 'editing';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCheckDone} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              {isRunning ? (
                <button className="icon icon-pause" onClick={this.stopCounting} disabled={!isRunning}></button>
              ) : (
                <button className="icon icon-play" onClick={this.startCounting} disabled={isRunning}></button>
              )}
              <span>
                {minutes < 10 ? `${0}${minutes}` : minutes} {seconds < 10 ? `${0}${seconds}` : seconds}
              </span>
            </span>
            <span className="description">{`created ${created} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input required className="edit" type="text" onChange={this.onInputChange} value={value}></input>
        </form>
      </li>
    );
  }
}

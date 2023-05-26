import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static defaultProps = {
    onLabelChange: () => {},
  };

  static propTypes = {
    onLabelChange: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  onMinutesChange = (e) => {
    e.preventDefault();
    const validateMinutes = +e.target.value.replace(/\0-9/g, '');
    this.setState({
      min: validateMinutes,
    });
  };

  onSecChange = (e) => {
    e.preventDefault();
    const validateSec = +e.target.value.replace(/\0-9/g, '');
    this.setState({
      sec: validateSec,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
            type="text"
            required
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            onChange={this.onMinutesChange}
            value={this.state.min}
            min={0}
            max={59}
            autoFocus
            required
          ></input>
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.sec}
            min={0}
            max={59}
            autoFocus
            required
          ></input>
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

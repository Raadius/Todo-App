import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
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
    this.props.addItem(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
            type="text"
            required
          ></input>
        </form>
      </header>
    );
  }
}

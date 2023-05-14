import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    description: '',
    created: Date.now(),
    onDeleted: () => {},
    onCheckDone: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.string,
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
  };

  render() {
    const { description, created, onDeleted, onCheckDone } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCheckDone} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

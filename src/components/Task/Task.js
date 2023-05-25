import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  state = {
    editable: false,
    value: '',
  };

  static defaultProps = {
    key: 1,
    description: '',
    created: Date.now(),
    onDeleted: () => {},
    onCheckDone: () => {},
    onToggleEdit: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.string,
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
  };

  onEditing = () => {
    this.setState({
      editable: true,
      value: this.props.description,
    });
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onToggleEdit(this.state.value);
    this.setState({
      editable: false,
    });
  };

  render() {
    const { description, created, onDeleted, onCheckDone, completed } = this.props;
    const { editable, value } = this.state;
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
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input className="edit" type="text" onChange={this.onInputChange} value={value}></input>
        </form>
      </li>
    );
  }
}

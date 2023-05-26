import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';

import Task from '../Task';

export default class TaskList extends Component {
  static defaultProps = {
    items: [],
    onDeleted: () => {},
    onCheckDone: () => {},
    ontoggleEdit: () => {},
    onSecondsToComplete: () => {},
    onStartCounting: () => {},
    onStopCounting: () => {},
  };

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
    ontoggleEdit: PropTypes.func,
    onSecondsToComplete: PropTypes.func,
    onStartCounting: PropTypes.func,
    onStopCounting: PropTypes.func,
  };

  render() {
    const { items, onDeleted, onCheckDone, onToggleEdit, onSecondsToComplete, onStartCounting, onStopCounting } =
      this.props;
    const element = items.map(({ id, completed, ...itemsProp }) => {
      return (
        <Task
          key={id}
          completed={completed}
          {...itemsProp}
          onDeleted={() => onDeleted(id)}
          onCheckDone={() => onCheckDone(id)}
          onToggleEdit={(description) => onToggleEdit(description, id)}
          refreshTimer={() => onSecondsToComplete(id)}
          startCounting={() => onStartCounting(id)}
          stopCounting={() => onStopCounting()}
        />
      );
    });

    return <ul className="todo-list">{element}</ul>;
  }
}

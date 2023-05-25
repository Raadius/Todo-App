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
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
      })
    ),
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
    ontoggleEdit: PropTypes.func,
  };

  render() {
    const { items, onDeleted, onCheckDone, onToggleEdit } = this.props;

    const element = items.map(({ id, completed, ...itemsProp }) => {
      return (
        <Task
          key={id}
          completed={completed}
          {...itemsProp}
          onDeleted={() => onDeleted(id)}
          onCheckDone={() => onCheckDone(id)}
          onToggleEdit={(description) => onToggleEdit(description, id)}
        />
      );
    });

    return <ul className="todo-list">{element}</ul>;
  }
}

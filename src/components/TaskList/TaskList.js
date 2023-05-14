import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

export default class TaskList extends Component {
  static defaultProps = {
    items: [],
    onDeleted: () => {},
    onCheckDone: () => {},
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        editable: PropTypes.bool.isRequired,
        completed: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
      })
    ),
    onDeleted: PropTypes.func,
    onCheckDone: PropTypes.func,
  };

  render() {
    const { items, onDeleted, onCheckDone } = this.props;

    const element = items.map(({ id, editable, completed, ...itemsProp }) => {
      let classNames = '';
      if (completed) {
        classNames += 'completed';
      }
      if (editable) {
        classNames += 'editing';
      }

      return (
        <li key={id} className={classNames}>
          <Task {...itemsProp} onDeleted={() => onDeleted(id)} onCheckDone={() => onCheckDone(id)} />
        </li>
      );
    });

    return <ul className="todo-list">{element}</ul>;
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

import TaskFilters from '../TasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    filterName: 'All',
    activeTasks: 0,
    onFilterChange: () => {},
    onClearCompleted: () => {},
  };

  static propTypes = {
    filterName: PropTypes.string,
    activeTasks: PropTypes.number,
    onFilterChange: PropTypes.func,
    onClearCompleted: PropTypes.func,
  };
  render() {
    const { filterName, activeTasks, onFilterChange, onClearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{activeTasks} items left</span>
        <TaskFilters filterName={filterName} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </footer>
    );
  }
}

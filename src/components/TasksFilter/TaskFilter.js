import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.css';

export default class TaskFilters extends Component {
  buttons = [
    {
      name: 'All',
      label: 'All',
    },
    {
      name: 'Active',
      label: 'Active',
    },
    {
      name: 'Completed',
      label: 'Completed',
    },
  ];

  static defaultProps = {
    filterName: 'All',
    onFilterChange: () => {},
  };

  static propTypes = {
    filterName: PropTypes.string,
    onFilterChange: PropTypes.func,
  };

  render() {
    const { filterName, onFilterChange } = this.props;

    const allButtons = this.buttons.map(({ name, label }) => {
      const isActive = filterName === name;

      let className = '';
      if (isActive) {
        className = 'selected';
      }

      return (
        <li key={name}>
          <button className={className} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{allButtons}</ul>;
  }
}

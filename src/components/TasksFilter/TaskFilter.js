import PropTypes from 'prop-types';
import './TaskFilter.css';

const TaskFilters = ({ filterName, onFilterChange }) => {
  const buttons = [
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

  const allButtons = buttons.map(({ name, label }) => {
    const activeButton = filterName === name;
    const isSelected = activeButton ? 'selected' : '';
    return (
      <li key={name}>
        <button className={isSelected} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{allButtons}</ul>;
};

TaskFilters.defaultProps = {
  filterName: 'All',
  onFilterChange: () => {},
};

TaskFilters.propTypes = {
  filterName: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilters;

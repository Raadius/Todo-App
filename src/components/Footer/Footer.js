import './Footer.css';

import TaskFilters from '../TasksFilter';

Footer.defaultProps = {
  filterName: 'All',
  activeTasks: 0,
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

const Footer = ({ filterName, activeTasks, onFilterChange, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <TaskFilters filterName={filterName} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </footer>
  );
};

export default Footer;

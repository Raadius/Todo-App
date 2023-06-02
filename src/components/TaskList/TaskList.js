import PropTypes from 'prop-types';
import './TaskList.css';

import Task from '../Task';

const TaskList = (props) => {
  const { onDeleted, onCheckDone, onToggleEdit, onSecondsToComplete } = props;

  const taskListItem = props.items.map(({ id, completed, ...props }) => {
    return (
      <Task
        key={id}
        onDeleted={() => onDeleted(id)}
        onCheckDone={() => onCheckDone(id)}
        onToggleEdit={(description) => onToggleEdit(description, id)}
        onSecondsToComplete={() => onSecondsToComplete(id)}
        completed={completed}
        {...props}
      />
    );
  });

  return <ul className="todo-list">{taskListItem}</ul>;
};

TaskList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onCheckDone: PropTypes.func,
  ontoggleEdit: PropTypes.func,
  onSecondsToComplete: PropTypes.func,
  onStartCounting: PropTypes.func,
  onStopCounting: PropTypes.func,
};

export default TaskList;

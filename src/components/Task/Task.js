import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

const Task = (props) => {
  const interval = useRef();
  const timerID = useRef();

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.description);
  const [isRunning, setIsRunning] = useState(false);
  // const [id, setId] = useState(0);
  const [created, setCreated] = useState(formatDistanceToNow(props.date, { includeSeconds: true }));

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCreated(formatDistanceToNow(props.date, { includeSeconds: true }));
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      setIsRunning(false);
    };
  }, []);

  const onEditing = () => {
    setEditing(true);
    setValue(props.description);
    document.addEventListener('keydown', onKeyDown);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditing(false);
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    // setId(props.id);
    document.removeEventListener('keydown', onKeyDown);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onToggleEdit(value);
    setEditing(false);
  };

  const doneCounting = () => {
    clearInterval(interval.current);
    setIsRunning(false);
    props.onCheckDone();
  };

  const stopCounting = () => {
    clearInterval(interval.current);
    setIsRunning(false);
  };

  const startCounting = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      props.onSecondsToComplete();
    }, 1000);

    setIsRunning(true);
  };

  const isCompleted = props.completed ? 'completed' : 'not-completed';
  const isEditing = editing ? 'editing' : 'not-editing';
  const checkBoxChecked = props.completed ? (
    <input className="toggle" type="checkbox" checked onClick={doneCounting} value={'b'} />
  ) : (
    <input className="toggle" type="checkbox" onClick={doneCounting} value={'a'} />
  );
  const toggleButton = isRunning ? (
    <button className="icon icon-pause" onClick={stopCounting} disabled={!isRunning}></button>
  ) : (
    <button className="icon icon-play" onClick={startCounting} disabled={isRunning}></button>
  );

  return (
    <li className={`${isCompleted} ${isEditing}`} disabled={isRunning}>
      <div className="view">
        {checkBoxChecked}
        <label>
          <span className="title">{value}</span>
          <span className="description">
            {toggleButton}
            <span>
              {props.minutes < 10 ? `${0}${props.minutes}` : props.minutes}{' '}
              {props.seconds < 10 ? `${0}${props.seconds}` : props.seconds}
            </span>
          </span>
          <span className="description">{`created ${created} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditing}></button>
        <button className="icon icon-destroy" onClick={props.onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input required className="edit" type="text" onChange={onInputChange} value={value}></input>
      </form>
    </li>
  );
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.number,
  date: PropTypes.object,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onCheckDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onSecondsToComplete: PropTypes.func,
  onStartCounting: PropTypes.func,
  onStopCounting: PropTypes.func,
  id: PropTypes.number,
};

export default Task;

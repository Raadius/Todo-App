import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

newTaskForm.propTypes = {
  onLabelChange: PropTypes.func,
  addItem: PropTypes.func,
  label: PropTypes.string,
  min: PropTypes.number,
  sec: PropTypes.number,
  onMinutesChange: PropTypes.func,
  onSecChange: PropTypes.func,
};
const newTaskForm = (props) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    e.preventDefault();
    const validateMinutes = +e.target.value.replace(/\0-9/g, '');
    setMin(validateMinutes);
  };

  const onSecChange = (e) => {
    e.preventDefault();
    const validateSec = +e.target.value.replace(/\0-9/g, '');
    setSec(validateSec);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.addItem(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
          type="text"
          required
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          onChange={onMinutesChange}
          value={min}
          min={0}
          max={59}
          autoFocus
          required
        ></input>
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={onSecChange}
          value={sec}
          min={0}
          max={59}
          autoFocus
          required
        ></input>
        <button type="submit"></button>
      </form>
    </header>
  );
};

export default newTaskForm;

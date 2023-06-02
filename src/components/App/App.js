import { useState } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filterName, setFilterName] = useState('All');
  const [itemId, setItemId] = useState(0);

  const createTodoItem = (label, min, sec) => {
    if (min < 10) {
      min = `${0}${min}`;
    } else if (sec < 10) {
      sec = '0' + sec;
    }
    setItemId(itemId + 1);
    return {
      id: itemId,
      description: label,
      completed: false,
      date: new Date(),
      minutes: Number(min),
      seconds: Number(sec),
    };
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData((todoData) => {
      const newArr = [...todoData, newItem];
      return newArr;
    });
  };

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onCheckDone = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newItem = { ...todoData[idx], completed: !todoData[idx].completed };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onToggleEdit = (text, id) => {
    console.log(id);
    setTodoData((todoData) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newItem = { ...todoData[idx], description: text };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArr;
    });
  };

  const filterData = (data, filterName) => {
    switch (filterName) {
      case 'All':
        return data;

      case 'Active':
        return data.filter((item) => !item.completed);

      case 'Completed':
        return data.filter((item) => item.completed);

      default:
        return data;
    }
  };

  const onFilterChange = (filterName) => {
    setFilterName(filterName);
  };

  const onClearCompleted = () => {
    setTodoData((todoData) => {
      const newArray = todoData.filter((item) => !item.completed);
      return newArray;
    });
  };

  const onTimeLeft = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const reachableItem = todoData[idx];
      if (reachableItem.minutes !== 0 && reachableItem.seconds === 0) {
        const newItem = { ...reachableItem, minutes: reachableItem.minutes - 1, seconds: 59 };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      } else if (reachableItem.minutes === 0 && reachableItem.seconds === 0) {
        const newItem = { ...reachableItem, minutes: 0, seconds: 0 };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      } else {
        const newItem = { ...reachableItem, seconds: reachableItem.seconds - 1 };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      }
    });
  };

  const filteredList = filterData(todoData, filterName);
  const activeTasks = todoData.filter((item) => !item.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          items={filteredList}
          onDeleted={deleteTask}
          onCheckDone={onCheckDone}
          onToggleEdit={onToggleEdit}
          onSecondsToComplete={onTimeLeft}
        />
        <Footer
          activeTasks={activeTasks}
          filterName={filterName}
          onFilterChange={onFilterChange}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );
};

export default App;

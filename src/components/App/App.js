import React, { Component } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  nextId = 0;
  interval;

  state = {
    todoData: [],
    filterName: 'All',
  };
  //таймер создаётся в секундах
  createTodoItem = (label, min, sec) => {
    if (min < 10) {
      min = `${0}${min}`;
    } else if (sec < 10) {
      sec = '0' + sec;
    }
    return {
      id: this.nextId++,
      description: label,
      completed: false,
      date: new Date(),
      minutes: Number(min),
      seconds: Number(sec),
    };
  };

  addItem = (text, min, sec) => {
    console.log(min);
    console.log(sec);
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onCheckDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newItem = { ...todoData[idx], completed: !todoData[idx].completed };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleEdit = (text, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newItem = { ...todoData[idx], description: text };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  filterData(data, filterName) {
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
  }

  onFilterChange = (filterName) => {
    this.setState({
      filterName,
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.completed);
      return {
        todoData: newArray,
      };
    });
  };

  onTimeLeft = (id) => {
    try {
      this.setState(({ todoData }) => {
        const idx = this.state.todoData.findIndex((item) => item.id === id);
        const reachableItem = todoData[idx];
        if (reachableItem.minutes !== 0 && reachableItem.seconds === 0) {
          const newItem = { ...reachableItem, minutes: reachableItem.minutes - 1, seconds: 59 };
          const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
          return {
            todoData: newArr,
          };
        } else if (reachableItem.minutes === 0 && reachableItem.seconds === 0) {
          const newItem = { ...reachableItem, minutes: 0, seconds: 0 };
          const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
          return {
            todoData: newArr,
          };
        } else {
          const newItem = { ...reachableItem, seconds: reachableItem.seconds - 1 };
          const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
          return {
            todoData: newArr,
          };
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  startCounting = (id) => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.onSecondsToComplete(id);
    }, 1000);
  };

  stopCounting = () => {
    clearInterval(this.interval);
  };

  render() {
    const { todoData, filterName } = this.state;
    const filterList = this.filterData(todoData, filterName);
    const activeTasks = todoData.filter((item) => !item.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            items={filterList}
            onDeleted={this.deleteTask}
            onCheckDone={this.onCheckDone}
            onToggleEdit={this.onToggleEdit}
            onSecondsToComplete={this.onTimeLeft}
            onStartCounting={this.startCounting}
            onStopCounting={this.stopCounting}
          />
          <Footer
            activeTasks={activeTasks}
            filterName={filterName}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}

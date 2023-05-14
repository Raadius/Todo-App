import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  nextId = 0;

  state = {
    todoData: [],
    filterName: 'All',
  };

  createTodoItem = (label) => {
    return {
      id: this.nextId++,
      description: label,
      editable: false,
      completed: false,
      created: `created ${formatDistanceToNow(new Date(), { addSuffix: true })}`,
    };
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
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

  render() {
    const { todoData, filterName } = this.state;
    const filterList = this.filterData(todoData, filterName);
    const activeTasks = todoData.filter((item) => !item.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList items={filterList} onDeleted={this.deleteTask} onCheckDone={this.onCheckDone} />
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

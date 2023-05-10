import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import { formatDistanceToNow } from 'date-fns';

import "./App.css";


export default class App extends Component {

    nextId = 0;

    state = {
        todoData: [
            {
                id: 1,
                description: "Completed task",
                created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
                completed: false,
                editable: false
            },
            {
                id: 2,
                description: "Editing task",
                editable: false,
                completed: false,
                created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
            },
            {
                id: 3,
                description: "Active task",
                editable: false,
                completed: false,
                created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
            }
        ]
    }

    createTodoItem = (label) => {
        return {
            id: this.nextId++,
            description: label,
            editable: false,
            completed: false,
            created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
        };
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        })
    }

    deleteTask = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(item => item.id === id);
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newArray
            }
        });
    }

    onCheckDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(item => item.id === id);
            const newItem = { ...todoData[idx], completed: !todoData[idx].completed };
            const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
            return {
              todoData: newArray,
            }
        });
    }
    render() {
        const { todoData } = this.state
        const activeTasks = todoData.filter((item) => !item.completed).length;
        console.log(activeTasks);

        return (
            <section className="todoapp">
                <NewTaskForm />
                <section className="main">
                    <TaskList items={ this.state.todoData }
                              onDeleted={this.deleteTask}
                              onCheckDone={this.onCheckDone} />
                    <Footer activeTasks={activeTasks}/>
                </section>
            </section>
        );   
    }
};
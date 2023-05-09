import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import { formatDistanceToNow } from 'date-fns';

import "./App.css";


export default class App extends Component {

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
                editable: true,
                completed: false,
                created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
            },
            {
                id: 3,
                description: "Active task",
                editable: true,
                completed: false,
                created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
            }
        ]
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
        return (
            <section className="todoapp">
                <NewTaskForm />
                <section className="main">
                    <TaskList items={ this.state.todoData }
                              onDeleted={this.deleteTask}
                              onCheckDone={this.onCheckDone} />
                    <Footer />
                </section>
            </section>
        );   
    }
};
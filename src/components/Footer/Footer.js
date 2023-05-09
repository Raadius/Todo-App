import React, { Component } from "react";
import TaskFilters from "../TasksFilter";


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">1 items left</span>
                <TaskFilters />
                <button className="clear-completed">Clear Completed</button>
            </footer>
        );
    }
}
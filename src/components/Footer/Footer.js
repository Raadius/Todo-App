import React, { Component } from "react";
import TaskFilters from "../TasksFilter";


export default class Footer extends Component {
    render() {
        const { activeTasks } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{activeTasks} items left</span>
                <TaskFilters />
                <button className="clear-completed">Clear Completed</button>
            </footer>
        );
    }
}
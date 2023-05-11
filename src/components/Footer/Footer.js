import React, { Component } from "react";
import TaskFilters from "../TasksFilter";


export default class Footer extends Component {
    render() {
        const { filterName, activeTasks, onFilterChange, onClearCompleted } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{ activeTasks } items left</span>
                <TaskFilters filterName={ filterName }
                             onFilterChange={ onFilterChange }/>
                <button className="clear-completed"
                        onClick={ onClearCompleted }>
                            Clear Completed
                </button>
            </footer>
        );
    }
}
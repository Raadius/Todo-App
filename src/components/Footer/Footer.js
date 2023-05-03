import React from "react";
import TaskFilters from "../TasksFilter";
const Footer = () => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TaskFilters />
            <button className="clear-completed">Clear Completed</button>
        </footer>
    );
}

export default Footer;
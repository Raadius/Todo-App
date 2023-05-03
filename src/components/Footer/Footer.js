import React from "react";
import TaskFilters from "../TasksFilter";
const Footer = () => {
    return (
        <footer className="footer">
            <span className="todo-count"></span>
            <TaskFilters />
            <button className="clear-completed"></button>
        </footer>
    );
}

export default Footer;
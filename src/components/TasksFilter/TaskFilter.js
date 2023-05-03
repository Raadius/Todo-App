import React from "react";

const TaskFilters = () => {
    return (
        <ul className="filters">
            <li>
                <button className="selected"></button>
            </li>
            <li>
                <button>Active</button>
            </li>
            <li>
                <button>Completed</button>
            </li>
        </ul>
    )
}

export default TaskFilters;
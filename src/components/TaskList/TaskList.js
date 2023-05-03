import React from "react";
import Task from "../Task";
const TaskList = ({items}) => {

    const element = items.map(({id, className, ...itemsProp}) => { 
        return (
            <li key = {id} className={className}>
                <Task {...itemsProp} />
            </li>
        );
        
    })


    return (
        <ul className="todo-list">
           {element}
        </ul>
    );
}

export default TaskList;
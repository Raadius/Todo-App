import React from "react";

const NewTaskForm = () => {
    return (
        <header className="header">
            <h1>todos</h1>
            <input 
                type="text" 
                className="new-todo" 
                placeholder="What needs to be done?">
            </input>
        </header>
    );
};

export default NewTaskForm;
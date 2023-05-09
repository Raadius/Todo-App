import React, { Component } from "react";
import Task from "../Task";


export default class TaskList extends Component {

    render() {
        const { items, onDeleted, onCheckDone } = this.props;

        const element = items.map(({id, editable, completed, ...itemsProp}) => {

            let classNames = "";
            if(completed) {
                classNames += "completed";
            }
            if (editable) {
                classNames += "editing";
            }

            return (
                <li key={ id } className={ classNames }>
                    <Task {...itemsProp} 
                    onDeleted={() => onDeleted(id)}     
                    onCheckDone={() => onCheckDone(id)} />
                </li>
            )
        })

        return (
            <ul className="todo-list">
                {element}
            </ul>
            )
    }

}
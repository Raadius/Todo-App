import React, { Component } from "react";

export default class Task extends Component {
    
    render() {
        const { description, created, onDeleted, onCheckDone } = this.props;

        return (
                <div className="view">
                    <input 
                        className="toggle"
                        type="checkbox"
                        onClick={onCheckDone} />
                    <label>
                        <span className="description">{ description }</span>
                        <span className="created">{ created }</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"
                            onClick={onDeleted}>
                    </button>
                </div>
        );
    }
}
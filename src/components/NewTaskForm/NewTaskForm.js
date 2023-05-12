import React, { Component } from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        if (e.keyCode === 13) {
            this.props.addItem(e.target.value);
            e.target.value = '';
        }
    }
    
    static defaultProps = {
        onLabelChange: () => {},
    }

    static propTypes = {
        onLabelChange: PropTypes.func
    }
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input 
                    className="new-todo" 
                    placeholder="What needs to be done?"
                    autoFocus
                    onChange={this.onLabelChange}
                    onKeyDown={this.onSubmit}></input>
            </header>
        );
    }
};
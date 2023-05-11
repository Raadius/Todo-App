import React, { Component } from "react";

export default class TaskFilters extends Component {
    buttons = [
        {
            name: 'All',
            label: 'All'
        },
        {
            name: 'Active',
            label: 'Active'
        },
        {
            name: 'Completed',
            label: 'Completed'
        }
    ]
    render() {

        const { filter, onFilterChange } = this.props;

        const allButtons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name;

            let className = '';
            if (isActive) {
                className = 'selected';
            }
            
            return (
              <li key={ name } >
                  <button className={ className }
                    onClick={() => onFilterChange(name)} >
                { label }
              </button>
              </li>
            )
          })

        return (
            <ul className="filters">
                { allButtons }
            </ul>
        ); 
    }
}


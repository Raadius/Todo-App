import React from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import { formatDistanceToNow } from 'date-fns';

import "./App.css";


const App = () => {

    const items = [
        {
            id: 1,
            className: "completed",
            description: "Completed task",
            created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
        },
        {
            id: 2,
            className: "editing",
            description: "Editing task",
            created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
        },
        {
            id: 3,
            className: "",
            description: "Active task",
            created: `created ${formatDistanceToNow(new Date(), {addSuffix: true})}`,
        }
    ]
    return (
        <section className="todoapp">
            <NewTaskForm />
            <section className="main">
                <TaskList items={items} />
                <Footer />
            </section>
        </section>
    );
}; 

export default App;
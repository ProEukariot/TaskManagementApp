import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { v4 as uuidv4 } from 'uuid';
import TaskList from "./TaskList";
import { arrayMove } from "@dnd-kit/sortable";

export interface Task {
    id: string;
    title: string;
    done?: boolean;
};

const TaskEditor = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAddTask = (value: string) => {
        const updatedTasks = [...tasks, { id: uuidv4(), title: value }];
        setTasks(updatedTasks);
    };

    const handleChange = (id: string, value: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id == id ? ({ ...task, title: value }) : (task)
        );

        setTasks(updatedTasks);
    };

    const handleToggle = (id: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id == id ? ({ ...task, done: !task.done }) : (task)
        );

        setTasks(updatedTasks);
    };

    const handleDelete = (id: string) => {
        const updatedTasks = tasks.filter((task) => (task.id != id));
        setTasks(updatedTasks);
    };

    const handleDragEnd = (id: string, overId?: string) => {
        if (!overId) return;
        if (id == overId) return;

        const copiedTasks = [...tasks];

        const activeIndex = copiedTasks.findIndex((task) => task.id == id);
        const overIndex = copiedTasks.findIndex((task) => task.id == overId);

        const updatedTasks = arrayMove(copiedTasks, activeIndex, overIndex);

        setTasks(updatedTasks);
    };

    return (
        <div className="">
            <TaskForm onTaskAdd={handleAddTask} />

            <TaskList
                tasks={tasks}
                onToggle={handleToggle}
                onChange={handleChange}
                onDelete={handleDelete}
                onDragEnd={handleDragEnd}
            />

            <button onClick={() => {
                console.log(tasks);
            }}>LOG</button>
        </div>
    );
};

export default TaskEditor
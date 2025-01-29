import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TaskList from "@/components/features/tasks/TaskList";
import { arrayMove } from "@dnd-kit/sortable";

export interface ITask {
  id: string;
  title: string;
  done: boolean;
};

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleAddTask = (value: string) => {
    const updatedTasks = [...tasks, { id: uuidv4(), title: value, done: false }];
    setTasks(updatedTasks);
  };

  const handleChangeTask = (id: string, value: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id == id ? ({ ...task, title: value }) : (task)
    );

    setTasks(updatedTasks);
  };

  const handleToggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id == id ? ({ ...task, done: !task.done }) : (task)
    );

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => (task.id != id));
    setTasks(updatedTasks);
  };

  const handleDragEnd = (id: string, overId?: string) => {
    if (!overId) return;
    if (id == overId) return;

    const activeIndex = tasks.findIndex((task) => task.id == id);
    const overIndex = tasks.findIndex((task) => task.id == overId);

    const updatedTasks = arrayMove(tasks, activeIndex, overIndex);

    setTasks(updatedTasks);
  };

  return (
    <>
      <main className="container flex justify-center min-h-screen mx-auto p-2">
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onTaskAdd={handleAddTask}
          onChange={handleChangeTask}
          onDelete={handleDeleteTask}
          onDragEnd={handleDragEnd}
        />
      </main>

      <Toaster />

      {/* <button onClick={() => console.log(tasks)}>LOG</button> */}

    </>
  );
}

export default App

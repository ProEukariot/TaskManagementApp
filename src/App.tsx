import { useState } from "react";
import Task from "./components/Task"

const TASKS = [{
  id: '1',
  title: 'Do job 1',
  done: true,
}, {

  id: '2',
  title: 'Do job 2',
  done: false,
}, {

  id: '3',
  title: 'Do job 3',
  done: false,
}, {

  id: '4',
  title: '',
  // done: false,
}, {

  id: '5',
  title: 'Do job 5',
  done: true,
}];

type Task = {
  id: string,
  title: string,
  done?: boolean,
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);

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

  return (
    <div className="">
      {
        tasks.map(({ id, title, done }) => (
          <Task
            id={id}
            key={id}
            title={title}
            done={done}
            onToggle={handleToggle}
            onChange={handleChange}
            onDelete={handleDelete}>

          </Task>
        ))
      }
      <button onClick={() => {
        console.log(tasks);
      }}>LOG</button>
    </div>
  )
}

export default App

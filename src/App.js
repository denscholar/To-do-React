import Header from "./component/Header";
import { useState, useEffect } from "react";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./component/Footer";
import About from "./component/About";


function App() {
  const [showAdd, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState([])
  const dbUrl = 'http://localhost:5000/tasks';

  useEffect(() => {
    const callDataFromDb = async () => {
      const setData = await fetchData();
      setTasks(setData);
    }
    callDataFromDb();
  }, [])

  //fetching the Data fro Server
  const fetchData = async () => {
    const res = await fetch(dbUrl);
    const data = await res.json();
    return data
  }


  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch(dbUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data])
  }

  //fetching the Data fro Server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // toggle reminder
  const onToggle = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header showAddTask={() => setShowAdd(!showAdd)} changeButtonTextOntoggle={showAdd} />
        {showAdd && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle} /> : 'No Task to show'}
          <Footer />
      </div>
    </Router>
  );
}

export default App;

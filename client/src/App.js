import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // add task
  const handleAddTask = async () => {
    if (!task.trim()) {
    alert("Please enter a task");
    return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: task,
        }
      );

      alert("Task Added!");

      setTask("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "rgb(219, 24, 24)" }}>
      Task Manager 🚀
      </h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={handleAddTask}
        style={{ padding: "10px" }}
      >
        Add Task
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((item) => (
          <li
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
              gap: "10px"
            }}
          >
            <input
              type="checkbox"
              checked={item.status === "completed"}
              onChange={async () => {
                try {
                  await axios.put(
                    `http://localhost:5000/api/tasks/${item._id}`,
                    {
                      status:
                        item.status === "completed"
                          ? "pending"
                          : "completed",
                    }
                  );

                  fetchTasks();
                } catch (error) {
                  console.log(error);
                }
              }}
            />

            <span
              style={{
                textDecoration:
                  item.status === "completed"
                    ? "line-through"
                    : "none"
              }}
            >
              {item.title}
            </span>

            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5000/api/tasks/${item._id}`
                  );

                  fetchTasks();
                } catch (error) {
                  console.log(error);
                }
              }}
              style={{
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
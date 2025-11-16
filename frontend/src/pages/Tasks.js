import React, { useEffect, useState, useRef } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null); // input no controlado

  // Obtener tareas
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("fetchTasks error:", err);
    }
  };

  // Crear tarea (lee el valor desde el ref)
  const createTask = async () => {
    const title = (inputRef.current && inputRef.current.value) ? inputRef.current.value.trim() : "";
    if (!title) return;

    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      if (inputRef.current) inputRef.current.value = ""; // limpiar solo después de crear
      fetchTasks();
    } catch (err) {
      console.error("createTask error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>📋 Lista de Tareas</h1>

      <div>
        <input
          ref={inputRef}
          style={{ padding: "8px", marginRight: "10px", minWidth: "300px" }}
          placeholder="Nueva tarea"
        />
        <button onClick={createTask}>Agregar</button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? "✔" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

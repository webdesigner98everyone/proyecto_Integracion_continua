import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState(""); // Buscador

  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const API_URL = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  // Crear
  const createTask = async () => {
    if (title.trim() === "") return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    Swal.fire({
      title: "Tarea creada",
      text: "Tu tarea fue agregada correctamente 🚀",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });

    setTitle("");
    fetchTasks();
  };

  // Actualizar
  const editTask = async (task) => {
    const { value: newTitle } = await Swal.fire({
      title: "Editar tarea",
      input: "text",
      inputValue: task.title,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "El nombre no puede estar vacío";
        }
      }
    });

    if (!newTitle) return;

    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    });

    Swal.fire({
      title: "Tarea actualizada",
      text: "La tarea fue modificada correctamente",
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });

    fetchTasks();
  };

  // Cambiar estado
  const toggleTask = async (id, completed) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });

    fetchTasks();
  };

  // Eliminar con confirmación y animación
  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    setDeletingTaskId(id);

    setTimeout(async () => {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
      setDeletingTaskId(null);

      Swal.fire({
        title: "Eliminada",
        text: "La tarea fue eliminada correctamente",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
      });
    }, 400);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // -------------------- HOME ---------------------
  const HomeScreen = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #202020, #3b3b3b)",
        color: "white"
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>🚀 TaskFlow</h1>
      <p>Gestor de tareas con CI/CD</p>

      <button
        onClick={() => setScreen("tasks")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#00b894",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        Comenzar
      </button>
    </div>
  );

  // -------------------- TASKS ---------------------
  const TasksScreen = () => {
    const filteredTasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div
        style={{
          background: "#1e1e1e",
          minHeight: "100vh",
          padding: "30px",
          color: "white"
        }}
      >
        <button
          onClick={() => setScreen("home")}
          style={{
            padding: "8px 16px",
            background: "#555",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ⬅ Volver
        </button>

        <h1>📋 Mis Tareas</h1>

        {/* Buscador */}
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <input
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "8px",
              border: "none",
              background: "#2c2c2c",
              color: "white",
              marginRight: "10px"
            }}
            placeholder="Buscar tarea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Crear */}
        <div style={{ marginBottom: "30px" }}>
          <input
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "8px",
              border: "none",
              marginRight: "10px"
            }}
            placeholder="Nueva tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createTask}
            style={{
              padding: "10px 20px",
              background: "#00b894",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Agregar
          </button>
        </div>

        {/* Lista */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTasks.map((t) => (
            <li
              key={t.id}
              style={{
                background: t.completed ? "#00b89455" : "#333",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.3s",
                opacity: deletingTaskId === t.id ? 0 : 1,
                transform:
                  deletingTaskId === t.id
                    ? "translateX(-30px)"
                    : "translateX(0)"
              }}
            >
              <span
                onClick={() => toggleTask(t.id, t.completed)}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  flex: 1
                }}
              >
                {t.title}
              </span>

              <span>{t.completed ? "✔" : "○"}</span>

              {/* EDITAR */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editTask(t);
                }}
                style={{
                  marginLeft: "10px",
                  background: "#007bff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ✏️
              </button>

              {/* ELIMINAR */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(t.id);
                }}
                style={{
                  marginLeft: "10px",
                  background: "#ff4444",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return screen === "home" ? <HomeScreen /> : <TasksScreen />;
}

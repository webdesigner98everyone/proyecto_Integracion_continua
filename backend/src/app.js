import express from "express";
import taskRoutes from "./routes/tasks.js"; // usa el mismo nombre de la carpeta que ya tienes

const app = express();
app.use(express.json());

// Registrar rutas
app.use("/api/tasks", taskRoutes); // aquí sí debe ir /api/tasks igual que en tu backend original

export default app;

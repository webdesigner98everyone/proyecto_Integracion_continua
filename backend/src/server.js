import express from "express";
import cors from "cors";

import sequelize from "./db/database.js";
import Task from "./models/Task.js";
import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API running 🚀" });
});

app.use("/api/tasks", taskRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("📦 Base de datos conectada correctamente");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Backend running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });

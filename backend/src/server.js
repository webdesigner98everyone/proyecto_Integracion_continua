import app from "./app.js";
import sequelize from "./db/database.js";

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

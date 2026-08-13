const express = require("express");
const projectRoutes = require("./routes/projects");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Projects API running at http://localhost:${PORT}`);
});
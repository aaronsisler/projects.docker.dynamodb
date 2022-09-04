import express from "express";
import { DatabaseService } from "./database";
const app = express();

app.get("/health", (_req, res) =>
  res.send("A hearty hello from express and typescript!")
);

app.get("/database-create", async (_req, res) => {
  try {
    const databaseService = new DatabaseService();
    await databaseService.create();
    res.send("A hearty save from database!");
  } catch (error) {
    res.send("A fault hello from database!");
  }
});

app.get("/database-get", async (_req, res) => {
  try {
    const databaseService = new DatabaseService();
    const result = await databaseService.getItem("Sisler", "Aaron");
    res.send(result);
  } catch (error) {
    res.send("A fault hello from database!");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT: ${port}`));

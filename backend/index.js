// external modules
import express from "express";
const app = express();

// internal modules
import { connection, collectionName } from "./dbconfig.js";

// middleware for parsing JSON
app.use(express.json());

app.post("/add-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.insertOne(req.body);

  if (result) {
    res.send({
      message: "Task added successfully",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Task not added",
      success: false,
      result,
    });
  }
});

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

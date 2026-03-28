// external modules
import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = express();

// internal modules
import { connection, collectionName } from "./dbconfig.js";

// middleware for parsing JSON
app.use(express.json());

// cors middleware for handling the request from frontend
app.use(cors());

// add task to the database
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

// get all the task from database
app.get("/task-list", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.find().toArray();

  if (result) {
    res.send({
      message: "task list fetched successfully",
      success: true,
      result,
    });
  } else {
    res.send({ message: "error try after sometime", success: true, result });
  }
});

// api for getting the task for update
app.get("/task/:id", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });

  if (result) {
    res.send({
      message: "task fetched successfully",
      success: true,
      result,
    });
  } else {
    res.send({ message: "error try after sometime", success: true, result });
  }
});

// api for the task update
app.put("/update-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);

  const { _id, ...fields } = req.body;
  const update = { $set: fields };

  console.log("fields are", fields);
  console.log("ID is:", _id);
  console.log("Type:", typeof _id);

  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);

  if (result) {
    res.send({
      message: "Task updated successfully",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "error to update",
      success: false,
      result,
    });
  }
});

//delete task api
app.delete("/delete/:id", async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result) {
    res.send({
      message: "task deleted successfully",
      success: true,
      result,
    });
  } else {
    res.send({ message: "error try after sometime", success: true, result });
  }
});

app.delete("/delete-all", async (req, res) => {
  const db = await connection();
  const ids = req.body;
  const deleteTaskIds = ids.map((item) => new ObjectId(item));

  const collection = await db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });

  if (result) {
    res.send({
      message: "task deleted successfully",
      success: result,
    });
  } else {
    res.send({ message: "error try after sometime", success: true });
  }
});

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

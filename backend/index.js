// external modules
import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// module for connecting to the database
import { connection, collectionName } from "./dbconfig.js";

// middleware for parsing JSON
app.use(express.json());

// cors middleware for handling the request from frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// middleware for parsing the cookie
app.use(cookieParser());

// api for sign up
app.post("/sign-up", async (req, res) => {
  const userData = req.body;

  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);

    if (result) {
      jwt.sign(userData, "RohitGenius", { expiresIn: "2d" }, (error, token) => {
        res.send({
          success: true,
          msg: "Sign up successfully",
          token,
        });
      });
    } else {
      res.send({
        success: false,
        msg: "Sign up error",
      });
    }
  }
});

// api for login
app.post("/login", async (req, res) => {
  const userLoginInfo = req.body;

  if (userLoginInfo.email && userLoginInfo.password) {
    const db = await connection();
    const collection = db.collection("users");

    const result = await collection.findOne({
      email: userLoginInfo.email,
      password: userLoginInfo.password,
    });

    if (result) {
      jwt.sign(
        userLoginInfo,
        "RohitGenius",
        { expiresIn: "2d" },
        (error, token) => {
          res.send({
            success: true,
            msg: "Login successfully",
            token,
          });
        },
      );
    } else {
      res.send({
        success: false,
        msg: "User does not exist",
      });
    }
  } else {
    res.send({
      success: false,
      msg: "Login not completed",
    });
  }
});

// middleware for verifying the jwt token and the full form for jwt is json web token and this is use to verify the user is login or not
const verifyJWTToken = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, "RohitGenius", (error, decoded) => {
    if (error) {
      res.send({
        success: false,
        msg: "Unauthorized access",
      });
    } else {
      next();
    }
  });
};

// add task to the database
app.post("/add-task", verifyJWTToken, async (req, res) => {
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
app.get("/task-list", verifyJWTToken, async (req, res) => {
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
app.get("/task/:id", verifyJWTToken, async (req, res) => {
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
app.put("/update-task", verifyJWTToken, async (req, res) => {
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
app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
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

// delete all task api
app.delete("/delete-all", verifyJWTToken, async (req, res) => {
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

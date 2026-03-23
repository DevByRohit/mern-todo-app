// external modules mongodb
import { MongoClient } from "mongodb";

// mongodb url
const MONGO_URL =
"mongodb+srv://rohit:rohit2003@cluster0.8aajzdi.mongodb.net/?appName=Cluster0";

const dbName = "todo-app";
export const collectionName = "todo-task";

const client = new MongoClient(MONGO_URL);

export const connection = async () => {
  const connect = await client.connect();
  return await connect.db(dbName);
};


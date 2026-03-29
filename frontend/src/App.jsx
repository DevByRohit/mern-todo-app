import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/sign-up" element={<SignUp></SignUp>} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/"
          element={
            <Protected>
              <TaskList></TaskList>
            </Protected>
          }
        />
        <Route
          path="/add-task"
          element={
            <Protected>
              <AddTask></AddTask>
            </Protected>
          }
        />
        <Route path="/update/:id" element={<UpdateTask></UpdateTask>} />
      </Routes>
    </>
  );
}

export default App;

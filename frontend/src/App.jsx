import "./App.css";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";
import { Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<TaskList></TaskList>} />
        <Route path="/add-task" element={<AddTask></AddTask>} />
        <Route path="/update/:id" element={<UpdateTask></UpdateTask>} />
      </Routes>
    </>
  );
}

export default App;

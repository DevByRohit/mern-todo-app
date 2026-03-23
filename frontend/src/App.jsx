import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<h1>To Do List</h1>} />
        <Route path="/add-task" element={<h1>Add Task</h1>} />
      </Routes>
    </>
  );
}

export default App;

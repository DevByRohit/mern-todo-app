import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="border flex justify-between items-center p-4">
      <div class="border">To Do App</div>
      <ul class="border flex space-x-4">
        <li>
          <Link to="/">To-Do List</Link>
        </li>
        <li>
          <Link to="/add-task">Add Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

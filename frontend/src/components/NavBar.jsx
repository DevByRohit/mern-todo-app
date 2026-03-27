import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="border flex justify-between items-center p-4 bg-blue-100">
      <h1 className="text-2xl font-bold">To Do App</h1>
      <ul className="flex items-center gap-5">
        <li className="border rounded text-xl font-medium py-1 px-4">
          <Link to="/">Task List</Link>
        </li>
        <li className="border rounded text-xl font-medium py-1 px-4">
          <Link to="/add-task">Add Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

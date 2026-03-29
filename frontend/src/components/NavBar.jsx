import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navitage = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    setLogin(null);
    setTimeout(() => {
      navitage("/login");
    }, 0);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem("login"));
    };

    document.addEventListener("storage-change", handleStorageChange);

    return () => {
      document.removeEventListener("storage-change", handleStorageChange);
    };
  }, []);

  return (
    <nav className="border flex justify-between items-center p-4 bg-blue-100">
      <h1 className="text-2xl font-bold">To Do App</h1>
      <ul className="flex items-center gap-5">
        {login ? (
          <>
            <li className="border rounded text-xl font-medium py-1 px-4 cursor-pointer">
              <Link to="/">Task List</Link>
            </li>
            <li className="border rounded text-xl font-medium py-1 px-4 cursor-pointer">
              <Link to="/add-task">Add Task</Link>
            </li>
            <button
              onClick={handleLogout}
              className="border rounded text-xl font-medium py-1 px-4 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [taskData, setTaskData] = useState("");
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let allTaskList = await fetch("http://localhost:3000/task-list");
    allTaskList = await allTaskList.json();

    if (allTaskList.success) {
      setTaskData(allTaskList.result);
    }
  };

  const allTaskSelected = (e) => {
    if (e.target.checked) {
      let taskIds = taskData.map((item) => item._id);
      setSelectedTask(taskIds);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleTask = (id) => {
    if (selectedTask.includes(id)) {
      let remainingSelectedTask = selectedTask.filter((item) => item != id);
      setSelectedTask(remainingSelectedTask);
    } else {
      setSelectedTask(id, ...selectedTask);
    }
    console.log(id);
  };

  const handleDelete = async (id) => {
    let item = await fetch("http://localhost:3000/delete/" + id, {
      method: "delete",
    });
    item = await item.json();

    if (item.success) {
      getListData();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-center mb-6">Task List</h1>

      <ul className="grid grid-cols-[100px_80px_1fr_2fr_180px] items-center">
        {/* Header */}
        <li className="border-2 flex items-center gap-3 border-gray-400 text-lg font-semibold p-2 bg-gray-100">
          <label htmlFor="checkBox">All</label>
          <input
            onClick={allTaskSelected}
            type="checkbox"
            name="checkBox"
            id="checkBox"
            className="w-4 h-4"
          />
        </li>
        <li className="border-2 border-gray-400 text-lg font-semibold text-center p-2 bg-gray-100">
          S.No
        </li>
        <li className="border-2 border-gray-400 text-lg font-semibold p-2 bg-gray-100">
          Title
        </li>
        <li className="border-2 border-gray-400 text-lg font-semibold p-2 bg-gray-100">
          Description
        </li>
        <li className="border-2 border-gray-400 text-lg font-semibold text-center p-2 bg-gray-100">
          Action
        </li>

        {/* Data */}
        {taskData &&
          taskData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <li className="border-2 border-gray-300 text-center p-2">
                  <input
                    onChange={() => selectSingleTask(item._id)}
                    checked={selectedTask.includes(item._id)}
                    type="checkbox"
                    name="checkBox"
                    className="w-4 h-4"
                  />
                </li>

                <li className="border-2 border-gray-300 text-center p-2">
                  {index + 1}
                </li>

                <li className="border-2 border-gray-300 p-2">{item.title}</li>

                <li className="border-2 border-gray-300 p-2">
                  {item.description}
                </li>

                <li className="border-2 flex gap-2 border-gray-300 text-center p-1">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update/${item._id}`}
                    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-900 transition"
                  >
                    Update
                  </Link>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
    </div>
  );
};

export default TaskList;

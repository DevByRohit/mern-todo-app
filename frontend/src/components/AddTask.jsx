import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  // this function use to navigate
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:3000/add-task", {
      method: "POST",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "Application/Json",
      },
    });

    result = await result.json();
    if (result.success) {
      console.log("New task is added");
      navigate("/");
    } else {
      alert("Task is not added");
    }
    setTaskData({
      title: "",
      description: "",
    });
  };

  return (
    <div className="flex items-center justify-center py-6">
      <form
        onSubmit={submitHandler}
        action="/add-task"
        method="post"
        className="border-2 border-gray-500 p-4 bg-blue-50 text-black font-semibold  text-xl rounded shadow-2xl flex flex-col gap-4 w-2xl"
      >
        <h1 className="text-3xl text-center py-1 font-bold">Add New Task</h1>

        <input
          onChange={handleChange}
          value={taskData.title}
          type="text"
          name="title"
          placeholder="Enter task title here"
          className="focus:outline-none border-2 border-gray-500 p-3 rounded"
        />
        <textarea
          onChange={handleChange}
          value={taskData.description}
          name="description"
          rows="4"
          placeholder="Enter task description here"
          className="focus:outline-none border-2 border-gray-500 p-3 rounded"
        ></textarea>
        <input
          type="submit"
          value="Add Task"
          className="focus:outline-none border-2 border-gray-500 p-1 transition duration-300 ease-in-out transform hover:scale-100 hover:bg-black hover:text-white cursor-pointer rounded"
        />
      </form>
    </div>
  );
};

export default AddTask;

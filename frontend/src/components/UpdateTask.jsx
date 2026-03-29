import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  // this function use to navigate
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  //get the task id
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id) => {
    const res = await fetch(`http://localhost:3000/task/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    const data = await res.json();

    if (data.result) {
      setTaskData({
        _id: data.result._id || "",
        title: data.result.title || "",
        description: data.result.description || "",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let updatedTask = await fetch("http://localhost:3000/update-task", {
      method: "PUT",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "Application/Json",
      },
    });

    updatedTask = await updatedTask.json();

    if (updatedTask) {
      console.log("Task updated successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center py-6">
      <form
        onSubmit={submitHandler}
        action="/update-task"
        method="post"
        className="border-2 border-gray-500 p-4 bg-blue-50 text-black font-semibold  text-xl rounded shadow-2xl flex flex-col gap-4 w-2xl"
      >
        <h1 className="text-3xl text-center py-1 font-bold">Update Existing Task</h1>

        <input
          type="text"
          name="title"
          onChange={handleOnChange}
          value={taskData.title}
          placeholder="Enter task title here"
          className="focus:outline-none border-2 border-gray-500 p-3 rounded"
        />
        <textarea
          name="description"
          onChange={handleOnChange}
          value={taskData.description}
          rows="4"
          placeholder="Enter task description here"
          className="focus:outline-none border-2 border-gray-500 p-3 rounded"
        ></textarea>
        <input
          type="submit"
          value="Update Task"
          className="focus:outline-none border-2 border-gray-500 p-1 transition duration-300 ease-in-out transform hover:scale-100 hover:bg-black hover:text-white cursor-pointer rounded"
        />
      </form>
    </div>
  );
};

export default UpdateTask;

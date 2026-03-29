import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // this function use to navigate
  const navigate = useNavigate();

  // this useEffect is use to check if user is already login then redirect to home page
  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // api call to login
    let result = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "Application/Json",
      },
    });

    result = await result.json();
    if (result.success) {
      document.cookie = `token=${result.token}`;
      localStorage.setItem("login", formData.email);
      document.dispatchEvent(new Event("storage-change"));
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-14">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to your account
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          action="/login"
          method="post"
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Sign up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    let result = await fetch("http://localhost:3000/sign-up", {
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
      navigate("/login");
    } else {
      alert(result.msg);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mt-14">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          action="/sign-up"
          method="post"
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

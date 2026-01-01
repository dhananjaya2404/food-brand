import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = {
      name,
      mobile_number,
      email,
      password,
      role,
    };
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
        });
      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <>
      <div className=" signup-3d-container min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-600 to-indigo-900 p-6">
        <form className="signup-3d-card bg-white/20 backdrop-blur-xl w-[32rem] p-8 rounded-2xl shadow-lg shadow-gray-300/40 border border-white/30 h-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 flex justify-center">Signup</h2>
          <label className="text-xl text-white">Full Name:</label>
          <input
            type="text"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="text-xl text-white">Email:</label>
          <input
            type="email"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-xl text-white">MobileNumber:</label>
          <input
            type="text"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={mobile_number}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <label className="text-xl text-white">Password:</label>
          <input
            type="password"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="text-xl text-white">Role:</label>
          <select
            className="border border-white/40 bg-white/20 text-black rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" >Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">Customer</option>
            <option value="restaurant">Restaurant</option>
          </select>
          <div className="flex justify-center mt-4">
            <p className="text-white text-lg">
                Already have an account?{" "}
                <Link to="/login" className="text-[#00f7ff] font-semibold hover:underline">
                Login
                </Link>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button className=" bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignupPage;
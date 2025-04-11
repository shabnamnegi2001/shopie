import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  });

  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    await axios
      .post("https://api.escuelajs.co/api/v1/users/", formData)
      .then(() => {
        navigate("/login");
      });
  }

  const onChange = (e) => {
    setFormData((prev) => {
      prev[e.target.name] = e.target.value;
      return {
        ...prev,
      };
    });
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen text-center">
      <div className="w-[400px] h-auto py-5 border rounded-lg">
        <h1 className="text-xl text1">Sign Up</h1>
        <form
          className="flex flex-col gap-5 p-4 "
          onChange={onChange}
          onSubmit={signup}
        >
          <lable className='text-left font-semibold'>Name</lable>

          <input
            className="border rounded-xs p-1"
            name="name"
            value={formData?.name}
            type="text"
            onChange={onChange}
          />
          <lable className='text-left font-semibold'>Email</lable>

          <input
            className="border rounded-xs p-1"
            name="email"
            value={formData?.email}
            type="email"
            onChange={onChange}
          />
          <lable className='text-left font-semibold'>Password</lable>

          <input
            className="border rounded-xs p-1"
            name="password"
            value={formData?.password}
            type="password"
            onChange={onChange}
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg button1 py-2 px-2 mt-8"
          >
            Signup
          </button>
          <span>
            Or
          </span>
          <button
            className="cursor-pointer rounded-lg button1 py-2 px-2"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

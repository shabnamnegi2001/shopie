import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  async function login(e) {


    e.preventDefault();
    await axios
      .post("https://api.escuelajs.co/api/v1/auth/login", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
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
      <div className="w-[400px] h-[500px] py-5  border rounded-lg">
        <h1 className="text-xl text1 ">Login</h1>
        
        <form
          className="flex flex-col gap-5 p-4 "
          onChange={onChange}
          onSubmit={login}
        >
          <lable className='text-left font-semibold'>Email</lable>
          <input
            className="border rounded-xs p-1"
            name="email"
            value={formData?.email}
            type="email"
            onChange={onChange}
            placeholder="abc@gmail.com"
          />

          <lable className='text-left font-semibold'>Password</lable>

          <input
            className="border rounded-xs p-1"
            name="password"
            value={formData?.password}
            type="password"
            onChange={onChange}
            placeholder="abc124"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg button1 py-2 px-2 mt-8"
          >
            Login
          </button>
          <span>
            Or
          </span>
          <button
            className="cursor-pointer rounded-lg button1 py-2 px-2"
            onClick={(e) => {
              e.preventDefault()
              navigate('/signup')
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const loginUser = async (data) => {
    try {
      const loggedInUser = await authService.login(data);
      if (loggedInUser.state && loggedInUser.data) {
        console.log(loggedInUser.data);
        dispatch(login(loggedInUser.data));
        navigate("/home");
      } else {
        setLoginErrorMessage(loggedInUser.data);
      }
    } catch (e) {
      setLoginErrorMessage(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[80%]">
      <div
        className="
      mx-auto w-full max-w-lg bg-zinc-800 rounded-xl p-5 border-2 border-zinc-500 text-white"
      >
        <div className="Logo mb-2 flex justify-center">
          <h1 className="text-2xl font-bold tracking-tight">blogPosted</h1>
        </div>
        <h2 className="text-center text-xl leading-tight">
          Log in to your account
        </h2>
        {loginErrorMessage && (
          <p className="text-red-500 text-center">{loginErrorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit(loginUser)}
          className="flex flex-col items-center"
        >
          <Input
            ref={emailRef}
            label="Email: "
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            ref={passwordRef}
            label="Pass word: "
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" clasName="w-[80%] mt-4 rounded-xl">
            Login
          </Button>
        </form>

        <p className="mt-2 text-center text-base text-orange-800">
          did'nt made an account yet?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-pimary transition-all duration-200 hover:underline text-blue-600 cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUperrorMessage, setSignUpErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      const user = await authService.createAccount(data);
      if (user.state && user.data) {
        const loggedInUser = await authService.login(data);
        if (loggedInUser.state && loggedInUser.data) {
          dispatch(login(loggedInUser.data));
          navigate("/home");
        }
      } else {
        setSignUpErrorMessage(user.data);
      }
    } catch (error) {
      setSignUpErrorMessage(error);
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
          Sign up to your account
        </h2>
        {signUperrorMessage && (
          <p className="text-red-500 text-center">{signUperrorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col items-center"
        >
          <Input
            ref={fullNameRef}
            label="Full Name: "
            type="text"
            {...register("name", { required: true })}
          />
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
            Sign Up
          </Button>
        </form>

        <p className="mt-2 text-center text-base text-orange-800">
          already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-pimary transition-all duration-200 hover:underline text-blue-600 cursor-pointer"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

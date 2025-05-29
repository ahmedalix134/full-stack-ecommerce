"use client";
import { login } from "@/action/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const Login = () => {
  const [state, action, isPending] = useActionState(login, undefined);
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col items-center pb-5 ">
      <h1 className="text-4xl text-center text-white pt-25">Log In</h1>
      <div className="flex justify-center items-center pt-10">
        <form
          action={action}
          className="flex flex-col gap-5 w-96 shadow p-3 bg-white rounded"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              defaultValue={state?.email}
              type="text"
              name="email"
              placeholder="E-mail"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors?.email && (
              <p className="error">{state.errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors?.password && (
              <p className="error">{state.errors.password}</p>
            )}
          </div>

          <button
            disabled={isPending}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isPending ? "Loging In..." : "Log In"}
          </button>
          <Link
            className="text-blue-700 hover:underline w-fit"
            href={"/signup"}
          >
            I don’t have an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

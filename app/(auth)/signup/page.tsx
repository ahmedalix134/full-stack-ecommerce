"use client";
import { signup } from "@/action/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const Signup = () => {
  const [state, action, isPending] = useActionState(signup, undefined);
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col items-center pb-5">
      <h1 className="text-4xl text-white text-center pt-25">Sign Up</h1>
      <div className="flex justify-center items-center pt-10">
        <form
          action={action}
          className="flex flex-col gap-5 w-96 shadow p-3 bg-white rounded"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              defaultValue={state?.username}
              type="text"
              name="username"
              placeholder="Username"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors?.username && (
              <p className="error"> {state.errors.username}</p>
            )}
          </div>
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
            {state?.errors &&
              Array.isArray(
                (state.errors as { password?: string[] }).password
              ) && (
                <div className="error">
                  <p>password must be : </p>
                  <ul>
                    {(state.errors as { password?: string[] }).password?.map(
                      (error: string, index: number) => (
                        <li key={index}>{error}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="password again"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors && "confirmPassword" in state.errors && (
              <p className="error">
                {" "}
                {
                  (state.errors as { confirmPassword?: string[] | string })
                    .confirmPassword
                }
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
          <Link className="text-blue-700 hover:underline w-fit" href={"/login"}>
            I already have an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;

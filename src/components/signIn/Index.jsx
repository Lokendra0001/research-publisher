"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { notify } from "../../utils/toast";
import Input from "../common/Input";
import { Loader2 } from "lucide-react";
import { login } from "@/redux/slices/auth/authSliceThungs";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Dispatch the thunk and unwrap the result
      const result = await dispatch(
        login({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      // If successful, redirect to user's role page
      if (result?.role) {
        router.replace(`/${result.role}`);
      }
    } catch (error) {
      // Error is already handled in the thunk (notify.error)
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-primary-blue mb-6">
        Sign Up / Login
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Login Form */}
        <div className="flex-1">
          <div className="border border-border rounded-sm">
            {/* Form Header */}
            <div className="bg-border/50 px-4 py-3 border-b border-border border-dotted mb-4">
              <h2 className="text-lg font-bold text-text-primary/70">
                Log In Form{" "}
                <span className="text-danger text-sm font-normal">
                  (*Required)
                </span>
              </h2>
            </div>

            {/* Form Content */}
            <div className="px-3 md:px-6 pb-6 pt-2">
              {/* Dashed Separator Line */}
              <div className="border-b border-border border-dashed mb-6"></div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="bg-border/50 p-4 rounded-sm">
                    <div className="mb-1">
                      <span className="text-danger mr-1">*</span>
                      <label className="font-bold text-text-primary text-sm">
                        Email
                      </label>
                    </div>
                    <Input
                      placeholder="enter email here"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={errors.email}
                      className="bg-primary-foreground border-border h-10"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="bg-border/50 p-4 rounded-sm">
                    <div className="mb-1">
                      <span className="text-danger mr-1">*</span>
                      <label className="font-bold text-text-primary text-sm">
                        Password
                      </label>
                    </div>
                    <Input
                      placeholder="********"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      error={errors.password}
                      className="bg-primary-foreground border-border h-10"
                    />
                  </div>

                  <div>
                    <Link
                      href="/forgot-password"
                      className="text-primary-blue/90 hover:text-primary-blue hover:underline text-sm font-bold"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary-blue/90 hover:bg-primary-blue text-primary-foreground px-6 py-2 rounded-sm text-sm font-bold cursor-pointer  transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                      {isLoading && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      Log In
                    </button>
                    <div className="text-sm text-gray-700">
                      New User?{" "}
                      <Link
                        href="/signup"
                        className="text-primary-blue/70 hover:text-primary-blue hover:underline font-bold"
                      >
                        Click Here
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

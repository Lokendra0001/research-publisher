"use client";
import { constant } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { fetchUser } from "@/redux/slices/auth/authSliceThungs";
import useUserDetail from "@/customHooks/useUserDetail";

const Provider = ({ children }) => {
  const dispatch = useDispatch();
  const { initialLoading } = useUserDetail();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Minimal circular loader */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />

          {/* Inner circle with IJ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
              <span className="text-orange-500 font-bold text-xl">IJ</span>
            </div>
          </div>
        </div>

        {/* Simple text */}
        <p className="mt-6 text-orange-500 font-medium tracking-wider">
          IJ Army
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Provider;

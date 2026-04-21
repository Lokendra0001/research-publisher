'use client'
import { constant } from "@/utils/constant";
import axios from "axios";
import React from "react";

const page = () => {
  const handleSendEmail = async () => {
    try {
      const res = await axios.post(
        `${constant.SERVER_URL}public/test-email`,
        {
          email: "rajpurohitlokendra62@gmail.com",
        },
        { withCredentials: true },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return <button className="p-5 bg-purple-600 text-white rounded-xl my-15 cursor-pointer" onClick={handleSendEmail}>Send Mail</button>;
};

export default page;

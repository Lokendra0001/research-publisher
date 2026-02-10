"use client";
import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#1a237e] mb-6 border-b-2 border-[#d4af37] pb-2 inline-block w-full">
        Contact Us
      </h1>

      {/* Editor in Chief Box */}
      <div className="border-2 border-gray-400 p-6 mb-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Editor-in-Chief</h2>
        <div className="text-gray-800 space-y-1 font-medium">
          <p>A 86, Swastk Row House, Near Shreeji Nagri,</p>
          <p>Palanpur Jakatnaka,</p>
          <p>Surat-395005, Gujarat, India</p>
          <p>Mobile: 9909091133</p>
          <p>E-mail: bhumika.charnanand@vwvususrat.ac.in</p>
        </div>
      </div>

      {/* Info Text */}
      <div className="text-gray-700 text-sm mb-8 space-y-1">
        <p>Before contacting us, please read our FAQs</p>
        <p>Editorial Board queries: support@ijarmy.com</p>
        <p>For any specific query you may send us an email or use the contact</p>
      </div>

      {/* Contact Form */}
      <form className="max-w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              <span className="text-red-600 mr-1">*</span>Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              <span className="text-red-600 mr-1">*</span>Email ID
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Mobile No. */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              <span className="text-red-600 mr-1">*</span>Mobile No.
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            <span className="text-red-600 mr-1">*</span>Message
          </label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-[#0d1b3e] text-white px-6 py-2 rounded font-medium hover:bg-blue-900 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;

"use client";

import React, { useState } from "react";

const AccountDetailsPage = () => {
  const [fullName, setFullName] = useState("Bruce Ni");
  const [email, setEmail] = useState("test@tesgt.com");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleSaveChanges = () => {
    if (password !== retypePassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    alert("Changes saved!");
  };

  const isSaveDisabled =
    password !== retypePassword || password === "" || retypePassword === "";

  return (
    <div className="min-h-screen bg-[#F0F9F6]/50 flex flex-col p-4 py-10">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 ">
         Account Details
        </h1>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full border-collapse border border-gray-300 bg-white/70">
            <tbody>
              {/* Full Name */}
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-[#A1EEBD]/50 text-left">
                  Full Name
                </th>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => handleChange(e, setFullName)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    disabled
                  />
                </td>
              </tr>
              {/* Email */}
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-[#A1EEBD]/50 text-left">
                  Email Address
                </th>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e, setEmail)}
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-black cursor-not-allowed"
                    disabled
                  />
                </td>
              </tr>
              {/* Password */}
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-[#A1EEBD]/50 text-left">
                  New Password
                </th>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handleChange(e, setPassword)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
              </tr>
              {/* Retype Password */}
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-[#A1EEBD]/50 text-left">
                  Retype Password
                </th>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => handleChange(e, setRetypePassword)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
              </tr>
              {/* Password Error */}
              {passwordError && (
                <tr>
                  <td colSpan={2} className="text-sm text-red-500 px-4 py-2">
                    {passwordError}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveChanges}
              disabled={isSaveDisabled}
              className={`${
                isSaveDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-900 hover:bg-blue-500"
              } text-white px-6 py-2 rounded-lg`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDetailsPage;

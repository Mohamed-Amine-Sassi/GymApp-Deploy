"use client";

import type React from "react";

import { useState } from "react";
import axios, { isAxiosError } from "axios";
import useAdminCheck from "./AdminCheck";
import { useSecurityContext } from "../Context/SecurityContext";

function AddMember() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialty, setSpecialty] = useState(" ");
  const { accessToken, setAccessToken } = useSecurityContext();
  const auth = useAdminCheck();

  const registerMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addMember`,
        { firstName, lastName, dateOfBirth, phoneNumber, specialty },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
          timeout: 5000,
        }
      );
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setPhoneNumber("");
      setSpecialty("");
      console.log("Done:", res);
    } catch (err) {
      if (isAxiosError(err)) {
        try {
          const refreshRes = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/refreshAdminToken`,
            {},
            { withCredentials: true }
          );

          if (refreshRes && refreshRes.status === 200) {
            const newToken = refreshRes.data.AccessToken;
            setAccessToken(newToken);
            const retryRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/addMember`,
              { firstName, lastName, dateOfBirth, phoneNumber, specialty },
              {
                headers: {
                  authorization: `Bearer ${newToken}`,
                },
                withCredentials: true,
              }
            );
            if (retryRes.status === 200 || retryRes.status === 201) {
              console.log("Done with refreshed token:", retryRes.data);
              setFirstName("");
              setLastName("");
              setDateOfBirth("");
              setPhoneNumber("");
              setSpecialty("");
            }
          }
        } catch (retryErr) {
          console.log("Failed even after token refresh:", retryErr);
          if (isAxiosError(retryErr)) {
            console.log(
              "Retry error details:",
              retryErr.response?.status,
              retryErr.response?.data
            );
          }
        }
      } else {
        console.log("Non-Axios error:", err);
      }
    }
  };

  if (auth == null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-100">Loading ...</h1>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-400">Unauthorised !</h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide">
            <span className="text-orange-500">MEMBER </span>
            REGISTRATION
          </h1>

          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-orange-500 mb-6 uppercase tracking-wider">
              Add New Member
            </h2>

            <form onSubmit={registerMember} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-500 font-bold text-sm uppercase tracking-wide mb-2">
                    First Name:
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 text-gray-100 font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-orange-500 font-bold text-sm uppercase tracking-wide mb-2">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 text-gray-100 font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-500 font-bold text-sm uppercase tracking-wide mb-2">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 text-gray-100 font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-orange-500 font-bold text-sm uppercase tracking-wide mb-2">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 text-gray-100 font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <div className="bg-gray-900 border border-gray-600 rounded p-4 mb-6">
                  <div className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                    Role Assignment
                  </div>
                  <div className="text-gray-100 font-mono text-lg">MEMBER</div>
                </div>
              </div>

              <div>
                <label className="block text-orange-500 font-bold text-sm uppercase tracking-wide mb-2">
                  Specialty:
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 text-gray-100 font-mono focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">-- Select Specialty --</option>
                  <option value="Karate">Karate</option>
                  <option value="Musculation">Musculation</option>
                  <option value="Gymnastique">Gymnastique</option>
                  <option value="Box">Box</option>
                  <option value="MMA">MMA</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-3 px-6 rounded uppercase tracking-wider transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Register Member
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMember;

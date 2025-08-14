"use client";

import axios, { isAxiosError } from "axios";
import AdminCheck from "./AdminCheck";
import { useEffect, useState } from "react";
import { useSecurityContext } from "../Context/SecurityContext";
import GymMemberCard from "../Component/MemberCard";
import type { Member } from "../Component/MemberCard";

function GetMember() {
  const auth = AdminCheck();
  const [members, setMembers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputDateOfBirth, setInputDateOfBirth] = useState("");
  const { accessToken, setAccessToken } = useSecurityContext();

  useEffect(() => {
    const getMember = async () => {
      try {
        const allMember = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getAllMembers`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        setMembers(allMember.data);
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
              const retryRes = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/getAllMembers`,
                {
                  headers: {
                    authorization: `Bearer ${newToken}`,
                  },
                  withCredentials: true,
                }
              );
              if (retryRes.status === 200 || retryRes.status === 201) {
                console.log("Done with refreshed token:", retryRes.data);
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
    getMember();
  }, [auth, accessToken]);

  if (auth == null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-100 font-mono tracking-wider">
          LOADING OPERATIVE DATABASE...
        </h1>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-400 font-mono tracking-wider">
          ACCESS DENIED - UNAUTHORIZED!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2 tracking-wide">
            <span className="text-orange-500">MEMBERS</span> DATABASE
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">
            All Active Field Agents - Classification Level: RESTRICTED
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 uppercase tracking-wider font-mono">
            Search Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide font-mono">
                Agent Name
              </label>
              <input
                type="text"
                placeholder="Enter operative name..."
                onChange={(e) => setInputName(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 shadow-sm outline-none font-mono
                 transition-colors
                 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide font-mono">
                Contact Code
              </label>
              <input
                type="text"
                placeholder="Phone number..."
                onChange={(e) => setInputPhoneNumber(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 shadow-sm outline-none font-mono
                 transition-colors
                 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide font-mono">
                Birth Date
              </label>
              <input
                type="date"
                onChange={(e) => setInputDateOfBirth(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 shadow-sm outline-none font-mono
                 transition-colors
                 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-orange-500 uppercase tracking-wider font-mono">
              Active Operatives
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm font-mono">
                {members.length} AGENTS FOUND
              </span>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member: Member) => {
              const combinedName =
                `${member.firstName} ${member.lastName}`.toLowerCase();
              const searchName = inputName.toLowerCase();

              return (
                combinedName.includes(searchName) &&
                member.phoneNumber?.toString().includes(inputPhoneNumber) &&
                (!inputDateOfBirth ||
                  inputDateOfBirth.toString() === member.dateOfBirth) && (
                  <GymMemberCard
                    key={member._id}
                    _id={member._id}
                    firstName={member.firstName}
                    lastName={member.lastName}
                    phoneNumber={member.phoneNumber}
                    dateOfBirth={member.dateOfBirth}
                    specialty={member.specialty}
                    subscriptionDay={member.subscriptionDay}
                    endSubscriptionDay={member.endSubscriptionDay}
                  />
                )
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default GetMember;

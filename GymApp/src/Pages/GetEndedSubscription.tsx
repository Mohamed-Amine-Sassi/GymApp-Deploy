"use client";

import axios, { isAxiosError } from "axios";
import AdminCheck from "./AdminCheck";
import { useEffect, useState } from "react";
import { useSecurityContext } from "../Context/SecurityContext";
import GymMemberCard from "../Component/MemberCard";
import type { Member } from "../Component/MemberCard";

function GetEndedMember() {
  const auth = AdminCheck();
  const [endedMembers, setEndedMembers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputDateOfBirth, setInputDateOfBirth] = useState("");
  const { accessToken, setAccessToken } = useSecurityContext();

  useEffect(() => {
    const getEndedMember = async () => {
      try {
        const endedSubMembers = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/endedSubscription`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (endedSubMembers.data != "No Members Yet!") {
          setEndedMembers(endedSubMembers.data);
        }
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
                `${import.meta.env.VITE_BACKEND_URL}/endedSubscription`,
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
    getEndedMember();
  }, [auth, accessToken]);

  if (auth == null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-mono text-gray-100">
            INITIALIZING SECURITY PROTOCOLS...
          </h1>
        </div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 border border-red-500 rounded-lg">
          <div className="text-red-500 text-4xl mb-4">⚠</div>
          <h1 className="text-xl font-mono text-red-400">ACCESS DENIED</h1>
          <p className="text-gray-400 mt-2">INSUFFICIENT CLEARANCE LEVEL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-mono text-gray-100">
              INACTIVE MEMBERS DATABASE
            </h1>
          </div>
          <p className="text-gray-400 font-mono text-sm">
            TERMINATED FIELD AGENTS • SECURITY CLEARANCE: ALPHA
          </p>
          <div className="h-px bg-gradient-to-r from-red-500 via-orange-500 to-transparent mt-4"></div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h2 className="text-lg font-mono text-orange-500">
              SEARCH PARAMETERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">
                OPERATIVE NAME
              </label>
              <input
                type="text"
                placeholder="Enter operative name..."
                onChange={(e) => setInputName(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 font-mono shadow-sm outline-none transition-colors focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">
                CONTACT FREQUENCY
              </label>
              <input
                type="text"
                placeholder="Phone number..."
                onChange={(e) => setInputPhoneNumber(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 font-mono shadow-sm outline-none transition-colors focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">
                BIRTH DATE
              </label>
              <input
                type="date"
                onChange={(e) => setInputDateOfBirth(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 font-mono shadow-sm outline-none transition-colors focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <h2 className="text-lg font-mono text-red-400">
                TERMINATED OPERATIVES
              </h2>
            </div>
            <div className="text-sm font-mono text-gray-400">
              TOTAL:{" "}
              <span className="text-orange-500">{endedMembers.length}</span>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {endedMembers.map((member: Member) => {
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

          {endedMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-600 text-4xl mb-4">📋</div>
              <p className="text-gray-400 font-mono">
                NO TERMINATED OPERATIVES FOUND
              </p>
              <p className="text-gray-500 text-sm mt-2">
                All agents remain active in the field
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetEndedMember;

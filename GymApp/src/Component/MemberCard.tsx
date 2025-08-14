"use client";

import axios, { isAxiosError } from "axios";
import { useSecurityContext } from "../Context/SecurityContext";
import moment from "moment";

export type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number | string;
  dateOfBirth?: string | Date;
  specialty?: string;
  subscriptionDay?: string | Date;
  endSubscriptionDay?: string | Date;
};

function safeFormatDate(
  value?: string | Date,
  opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }
) {
  if (!value) return "N/A";
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString("en-GB", opts).replace(/\//g, "-");
}

export function fullName(m: Pick<Member, "firstName" | "lastName">) {
  const name = `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim();
  return name || "OPERATIVE";
}

export default function GymMemberCard({
  _id,
  firstName,
  lastName,
  phoneNumber,
  dateOfBirth,
  specialty,
  subscriptionDay,
  endSubscriptionDay,
}: Member) {
  const SubDayCompare = () => {
    if (!endSubscriptionDay) return false;
    return moment(endSubscriptionDay, "MM-DD-YYYY").isAfter(moment(), "day");
  };
  const { accessToken, setAccessToken } = useSecurityContext();
  const name = fullName({ firstName, lastName });
  const phone = phoneNumber ? String(phoneNumber) : "N/A";
  const dob = safeFormatDate(dateOfBirth);
  const subscribed = safeFormatDate(subscriptionDay);
  const endSubscription = safeFormatDate(endSubscriptionDay);

  const handleRenewing = async () => {
    const x = prompt("CONFIRM OPERATIVE RENEWAL - Enter authorization code:");
    if (x == import.meta.env.VITE_GymCode) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/renewSubscription`,
          { firstName, lastName, dateOfBirth, phoneNumber },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
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
              const retryRes = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/renewSubscription`,
                { firstName, lastName, dateOfBirth, phoneNumber },
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
    }
  };

  const handleDelete = async () => {
    const x = prompt("Enter authorization code To DELETE:");
    if (x == import.meta.env.VITE_GymCode) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/deleteSubscription`,
          { firstName, lastName, dateOfBirth, phoneNumber },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
      } catch (err) {
        if (isAxiosError(err)) {
          try {
            if (err && (err.status === 403 || err.status === 401)) {
              const refreshRes = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/refreshAdminToken`,
                {},
                { withCredentials: true }
              );
              if (refreshRes && refreshRes.status === 200) {
                const newToken = refreshRes.data.AccessToken;
                setAccessToken(newToken);
                const retryRes = await axios.patch(
                  `${import.meta.env.VITE_BACKEND_URL}/deleteSubscription`,
                  { firstName, lastName, dateOfBirth, phoneNumber },
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
    }
  };

  return (
    <>
      <div
        className="
        relative overflow-hidden rounded-xl border border-gray-700
        bg-gray-800 text-gray-100
        shadow-lg
      "
        aria-label="Tactical operative card"
      >
        {SubDayCompare() ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-green-400 via-green-300 to-green-500"
            aria-hidden="true"
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-red-400 via-red-300 to-red-500"
            aria-hidden="true"
          />
        )}

        <div
          className="pointer-events-none absolute -inset-16 opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(600px 200px at 0% 50%, rgba(251,146,60,.12), transparent 60%), radial-gradient(400px 180px at 100% 0%, rgba(239,68,68,.10), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
          <div className="flex min-w-0 flex-col">
            <h3 className="truncate text-base font-semibold tracking-tight text-gray-100 font-mono">
              {name}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400 font-mono">
              FIELD OPERATIVE
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-orange-600 bg-orange-900/50 px-2 py-0.5 text-xs font-medium text-orange-300 font-mono">
            {specialty || "STANDARD"}
          </span>
        </div>

        <div className="relative z-10 grid gap-3 p-5 pt-0 text-sm text-gray-100 sm:p-6 sm:pt-0">
          <div className="flex items-center gap-2">
            <span className="w-40 shrink-0 text-gray-400 font-mono">
              AGENT ID
            </span>
            <span className="truncate font-mono text-orange-300">{_id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-40 shrink-0 text-gray-400 font-mono">
              CONTACT
            </span>
            <span className="truncate font-mono">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-40 shrink-0 text-gray-400 font-mono">
              Date Of Birth
            </span>
            <span className="truncate font-mono">{dob}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-40 shrink-0 text-gray-400 font-mono">
              Subscription Day
            </span>
            <span className="truncate font-mono">{subscribed}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-40 shrink-0 text-gray-400 font-mono">
              End Of Subscription Day
            </span>
            <span className="truncate font-mono">{endSubscription}</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-end gap-2 p-5 pt-0 sm:p-6 sm:pt-0">
          <button
            onClick={() => {
              handleRenewing();
            }}
            type="button"
            aria-label="Renew operative status"
            className="
            inline-flex items-center justify-center rounded-md
            bg-orange-600 px-3 py-2 text-sm font-medium text-white font-mono
            shadow-sm transition-colors
            hover:bg-orange-700
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800
            disabled:cursor-not-allowed disabled:opacity-50
          "
          >
            RENEW STATUS
          </button>
          <button
            type="button"
            aria-label="Terminate operative"
            onClick={() => {
              handleDelete();
            }}
            className="
            inline-flex items-center justify-center rounded-md
            border border-red-600 bg-red-700 px-3 py-2 text-sm font-medium text-white font-mono
            shadow-sm transition-colors
            hover:bg-red-800
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
            focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800
            disabled:cursor-not-allowed disabled:opacity-50
          "
          >
            TERMINATE
          </button>
        </div>
      </div>
    </>
  );
}

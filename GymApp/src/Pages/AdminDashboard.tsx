import axios from "axios";
import SideBarComponent from "../Component/SideBar";
import useAdminCheck from "./AdminCheck";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const auth = useAdminCheck();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  useEffect(() => {
    const NumberOfMembers = async () => {
      try {
        const nbr = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/nbreOfMembers`
        );
        setData1(nbr.data);
      } catch (err) {
        console.log(err);
      }
    };
    NumberOfMembers();
  }, []);

  useEffect(() => {
    const NumberOfEndedSubMembers = async () => {
      try {
        const nbr = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/nbreOfEndedSubMembers`
        );
        setData2(nbr.data);
      } catch (err) {
        console.log(err);
      }
    };
    NumberOfEndedSubMembers();
  }, []);

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
      <>
        <div className="flex h-screen bg-gray-900">
          <SideBarComponent />
          <div className="flex-1 p-8 bg-gray-800">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide">
                <span className="text-orange-500">DREAM</span> GYM
              </h1>
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6">
                <h2 className="text-xl font-semibold text-orange-500 mb-4 uppercase tracking-wider">
                  Owner
                </h2>
                <p className="text-gray-300 leading-relaxed">Houcine Meddeb:</p>
                <p className="text-gray-300 leading-relaxed">
                  Phone Number: 28 321 593
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 border border-gray-600 rounded p-4">
                    <div className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                      System Status
                    </div>
                    <div className="text-green-400 font-mono text-lg">
                      ONLINE
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-600 rounded p-4">
                    <div className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                      Active Members
                    </div>
                    <div className="text-gray-100 font-mono text-lg">
                      {data1}
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-600 rounded p-4">
                    <div className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                      Ended Subscriptions
                    </div>
                    <div className="text-gray-100 font-mono text-lg">
                      {data2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
          <div className="flex justify-center">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6"></div>
          </div>
        </div>
      </>
    );
  }
}

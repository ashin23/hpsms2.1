import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import CoordConfif from "./CoordConfif";

const EmployeeCoord = ({ email1 }) => {
  const [coordinator, setCoordinator] = useState([]);

  const [search, setSearch1] = useState("");

  useEffect(() => {
    fetchCoordinator();
    const emp = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "EmployeeListCoordinator" },
        (payload) => {
          fetchCoordinator();
        }
      )
      .subscribe();
  }, []);

  const fetchCoordinator = async () => {
    var email2 = window.localStorage.getItem("email", email2);
    const { data: coordinatordata } = await supabase
      .from("EmployeeListCoordinator")
      .select()
      .eq("Email", email2);

    setCoordinator(coordinatordata);
  };

  return (
    <div className=" ">
      <div className="h-screen">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[100%] md:w-[750px] z-50 mb-10 h-[30%] md:h-16 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <div className="p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] rounded-[60px] rounded-e-none  ">
          <div className="grid grid-cols-2 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
          </div>
          <div className="w-[100%] h-[90%] bg-[#EEEEEE] grid ">
            {coordinator && (
              <div className="h-[520px] overflow-x-hidden">
                {coordinator
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .map((e) => (
                  <CoordConfif key={e.id} CoordEmp={e.Data} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCoord;

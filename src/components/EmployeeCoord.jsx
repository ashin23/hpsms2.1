import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import CoordConfif from "./CoordConfif";

const EmployeeCoord = () => {
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
    var email = window.localStorage.getItem("email");
    const { data: coordinatordata } = await supabase
      .from("EmployeeListCoordinator")
      .select("*")
      .eq("Email", email);
    setCoordinator(coordinatordata);
  };

  return (
    <div className="flex  place-content-center items-center w-full ">
      <div className="w-[100%] overflow-hidden">
        <div className="flex justify-center mt-5 mb-5 bg-[#D8D9DA]   p-2 h-[62px]">
          <input
            className="w-[750px] pl-10 pr-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <div className="bg-[#EEEEEE] p-3  w-[100%]">
          <div className="grid grid-cols-2 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
          </div>
          <div className="w-[100%] h-[90%] bg-[#EEEEEE] grid ">
            {coordinator && (
              <div className="h-[520px] overflow-y-auto">
                {coordinator.map((e) => (
                  <div> 
                    {e.Data.filter((val) => {
                      try {
                        if (search === "") {
                          return val;
                        } else if (
                          val.empData.Email.toLowerCase().includes(
                            search.toLowerCase()
                          )
                        ) {
                          return val;
                        } else if (
                          val.empData.Position.toLowerCase().includes(
                            search.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      } catch (error) {}
                    }).map((ef) => (
                      <CoordConfif key={ef.empData} CoordEmp={ef.empData} />
                    ))}
                  </div>
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

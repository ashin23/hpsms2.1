import React from "react";
import { useState } from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import RequestConfig from "./RequestConfig";

const RequestList = () => {
  const [search1, setSearch1] = useState("");
  const [request, setRequest] = useState();

  useEffect(() => {
    FetchRequest();
      supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Request" },
        (payload) => {
          FetchRequest();
        }
      )
      .subscribe();
  }, []);

  const FetchRequest = async () => {
    const { data: request } = await supabase.from("Request").select();
    setRequest(request);
  };

  return (
    <div className="">
      <div className="h-screen">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%] lg:h-10 md:h-10  pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          Request List
        </h1>
        <div className="p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] md:rounded-[60px] md:rounded-e-none  ">
          <div className="grid grid-cols-3 md:grid-cols-6 w-[100%] bg-slate-300">
            <div className="text-md md:flex hidden p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Personnel</div>
            <div className="text-md p-3">Date Needed</div>
            <div className="text-md md:flex hidden p-3">Hotel</div>
            <div className="text-md md:flex hidden p-3">Location</div>
          </div>
          {request && (
            <div className="h-[520px] overflow-y-auto">
              {request
                .filter((val) => {
                  try {
                    if (search1 === "") {
                      return val;
                    } else if (
                      val.Location.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.FullName.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.Hotel.toLowerCase().includes(
                        search1.toLocaleLowerCase()
                      )
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .map((e) => (
                  <RequestConfig key={e.id} e={e} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestList;

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
    <div className="grid flex-col shadow-lg w-full mb-6 mt-4 ">
      <div className="w-[100%] overflow-hidden">
        <div className="flex justify-center mt-5 mb-5 bg-[#D8D9DA]   p-2 h-[62px]">
          <input
            className="w-[750px] pl-10 pr-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <h1 className="font-bold flex flex-col mb-6 text-[25px] items-center">
          Request List
        </h1>
        <div className=" bg-[#EEEEEE] p-3  w-[100%] ">
          <div className="grid grid-cols-6 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Personnel</div>
            <div className="text-md p-3">Date Needed</div>
            <div className="text-md p-3">Hotel</div>
            <div className="text-md p-3">Location</div>
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

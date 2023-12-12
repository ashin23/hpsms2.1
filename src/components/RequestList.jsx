import React from "react";
import { useState } from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import RequestConfig from "./RequestConfig";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const RequestList = () => {
  const [search1, setSearch1] = useState("");
  const [request, setRequest] = useState([]);
  const [date, setDate] = useState("");
  const [status, setstatus] = useState("false");
  const [req, setreq] = useState([]);

  useEffect(() => {
    FetchRequest();
    requ();
    supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        (payload) => {
          FetchRequest();
          requ();
        }
      )
      .subscribe();
  }, [date]);

  const requ = async () => {
    const { data: reqe1 } = await supabase
      .from("Request")
      .select()
      .eq("Notifications", status);
    setreq(reqe1);
  };

  const FetchRequest = async () => {
    if (date === "") {
      const { data: request } = await supabase.from("Request").select();
      setRequest(request);
    } else {
      if (date !== "") {
        const { data: request } = await supabase
          .from("Request")
          .select()
          .eq("created_at", date);
        setRequest(request);
      }
    }
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(request);
    setpagecount(Math.ceil(request.length / perpage));
  }, [itemsOffset, perpage, request]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % request.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
      <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
        <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
          Request List
        </h1>

        {/* table */}
        <div className=" p-3 w-[100%] h-[69%] ">
          <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
            <div className="md:flex grid justify-between w-full">
              <div className="flex  gap-2 font-normal text-base p-3 w-full md:justify-start justify-center">
                <label className="">
                  Total Request(<em> {request.length} </em>)
                </label>

                <label className="">
                  New Request(<em> {req.length} </em>)
                </label>
              </div>
              <div className="flex items-center h-[100%] w-[100%] mr-1 gap-2 mb-5">
                <input
                  className=" h-[30px] w-[90%]  pl-1 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  placeholder="Search name"
                  type="search"
                  onChange={(e) => setSearch1(e.target.value)}
                />
                <input
                  onChange={(e) => setDate(e.target.value)}
                  className=" h-[30px] w-[40%]  pl-1 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  type="date"
                />
              </div>
            </div>

            <div className="bg-white w-[100%] h-[100%]">
              {request && (
                <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                  <div className=" grid grid-cols-3 md:grid-cols-7 bg-slate-200 p-2 mb-1 rounded-md font-bold">
                    <label className="justify-start flex">NAME</label>
                    <label className="justify-center flex">POSITION</label>
                    <label className="justify-center md:flex hidden">PERSONNEL</label>
                    <label className="justify-center md:flex hidden">DATE NEEDED</label>
                    <label className="justify-center md:flex hidden">HOTEL</label>
                    <label className="justify-center md:flex hidden">LOCATION</label>
                    <label className="justify-center flex">ACTION</label>
                  </div>
                  {request
                    .filter((val) => {
                      try {
                        if (search1 === "") {
                          return val;
                        } else if (
                          val.Email.toLowerCase().includes(search1.toLowerCase())
                        ) {
                          return val;
                        }
                      } catch (error) {}
                    })
                    .sort((a, b) => (b.id > a.id ? 1 : -1))
                    .slice(itemsOffset, endoffsett)
                    .map((e) => (
                      <RequestConfig key={e.id} e={e} />
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              breakLabel=""
              pageCount={pagecount}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
              pageRangeDisplayed={3}
              containerClassName="flex items-center text-white gap-2"
              previousClassName="bg-[#040463] p-1 rounded-md text-white "
              nextClassName="bg-[#040463] p-1 rounded-md text-white"
              pageClassName="bg-[#040463] p-1 rounded-md text-white px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
{
  /* <div className="text-md md:flex hidden p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Personnel</div>
            <div className="text-md p-3">Date Needed</div>
            <div className="text-md md:flex hidden p-3">Hotel</div>
            <div className="text-md md:flex hidden p-3">Location</div>
            <div className="text-md md:flex hidden p-3">Action</div> */
}

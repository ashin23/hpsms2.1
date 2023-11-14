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

  useEffect(() => {
    FetchRequest();
      supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
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

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 7;

  useEffect(() => {
    const endoffsett = itemsOffset + perpage;
    setcurrentitems(request.slice(itemsOffset, endoffsett));
    setpagecount(Math.ceil(request.length / perpage));
  }, [itemsOffset, perpage, request]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % request.length;

    setItemOffset(newOffset);
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
        <div>
          <ReactPaginate
            previousLabel={
              <span className="mt-2 w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 mr-4">
                <BsChevronCompactLeft />
              </span>
            }
            nextLabel={
              <span className="mt-2 w-10 h-10 flex items-center justify-center mr-4 rounded-md bg-gray-200">
                <BsChevronCompactRight />
              </span>
            }
            pageCount={pagecount}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageRangeDisplayed={5}
            containerClassName="flex mt-2   "
            pageClassName="block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center roundend-md mr-4 "
          />
        </div>
        <div className="p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] md:rounded-[60px] md:rounded-e-none  ">
          <div className="grid grid-cols-3 md:grid-cols-6 w-[100%] bg-slate-300">
            <div className="text-md md:flex hidden p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Personnel</div>
            <div className="text-md p-3">Date Needed</div>
            <div className="text-md md:flex hidden p-3">Hotel</div>
            <div className="text-md md:flex hidden p-3">Location</div>
          </div>
          {currentitems && (
            <div className="h-[520px] overflow-x-hidden">
              {currentitems
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
                .sort((a, b) => (b.id > a.id ? 1 : -1))
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

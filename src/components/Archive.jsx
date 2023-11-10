import React, { useState } from "react";
import supabase from "./supabaseClient";
import logo from "./images/magnifying-glass.png";
import ArchiveConfig from "./ArchiveConfig";
import { useEffect } from "react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
const Archive = () => {
  const [search1, setSearch1] = useState("");
  const [archive1, setArchive] = useState([]);

  useEffect(() => {
    FetchArchive();
    const Archive = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Archive_List" },
        (payload) => {
          FetchArchive();
        }
      )
      .subscribe();
  }, []);

  const FetchArchive = async () => {
    const { data: archive1 } = await supabase.from("Archive_List").select();
    setArchive(archive1);
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 7;

  useEffect(() => {
    const endoffsett = itemsOffset + perpage;
    setcurrentitems(archive1.slice(itemsOffset, endoffsett));
    setpagecount(Math.ceil(archive1.length / perpage));
  }, [itemsOffset, perpage, archive1]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % archive1.length;

    setItemOffset(newOffset);
  };
  return (
    <div className="">
      <div className=" h-screen">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%] lg:h-10 md:h-10  pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          Archive
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
        <div className=" p-3  w-[100%] z-10  md:pl-20 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[490px] md:rounded-[60px] md:rounded-e-none ">
          <div className="grid grid-cols-3 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Email</div>
          </div>
          {currentitems && (
            <div className="h-[520px] overflow-x-hidden ">
              {currentitems
                .filter((val) => {
                  try {
                    if (search1 === "") {
                      return val;
                    } else if (
                      val.Position.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.Name.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .sort((a, b) => (b.id <= a.id ? 1 : -1))
                .map((e) => (
                  <ArchiveConfig key={e.id} e={e} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;

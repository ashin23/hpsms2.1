import React, { useState } from "react";
import supabase from "./supabaseClient";
import logo from "./images/magnifying-glass.png";
import ArchiveConfig from "./ArchiveConfig";
import { useEffect } from "react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
const Archive = () => {
  const [search1, setSearch1] = useState("");
  const [archive12, setArchive] = useState([]);

  const [notif, setnotif] = useState("false");
  const [arch, setarch] = useState([]);

  useEffect(() => {
    FetchArchive();
    archfetch();
    const Archive = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Archive_List" },
        (payload) => {
          FetchArchive();
          archfetch();
        }
      )
      .subscribe();
  }, []);

  const archfetch = async () => {
    const { data: arche } = await supabase
      .from("Archive_List")
      .select()
      .eq("Notifications", notif);
    setarch(arche);
  };

  const FetchArchive = async () => {
    const { data: archive1 } = await supabase.from("Archive_List").select();
    setArchive(archive1);
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;


  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(archive12);
    setpagecount(Math.ceil(archive12.length / perpage));
  }, [itemsOffset, perpage, archive12]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % archive12.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="">
      <div className=" h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center  pt-32 item-center  pb-8 bg-gradient-to-r from-[#708ef9] via-blue-300 to-blue-500">
          <div className="grid grid-cols-2 md:-mb-2 -mt-10 -mb-14 gap-2 p-2 md:-mt-10 md:gap-5">
            <div className="bg-white flex flex-col w-full text-center rounded-md">
              <label className="font-bold text-lg md:text-xl">Total Archive</label>
              <label className="font-bold text-lg md:text-4xl">{archive12.length}</label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md">
              <label className="font-bold text-lg md:text-xl">New Archive</label>
              <label className="font-bold text-lg md:text-4xl">{arch.length}</label>
            </div>
            <div>
            <label className=" md:ml-2  text-xl font-semibold text-white">
                Search Name
              </label>
            <input
              className="-mt-6 md:-mt-0 top-96 w-[100%] md:w-[100%] z-50 mb-10 h-[30%]   py-1 px-6 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Search name"
              type="search"
              onChange={(e) => setSearch1(e.target.value)}
            ></input>
            </div>
            
          </div>
        </div>
        <h1 className="md:mt-10 -mb-5 mt-4 z-50 font-bold flex flex-col md:mb-6 text-[25px] items-center">
          Archive
        </h1>
        <div className="w-full md:-mt-7  justify-center flex items-center">
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
        <div className="  p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-none ">
          <div className="grid grid-cols-3 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Email</div>
          </div>
          {archive12 && (
            <div className="md:h-[40%] h-[9rem] overflow-y-auto overflow-x-hidden">
              {archive12
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
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .slice(itemsOffset, endoffsett)
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

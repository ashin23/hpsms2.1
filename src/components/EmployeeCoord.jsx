import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import CoordConfif from "./CoordConfif";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const EmployeeCoord = ({ email1 }) => {
  const [coordinator, setCoordinator] = useState([]);

 
  const [search, setSearch1] = useState("");

  const [date, setDate] = useState("");
  const [applicantPosition, setApplicantPosition] = useState("Select Position");

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
  }, [date]);

  const fetchCoordinator = async () => {
    var email2 = window.localStorage.getItem("email", email2);
    if (date === "") {
      const { data: coordinatordata } = await supabase
        .from("EmployeeListCoordinator")
        .select()
        .eq("Email", email2);
      setCoordinator(coordinatordata);
    } else {
      if (date !== "") {
        const { data: app1 } = await supabase
          .from("EmployeeListCoordinator")
          .select()
          .eq("created_at", date);
        setCoordinator(app1);
      }
    }
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 20;

  useEffect(() => {
    const endoffsett = itemsOffset + perpage;
    setcurrentitems(coordinator.slice(itemsOffset, endoffsett));
    setpagecount(Math.ceil(coordinator.length / perpage));
  }, [itemsOffset, perpage, coordinator]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % coordinator.length;

    setItemOffset(newOffset);
  };

  console.log(currentitems);
  return (
    <div className=" ">
      <div className="h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            <input
              className="-mt-5 md:-mt-0 top-96 w-[90%] md:w-[100%] z-50 mb-10 h-[50%] lg:h-10 md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Search name"
              type="search"
              onChange={(e) => setSearch1(e.target.value)}
            ></input>
            <div className=" flex -mt-14 md:-mt-0">
              <label className=" md:ml-2  text-xl font-semibold">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className=" pl-4 ml-2 pr-3 py-2 h-[50%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="date"
              ></input>
            </div>
          </div>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          Employee List
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
        <div className="p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-nones  ">
          <div className="grid grid-cols-2 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
          </div>
          {currentitems && (
            <div className="md:h-[40%] h-[10rem] overflow-y-auto overflow-x-hidden">
              {currentitems
                .filter((val) => {
                  try {
                    if (search === "") {
                      return val;
                    } else if (
                      val.Position.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.Name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .map((e) => (
                  <CoordConfif key={e.id} CoordEmp={e.Data} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCoord;

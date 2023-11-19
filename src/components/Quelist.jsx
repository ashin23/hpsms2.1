import React, { useState, useEffect } from "react";
import logo from "./images/magnifying-glass.png";
import supabase from "./supabaseClient";
import position from "./position.json";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ModalAccept from "./ModalAccept";
import QuelingConfig from "./QuelingConfig";
const Quelist = ({ email1 }) => {
  const [search1, setSearch1] = useState("");
  const [applicants, setApplicants] = useState([]);

  const [date, setDate] = useState("");
  const [applicantPosition, setApplicantPosition] = useState("Select Position");

  useEffect(() => {
    queList();
    const ApplicantsList = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Queuing_List" },
        (payload) => {
          queList();
        }
      )
      .subscribe();
  }, [date, applicantPosition]);


  //*date format
  

  const queList = async () => {
    if (date === "" && applicantPosition === "Select Position") {
      const { data: Quelist } = await supabase.from("Queuing_List").select();
      setApplicants(Quelist);
    } else {
      if (date !== "" && applicantPosition === "Select Position") {
        const { data: app1 } = await supabase
          .from("Queuing_List")
          .select()
          .eq("date", date);
        setApplicants(app1);
      } else if (applicantPosition !== "Select Position" && date === "") {
        const { data: app2 } = await supabase
          .from("Queuing_List")
          .select()
          .eq("Position", applicantPosition);
        setApplicants(app2);
      } else {
        const { data: app3 } = await supabase
          .from("Queuing_List")
          .select()
          .match({ date: date, Position: applicantPosition });
        setApplicants(app3);
      }
    }
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;

  useEffect(() => {
    const endoffsett = itemsOffset + perpage;
    setcurrentitems(applicants.slice(itemsOffset, endoffsett));
    setpagecount(Math.ceil(applicants.length / perpage));
  }, [itemsOffset, perpage, applicants]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % applicants.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="">
      <div className="h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            <input
              className="-mt-6 md:-mt-0 top-96 w-[100%] md:w-[100%] z-50 mb-10 h-[30%] lg:h-10 md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Search name"
              type="search"
              onChange={(e) => setSearch1(e.target.value)}
            ></input>
            <div className="flex -mt-14 md:-mt-0">
              <label className="md:ml-2  text-xl font-semibold">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className="pl-4 ml-2 pr-3 py-2 h-[50%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="date"
              ></input>
            </div>
            <div className="text-black gap-2 -mt-10 md:-mt-0">
              <select
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setApplicantPosition(e.target.value)}
              >
                {position.map((position) => (
                  <option key={position.id}> {position.position}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <h1 className="mt-10 z-50 font-bold flex flex-col mb-6 text-[25px] items-center">
          Queuing List
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
            breakLabel={<span className="mr-4 mt-4">...</span>}
            pageCount={pagecount}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageRangeDisplayed={3}
            containerClassName="flex mt-2   "
            pageClassName="block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center roundend-md mr-4 "
          />
        </div>
        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-none  ">
          <div className="grid grid-cols-3 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3 ">Position</div>
            <div className="text-md p-3 mr-20">Email</div>
          </div>
          {currentitems && (
            <div className="md:h-[40%] h-[10rem] overflow-y-auto overflow-x-hidden">
              {" "}
              {currentitems
                .filter((val) => {
                  try {
                    if (search1 === "") {
                      return val;
                    }  else if (
                      val.Name.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .map((e) => (
                  <QuelingConfig key={e.id} e={e} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quelist;

import React, { useState, useEffect } from "react";
import logo from "./images/magnifying-glass.png";
import supabase from "./supabaseClient";
import position from "./position.json";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ModalAccept from "./ModalAccept";
import QuelingConfig from "./QuelingConfig";
import { useNavigate } from "react-router-dom";
const Quelist = ({ email1 }) => {
  const [search1, setSearch1] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [status, setstatus] = useState("false");
  const [app, setapp] = useState([]);

  const [date, setDate] = useState("");
  const [applicantPosition, setApplicantPosition] = useState("Select Position");
  const nav = useNavigate();
  useEffect(() => {
    queList();
    que();
    const ApplicantsList = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Queuing_List" },
        (payload) => {
          queList();
          que();
        }
      )
      .subscribe();
  }, [date, applicantPosition]);

  const que = async () => {
    const { data: app } = await supabase
      .from("Queuing_List")
      .select()
      .eq("Notifications", status);
    setapp(app);
  };

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


  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
   
    setcurrentitems(applicants);
    setpagecount(Math.ceil(applicants.length / perpage));
  }, [itemsOffset, perpage, applicants]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % applicants.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="">
      <div className="h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center  pt-32 item-center  pb-8 bg-gradient-to-r from-[#708ef9] via-blue-300 to-blue-500">
          {/* Filter */}
          <div className="grid grid-cols-2 md:-mb-2 -mt-14 -mb-5 gap-2 p-2 md:-mt-10 md:gap-5">
            <div className="bg-white flex flex-col w-full text-center rounded-md">
              <label className="font-bold text-lg md:text-xl">Total Queuing</label>
              <label className="font-bold text-lg md:text-4xl">
                {applicants.length}
              </label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md">
              <label className="font-bold text-lg md:text-xl">New Queuing</label>
              <label className="font-bold text-lg md:text-4xl">{app.length}</label>
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

            <div className="">
              <label className="md:ml-2  text-xl text-white font-semibold">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className="-mt-6 md:-mt-0 top-96 w-[100%] md:w-[100%] z-50 mb-10 h-[30%]   py-1 px-6 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="date"
              ></input>
            </div>
            <div className="text-black gap-2 md:-mt-12 -mt-11">
            <label className=" md:ml-2  text-xl font-semibold text-white">
                Search Position
              </label>
              <select
                className="pl-4 pr-3 py-1 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setApplicantPosition(e.target.value)}
              >
                {position.map((position) => (
                  <option key={position.id}> {position.position}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <h1 className="md:mt-10 -mb-5 mt-4 z-50 font-bold flex flex-col md:mb-6 text-[25px] items-center">
          Queuing List
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
          {applicants && (
            <div className="md:h-[40%] h-[9rem] overflow-y-auto overflow-x-hidden">
              {" "}
              {applicants
                .filter((val) => {
                  try {
                    if (search1 === "") {
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

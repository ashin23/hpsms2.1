import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import ApplicantConfig from "./ApplicantConfig";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import position from "./position.json";
import { useNavigate } from "react-router-dom";
const Applicant = () => {
  const [search1, setSearch1] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [date, setDate] = useState("");
  const [applicantPosition, setApplicantPosition] = useState("Select Position");
  const [status, setstatus] = useState("false");
  const [app, setapp] = useState([]);
  useEffect(() => {
    handleApplicantsPost();
    applicant();
    const Applicant_List = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Applicant_List" },
        (payload) => {
          handleApplicantsPost();
          applicant();
        }
      )
      .subscribe();
  }, [date, applicantPosition]);

  const applicant = async () => {
    const { data: app } = await supabase
      .from("Applicant_List")
      .select()
      .eq("Notifications", status);
    setapp(app);
  };
  const handleApplicantsPost = async () => {
    if (date === "" && applicantPosition === "Select Position") {
      const { data, error } = await supabase.from("Applicant_List").select();
      setApplicants(data);
    } else {
      if (date !== "" && applicantPosition === "Select Position") {
        const { data: app1 } = await supabase
          .from("Applicant_List")
          .select()
          .eq("created_at", date);
        setApplicants(app1);
      } else if (applicantPosition !== "Select Position" && date === "") {
        const { data: app2 } = await supabase
          .from("Applicant_List")
          .select()
          .eq("Position", applicantPosition);
        setApplicants(app2);
      } else {
        const { data: app3 } = await supabase
          .from("Applicant_List")
          .select()
          .match({ created_at: date, Position: applicantPosition });
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
      <div className="h-screen overflow-y-hidden ">
        <div className="sticky top-5 flex justify-center  pt-32 item-center  pb-8 bg-gradient-to-r from-[#708ef9] via-blue-300 to-blue-500">
          {/* Filter */}
          <div className="grid grid-cols-2 md:-mb-2 -mt-10 -mb-5 gap-2 p-2 md:-mt-10 md:gap-5">
            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">Total Applicants</label>
              <label className="font-bold text-lg md:text-4xl">
                {applicants.length}
              </label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md ">
              <label className="font-bold text-lg md:text-xl">New Applicants</label>
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
              <label className=" md:ml-2  text-xl font-semibold text-white">
                Date
              </label>
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
          Applicants List
        </h1>
        <div className="w-full   md:-mt-7 justify-center flex items-center">
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
            pageClassName=" block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center roundend-md mr-4 "
          />
        </div>

        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-nones  ">
          <div className="grid grid-cols-3   w-[100%]  bg-slate-300 ">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3 ">Email</div>
          </div>
          {currentitems && (
            <div className="md:h-[40%] h-[9rem] overflow-y-auto overflow-x-hidden">
              {" "}
              {currentitems
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
                .map((e) => (
                  <ApplicantConfig key={e.id} e={e} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicant;

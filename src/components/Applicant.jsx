import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import ApplicantConfig from "./ApplicantConfig";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import position from "./position.json";
import { useNavigate } from "react-router-dom";
import { TbListSearch } from "react-icons/tb";
import { GrNext } from "react-icons/gr";
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
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
      <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
        <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
          Applicants List
        </h1>

        {/* table */}
        <div className=" p-3 w-[100%] h-[69%] ">
          <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
            <div className="md:flex grid justify-between w-full">
              <div className="flex  gap-2 font-normal text-base p-3 w-full md:justify-start justify-center">
                <label className="">
                  Total Applicants(<em> {applicants.length} </em>)
                </label>

                <label className="">
                  New Applicants(<em> {app.length} </em>)
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
                <select
                  className=" h-[30px] w-[40%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  onChange={(e) => setApplicantPosition(e.target.value)}
                >
                  {position.map((position) => (
                    <option key={position.id}> {position.position}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white w-[100%] h-[100%]">
              {applicants && (
                <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                  <div className=" grid grid-cols-3 bg-slate-200 p-2 mb-1 rounded-md font-bold">
                    <label className="justify-start flex">NAME</label>
                    <label className="justify-center flex">POSITION</label>
                    <label className="justify-center flex">EMAIL</label>
                  </div>
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
                      <ApplicantConfig key={e.id} e={e}  />
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

export default Applicant;
{
  /* <div className="sticky top-5 flex justify-center  pt-32 item-center  pb-8 bg-gradient-to-r from-[#708ef9] via-blue-300 to-blue-500">
          {/* Filter */
}
{
  /* <div className="grid grid-cols-2 md:-mb-2 -mt-14 -mb-5 gap-2 p-2 md:-mt-10 md:gap-5">
            
             
            </div>

            <div className="">
              <label className=" md:ml-2  text-xl font-semibold text-white">
                Date
              </label>
             
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
          </div> */
}
{
  /* </div> */
}

{
  /* <div className=" p-3  w-[100%] z-10  justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] rounded-md ">
          {/* <div className="grid grid-cols-3   w-[100%]  bg-slate-300 ">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3 ">Email</div>
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
                  <ApplicantConfig key={e.id} e={e} />
                ))}
            </div>
          )} */
}
{
  /* </div> */
}

{
}

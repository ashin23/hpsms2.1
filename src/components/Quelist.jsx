import React, { useState, useEffect } from "react";
import logo from "./images/magnifying-glass.png";
import supabase from "./supabaseClient";
import position from "./position.json";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ModalAccept from "./ModalAccept";
import QuelingConfig from "./QuelingConfig";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Quelist = ({ email1 }) => {
  const [search1, setSearch1] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [status, setstatus] = useState("false");
  const [app, setapp] = useState([]);
  const [applicantPosition, setApplicantPosition] = useState("Select Position");

  const currentDate = moment(new Date()).format("yyyy-M-D");

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
  }, [applicantPosition, currentDate]);

  const que = async () => {
    const { data: app } = await supabase
      .from("Queuing_List")
      .select()
      .match({ Notifications: status, created_at: moment().from("yyyy-M-D") });
    setapp(app);
   
  };

  const queList = async () => {
    const { data: que } = await supabase.from("Queuing_List").select();
    if (que?.length === 0) {
      setApplicants(que);
    } else {
      for (let index = 0; index < que.length; index++) {
        if (
          que[index].created_at === currentDate &&
          applicantPosition === "Select Position"
        ) {
          const { data: que1 } = await supabase
            .from("Queuing_List")
            .select()
            .eq("created_at", currentDate);
          setApplicants(que1);
        }
        if (
          moment(que[index].created_at).isBefore(new Date()) &&
          que[index].created_at !== currentDate
        ) {
          const { data: que3 } = await supabase
            .from("Queuing_List")
            .delete()
            .eq("id", que[index].id);
          setApplicants(que3);
        }
      }
      if (applicantPosition !== "Select Position") {
        const { data: que2 } = await supabase
          .from("Queuing_List")
          .select()
          .eq("Position", applicantPosition);
        setApplicants(que2);
      }
    }
  };

  const datespecific = async (e) => {
    if (e.target.value === "") {
      const { data: que3 } = await supabase
        .from("Queuing_List")
        .select()
        .eq("created_at", currentDate);
      return setApplicants(que3);
    }
    const { data: que3 } = await supabase
      .from("Queuing_List")
      .select()
      .eq("created_at", e.target.value);
    setApplicants(que3);
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 10;

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(applicants);
    setpagecount(Math.ceil(applicants.length / perpage));
  }, [itemsOffset, perpage, applicants]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % applicants?.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
      <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
        <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
          Queuing List
        </h1>

        {/* table */}
        <div className=" p-3 w-[100%] h-[69%] ">
          <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
            <div className="md:flex grid justify-between w-full">
              <div className="flex  gap-2 font-normal text-base p-3 w-full md:justify-start justify-center">
                {applicants && app && (
                  <>
                    <label className="">
                      Total Queuing:(<em> {applicants?.length} </em>)
                    </label>

                    <label className="">
                      New Que:(<em> {app?.length < 0 ? app?.length : "0"} </em>)
                    </label>
                  </>
                )}
              </div>
              <div className="flex items-center h-[100%] w-[100%] mr-1 gap-2 mb-5">
                <input
                  className=" h-[30px] w-[90%]  pl-1 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  placeholder="Search name"
                  type="search"
                  onChange={(e) => setSearch1(e.target.value)}
                />
                <input
                  onChange={(e) => datespecific(e)}
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

            <div className="bg-white w-[100%] h-[75%] md:h-[100%]">
              {applicants && (
                <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                  <div className="grid grid-rows-1 md:grid-cols-4 gap-2 p-1 ">
                    {applicants
                      .filter((val) => {
                        try {
                          if (search1 === "") {
                            return val;
                          } else if (
                            val.Name.toLowerCase().includes(
                              search1.toLowerCase()
                            )
                          ) {
                            return val;
                          }
                        } catch (error) {}
                      })
                      .sort((a, b) => (b.id > a.id ? 1 : -1))
                      .slice(itemsOffset, endoffsett)
                      .map((e) => (
                        <>
                          <div>
                            <QuelingConfig key={e.id} e={e} />
                          </div>
                        </>
                      ))}
                  </div>
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

export default Quelist;

import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import CoordConfif from "./CoordConfif";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const EmployeeCoord = ({ email1 }) => {
  const [coordinator, setCoordinator] = useState([]);

  const [coordid,setcoordid] =useState()
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
      setcoordid(coordinatordata.id)
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

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
   
    setcurrentitems(coordinator);
    setpagecount(Math.ceil(coordinator.length / perpage));
  }, [itemsOffset, perpage, coordinator]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % coordinator.length;

    setItemOffset(newOffset);
  };
  
 
  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
    <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
      <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
        Employee List
      </h1>

      {/* table */}
      <div className=" p-3 w-[100%] h-[69%] ">
        <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
          <div className="md:flex grid justify-between w-full">
           
            <div className="flex items-center h-[100%] w-[40%] mr-1 gap-2 mb-5">
              <input
                className=" h-[30px] w-[90%]  pl-1 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search name"
                type="search"
                onChange={(e) => setSearch1(e.target.value)}
              />
             
              
            </div>
          </div>

          <div className="bg-white w-[100%] h-[100%]">
            {coordinator && (
              <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                <div className=" grid grid-cols-2 bg-slate-200 p-2 mb-1 rounded-md font-bold">
                  <label className="justify-start flex">EMAIL</label>
                  <label className="justify-center flex">POSITION</label>
                  
                </div>
                {coordinator
                  .filter((val) => {
                    try {
                      if (search === "") {
                        return val;
                      } else if (
                        val.Email.toLowerCase().includes(search.toLowerCase())
                      ) {
                  
                        return val;
                      }
                    } catch (error) {}
                  })
                  .sort((a, b) => (b.id > a.id ? 1 : -1))
                  .slice(itemsOffset, endoffsett)
                  .map((e) => (
                    <CoordConfif key={e.id} CoordEmp={e.Data} coordinator={coordinator} />
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

export default EmployeeCoord;

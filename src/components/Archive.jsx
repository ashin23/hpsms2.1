import React, { useState } from "react";
import supabase from "./supabaseClient";
import logo from "./images/magnifying-glass.png";
import ArchiveConfig from "./ArchiveConfig";
import { useEffect } from "react";
import moment from "moment";

import ReactPaginate from "react-paginate";
import { CiWarning } from "react-icons/ci";
const Archive = () => {
  const [search1, setSearch1] = useState("");
  const [archive12, setArchive] = useState([]);

  const [notif, setnotif] = useState("false");
  const [arch, setarch] = useState([]);
  const [date, setDate] = useState("");
  // Sample
  // const currentDate1 = moment(new Date()).format();
  // const newDate = moment(new Date()).add(1, "minutes").format();

  const currentDate = moment(new Date()).format("yyyy-M-D");

 
  const newDate = moment(new Date()).add(5, "days").format("yyyy-M-D");

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
     
  }, [newDate,currentDate]);

  const archfetch = async () => {
    const { data: arche } = await supabase
      .from("Archive_List")
      .select()
      .eq("Notifications", notif);
    setarch(arche);
  };

  const FetchArchive = async () => {
    const { data: arch1 } = await supabase.from("Archive_List").select();
    for (let index = 0; index < arch1.length; index++) {
      if (arch1[index].created_at === currentDate) {
        const { data: arch6 } = await supabase
          .from("Archive_List")
          .select()
          .eq("created_at", currentDate);
        setArchive(arch6);
      }
      if (
        moment(arch1[index].created_at).isAfter(newDate) &&
        arch1[index].created_at !== currentDate
      ) {
        const { data: arch3 } = await supabase
          .from("Archive_List")
          .delete()
          .eq("id", arch1[index].id);
        setArchive(arch3);
      }
    }
  };

 

  const datespecific = async (e) => {
    if (e.target.value === "") {
      const { data: arch4 } = await supabase
        .from("Archive_List")
        .select()
        .eq("created_at", currentDate);
      return setArchive(arch4);
    }
    const { data: arch5 } = await supabase
      .from("Archive_List")
      .select()
      .eq("created_at", e.target.value);
    setArchive(arch5);
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(archive12);
    setpagecount(Math.ceil(archive12?.length / perpage));
  }, [itemsOffset, perpage, archive12]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % archive12.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
      <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
        <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
          Archive List
        </h1>

        {/* table */}
        <div className=" p-3 w-[100%] h-[69%] ">
          <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
            <div className="md:flex grid justify-between w-full">
              <div className="flex  gap-2 font-normal text-base p-3 w-full md:justify-start justify-center">
                {archfetch && (
                  <>
                    <label className="whitespace-break-spaces">
                      Total Archive(<em> {archive12?.length} </em>)
                    </label>

                    <label className="whitespace-break-spaces">
                      New Archive(<em> {arch?.length} </em>)
                    </label>

                    <label className="whitespace-break-spaces flex items-center">
                      <CiWarning className="text-2xl bg-yellow-300 rounded-md" />{" "}
                      The data has a 5-day window for restoration; otherwise, it
                      will be deleted
                    </label>
                  </>
                )}
                {/* <button onClick={() => abledelet()}>Enable auto delete</button> */}
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
              </div>
            </div>

            <div className="bg-white w-[100%] h-[100%]">
              {archive12 && (
                <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                  <div className=" grid grid-cols-4 bg-slate-200 p-2 mb-1 rounded-md font-bold">
                    <label className="justify-start flex">NAME</label>
                    <label className="justify-center flex">POSITION</label>
                    <label className="justify-center flex">EMAIL</label>
                    <label className="justify-center flex">ACTION</label>
                  </div>
                  {archive12
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
                      <ArchiveConfig key={e.id} e={e} />
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

export default Archive;

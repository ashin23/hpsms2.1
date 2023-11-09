import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import ApplicantConfig from "./ApplicantConfig";
const Applicant = () => {
  const [showJob, setShowJob] = useState(false);
  const [search1, setSearch1] = useState("");
  const [applicants, setApplicants] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);

  useEffect(() => {
    handleApplicantsPost();
    const Applicant_List = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Applicant_List" },
        (payload) => {
          handleApplicantsPost();
        }
      )
      .subscribe();
  }, []);

  const handleApplicantsPost = async () => {
    const { data, error } = await supabase.from("Applicant_List").select();

    if (data) {
      setApplicants(data);
    }
    if (error) {
    }
    console.log(data);
  };

  const lastPostIndex = currentPage * postperpage;
  const firstPostIndex = lastPostIndex - postperpage;
  const currentpost = applicants.slice(firstPostIndex, lastPostIndex);

  let pages = [];

  for (
    let index = 1;
    index <= Math.ceil(applicants.length / postperpage);
    index++
  ) {
    pages.push(index);
  }

  return (
    <div className="">
      <div className="h-screen">
        <div>
          <div>
            <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
              <input
                className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%] lg:h-10 md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search name"
                type="search"
                onChange={(e) => setSearch1(e.target.value)}
              ></input>
            </div>
            <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
              Applicants List
            </h1>
            <div className="grid ml-2 mb-2 grid-cols-5 md:ml-[5%] md:mb-1 gap-16 w-[20%] md:flex mt-2 md:gap-2">
              {" "}
              {pages.map((page, index) => {
                return (
                  <button
                    key={index}
                    className="hover:bg-blue-300  focus:outline-none focus:border-blue-400 focus:ring focus:bg-blue-500  border-2 h-10 px-5  transition-colors duration-150 bg-white text-black  border-blue-600 focus:shadow-outline"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] md:rounded-[60px] md:rounded-e-none  ">
              <div className="grid grid-cols-3 md:w-[100%] w-[100%] bg-slate-300 ">
                <div className="text-md p-3">Name</div>
                <div className="text-md p-3">Position</div>
                <div className="text-md p-3 ">Email</div>
              </div>
              {currentpost && (
                <div className="h-[520px]   overflow-x-hidden">
                  {" "}
                  {currentpost
                    .filter((val) => {
                      try {
                        if (search1 === "") {
                          return val;
                        } else if (
                          val.Position.toLowerCase().includes(
                            search1.toLowerCase()
                          )
                        ) {
                          return val;
                        } else if (
                          val.FullName.toLowerCase().includes(
                            search1.toLowerCase()
                          )
                        ) {
                          return val;
                        }
                      } catch (error) {}
                    })
                    .sort((a, b) => (b.id <= a.id ? 1 : -1))
                    .map((e) => (
                      <ApplicantConfig key={e.id} e={e} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;

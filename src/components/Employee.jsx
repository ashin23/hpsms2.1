import React, { useState } from "react";

import EmployeeConfig from "./EmployeeConfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";

import EmployeeStatus from "./EmployeeStatus.json";

import ReactPaginate from "react-paginate";
import position from "./position.json";
import document from "./document.json";
const Employee = ({ email }) => {
  const [search1, setSearch1] = useState("");
  const [employee, setEmployee] = useState([]);

  const [selected, setSelected] = useState([]);
  const [notif, setnotif] = useState("false");
  const [emp1, setemp1] = useState([]);

  const [date, setDate] = useState("");
  const [empPosition, setEmpPosition] = useState("Select Position");
  const [empStatus, setempstatus] = useState("Employee Status");
  const [empdoc, setempdocu] = useState("Document Status");

  useEffect(() => {
    FetchEmployee();
    emp();
    const EmployeeList = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Employee_List" },
        (payload) => {
          FetchEmployee();
          emp();
        }
      )
      .subscribe();
  }, [empStatus, empPosition, date, empdoc]);

  const emp = async () => {
    const { data: emp } = await supabase
      .from("Employee_List")
      .select()
      .eq("Notifications", notif);
    setemp1(emp);
  };

  const FetchEmployee = async () => {
    if (empStatus === "Employee Status" && empPosition === "Select Position") {
      if (empdoc === "Document Status") {
        const { data: emp } = await supabase.from("Employee_List").select();
        setEmployee(emp);
      } else {
        const { data: emp1 } = await supabase
          .from("Employee_List")
          .select()
          .eq("documents", empdoc);
        setEmployee(emp1);
      }
    } else {
      if (
        empStatus !== "Employee Status" &&
        empPosition === "Select Position"
      ) {
        if (empdoc === "Document Status") {
          const { data: empS } = await supabase
            .from("Employee_List")
            .select()
            .eq("status", empStatus);
          setEmployee(empS);
        } else {
          const { data: empS } = await supabase
            .from("Employee_List")
            .select()
            .match({ status: empStatus, documents: empdoc });
          setEmployee(empS);
        }
      } else if (
        empPosition !== "Select Position" &&
        empStatus === "Employee Status"
      ) {
        if (empdoc === "Document Status") {
          const { data: empP } = await supabase
            .from("Employee_List")
            .select()
            .eq("Position", empPosition);
          setEmployee(empP);
        } else {
          const { data: empP1 } = await supabase
            .from("Employee_List")
            .select()
            .match({ Position: empPosition, documents: empdoc });
          setEmployee(empP1);
        }
      } else {
        if (empdoc === "Document Status") {
          const { data: empstats } = await supabase
            .from("Employee_List")
            .select()
            .match({
              status: empStatus,
              Position: empPosition,
            });
          setEmployee(empstats);
        } else {
          const { data: empstats } = await supabase
            .from("Employee_List")
            .select()
            .match({
              status: empStatus,
              Position: empPosition,
              documents: empdoc,
            });
          setEmployee(empstats);
        }
      }
    }
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;
  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setpagecount(Math.ceil(employee?.length / perpage));
  }, [itemsOffset, perpage, employee]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % employee.length;
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
              <div className="flex  gap-2 font-normal text-base p-3 w-full md:justify-start justify-center">
                {employee && emp1 && (
                  <>
                    <label className="">
                      Total Employee(<em> {employee?.length} </em>)
                    </label>

                    <label className="">
                      New Employee(<em> {emp1?.length} </em>)
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

                <select
                  className=" h-[30px] w-[40%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  onChange={(e) => setEmpPosition(e.target.value)}
                >
                  {position.map((position) => (
                    <option key={position.id}> {position.position}</option>
                  ))}
                </select>
                <select
                  className=" h-[30px] w-[40%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  onChange={(e) => setempstatus(e.target.value)}
                >
                  {EmployeeStatus.map((employee) => (
                    <option key={employee.id}> {employee.Employestatus}</option>
                  ))}
                </select>
                <select
                  className=" h-[30px] w-[40%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  onChange={(e) => setempdocu(e.target.value)}
                >
                  {document.map((docu1) => (
                    <option key={docu1.id}> {docu1.docu}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white w-[100%] h-[75%] md:h-[100%]">
              {employee && (
                <div className="h-[100%] overflow-auto overflow-x-hidden p-1">
                  <div className="grid grid-rows-1 md:grid-cols-4 gap-2 p-1">
                    {employee
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
                          <div className="">
                            <EmployeeConfig key={e.id} e={e} />
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

export default Employee;

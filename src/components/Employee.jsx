import React, { useState } from "react";

import EmployeeConfig from "./EmployeeConfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import ModalDeploy from "./ModalDeploy";
import EmployeeStatus from "./EmployeeStatus.json";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import position from "./position.json";
const Employee = ({ email }) => {
  const [search1, setSearch1] = useState("");
  const [employee, setEmployee] = useState([]);
  const [showModalDeploy, setShowModalDeploy] = useState(false);

  const [selected, setSelected] = useState([]);

  const [empPosition, setEmpPosition] = useState("Select Position");
  const [empStatus, setempstatus] = useState("Employee Status");

  const [selectednames, setselectednames] = useState("");

  if(showModalDeploy) document.body.style.overflow = 'hidden';
  else   document.body.style.overflow = 'unset';
  
  useEffect(() => {
    FetchEmployee();
    const EmployeeList = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Employee_List" },
        (payload) => {
          FetchEmployee();
        }
      )
      .subscribe();
  }, [empStatus, empPosition]);

  const FetchEmployee = async () => {
    if (empStatus === "Employee Status" && empPosition === "Select Position") {
      const { data: emp } = await supabase.from("Employee_List").select();
      setEmployee(emp);
    } else {
      if (empStatus !== "Employee Status" && empPosition === "Select Position") {
        const { data: empS } = await supabase
          .from("Employee_List")
          .select()
          .eq("status", empStatus);
        setEmployee(empS);
      } else if (empPosition !== "Select Position" && empStatus === "Employee Status") {
        const { data: empP } = await supabase
          .from("Employee_List")
          .select()
          .eq("Position", empPosition);
        setEmployee(empP);
      }  else {
        const { data: empstats } = await supabase
          .from("Employee_List")
          .select()
          .match({ status: empStatus, Position: empPosition });
        setEmployee(empstats);
      }
     
    }
  };

  function HandleChange(event) {
    const { value, checked } = event.target;

    if (checked) {
      setSelected((pre) => [...pre, value]);
      setselectednames((pre) => [...pre, value]);
    } else {
      setSelected((pre) => {
        return [...pre.filter((test) => test !== value)];
      });
      setselectednames((pre) => {
        return [...pre.filter((test) => test !== value)];
      });
    }
  }

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;

  useEffect(() => {
    const endoffsett = itemsOffset + perpage;
    setcurrentitems(employee.slice(itemsOffset, endoffsett));
    setpagecount(Math.ceil(employee.length / perpage));
  }, [itemsOffset, perpage, employee]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % employee.length;
    setItemOffset(newOffset);
  };

  return (
    <div className=" ">
      <div className="h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            <input
              className="-mt-8 md:-mt-0 top-96 w-[100%]   md:w-[100%] z-50 mb-10 h-[50%] lg:h-10 md:h-10  pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Search name"
              type="search"
              onChange={(e) => setSearch1(e.target.value)}
            ></input>
            <button
              onClick={() => setShowModalDeploy(true)}
              className="-mt-16 md:h-12 w-[100%] h-10 md:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {" "}
              Deploy
            </button>
            <div className="text-black gap-2 -mt-7">
              <select
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setempstatus(e.target.value)}
              >
                {EmployeeStatus.map((status) => (
                  <option key={status.id}> {status.Employestatus}</option>
                ))}
              </select>
            </div>
            <div className="text-black gap-2">
              <select
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setEmpPosition(e.target.value)}
              >
                {position.map((position) => (
                  <option key={position.id}> {position.position}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <h1 className="mt-10 z-50 font-bold flex flex-col mb-6 text-[25px] items-center">
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
            breakLabel={<span className="mr-4 mt-4">...</span>}
            pageCount={pagecount}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageRangeDisplayed={5}
            containerClassName="flex mt-2   "
            pageClassName="block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center roundend-md mr-4 "
          />
        </div>
        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-none   ">
          <div className=" grid grid-cols-3 w-[100%]  bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3 md:ml-[20%]">Position</div>
            <div className="text-md p-3 md:ml-[20%]">Email</div>
          </div>

          {currentitems && (
            <div className="md:h-[40%] h-[10rem] overflow-y-auto overflow-x-hidden">
              {currentitems
                .filter((val) => {
                  try {
                    if (search1 === "") {
                      return val;
                    } else if (
                      val.Position.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.Name.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .map((empData) => (
                  <EmployeeConfig
                    key={empData.id}
                    empData={empData}
                    handleChange={HandleChange}
                    selectedData={selected}
                    setselectednames={selectednames}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <ModalDeploy
        isOpenDeploy={showModalDeploy}
        isCloseDeploy={() => setShowModalDeploy(false)}
        Deploy={employee}
        DataSelected={selected}
        selectednames={selectednames}
      />
    </div>
  );
};

export default Employee;

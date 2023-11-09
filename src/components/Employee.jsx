import React, { useState } from "react";
import logo from "./images/magnifying-glass.png";
import EmployeeConfig from "./EmployeeConfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import ModalDeploy from "./ModalDeploy";
import EmployeeStatus from "./EmployeeStatus.json";
const Employee = ({ email }) => {
  const [search1, setSearch1] = useState("");
  const [employee, setEmployee] = useState([]);
  const [showModalDeploy, setShowModalDeploy] = useState(false);
  const [empdetailed, setempdetailed] = useState();
  const [selected, setSelected] = useState([]);

  const [empStatus, setempstatus] = useState("Employee Status");
  const [selectednames, setselectednames] = useState("");

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
  }, [empStatus]);

  const FetchEmployee = async () => {
    if (empStatus === "Employee Status") {
      const { data: employeee } = await supabase.from("Employee_List").select();
      setEmployee(employeee);
    } else {
      const { data: empstats } = await supabase
        .from("Employee_List")
        .select()
        .eq("status", empStatus);
      setEmployee(empstats);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);

  const lastPostIndex = currentPage * postperpage;
  const firstPostIndex = lastPostIndex - postperpage;
  const currentpost = employee.slice(firstPostIndex, lastPostIndex);

  let pages = [];

  for (
    let index = 1;
    index <= Math.ceil(employee.length / postperpage);
    index++
  ) {
    pages.push(index);
  }

  return (
    <div className=" ">
      <div className="">
        <div className="sticky top-5 md:flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%] lg:h-10 md:h-10  pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
          <button
            onClick={() => setShowModalDeploy(true)}
            className=" md:h-12 w-[100px] ml-[40%] md:ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {" "}
            Deploy
          </button>
          <div className="text-black gap-2">
            <select
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setempstatus(e.target.value)}
            >
              {EmployeeStatus.map((status) => (
                <option key={status.id}> {status.Employestatus}</option>
              ))}
            </select>
          </div>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          Employee List
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
        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] md:rounded-[60px] md:rounded-e-none   ">
          <div className=" grid grid-cols-3 w-[100%]  bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3 md:ml-[20%]">Position</div>
            <div className="text-md p-3 md:ml-[20%]">Email</div>
          </div>

          {currentpost && (
            <div className="h-[520px] overflow-y-auto">
              {currentpost
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
                .sort((a, b) => (b.id <= a.id ? 1 : -1))
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

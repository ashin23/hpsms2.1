import React, { useState } from "react";
import logo from "./images/magnifying-glass.png";
import EmployeeConfig from "./EmployeeConfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import ModalDeploy from "./ModalDeploy";

const Employee = ({ email }) => {
  const [view, setView] = useState(false);

  const [search1, setSearch1] = useState("");
  const [employee, setEmployee] = useState();
  const [showModalDeploy, setShowModalDeploy] = useState(false);

  const [selected, setSelected] = useState([]);

  const [selectstatus, setSelectstatus] = useState("");
  // const [deploy, setUndeploy] = useState({})

  const handledeploy = (event) => {
    setSelectstatus(event.target.value);
  };

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
  }, []);

  const FetchEmployee = async () => {
    const { data: employeee } = await supabase.from("Employee_List").select();
    setEmployee(employeee);
  };

  function HandleChange(e, index, empData) {
    const activedata = document.getElementById(index).checked;

    if (activedata === true) {
      setSelected((oldData) => [...oldData, { empData }]);
    } else if (activedata !== true) {
      const updatedItems = selected.filter(
        (item) => item.empData.Name !== e.target.value
      );
      setSelected(updatedItems);
    }
  }

  return (
    <div className=" ">
      <div className="">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[750px] z-50 mb-10 h-16 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
          <button
            onClick={() => setShowModalDeploy(true)}
            className=" h-12 w-[100px] ml-4  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {" "}
            Deploy
          </button>
          <div className="text-black gap-2">
            <input
              type="radio"
              id="true"
              name="choose"
              value="true"
              onChange={handledeploy}
              checked={selectstatus === "true"}
              className="ml-4 "
            />
            Deployed
            <input
              type="radio"
              id="false"
              name="choose"
              value="false"
              onChange={handledeploy}
              checked={selectstatus === "false"}
              className="ml-4 "
            />
            Undeployed
          </div>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          Employee List
        </h1>
        <div className=" p-3  w-[100%] z-10  pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] rounded-[60px] rounded-e-none   ">
          <div className=" grid grid-cols-3 w-[100%] bg-slate-300">
            <div className="text-md p-3">Name</div>
            <div className="text-md p-3">Position</div>
            <div className="text-md p-3">Email</div>
          </div>

          {employee && (
            <div className="h-[520px] overflow-y-auto">
              {employee
                .filter((val) => {
                  try {
                    if (selectstatus) {
                      return (
                        val.status.toLowerCase() === selectstatus.toLowerCase()  
                          // val.Position.toLowerCase().includes(search1.toLowerCase()) 
                        // val.FullName.toLowerCase().includes(search1.toLowerCase())
                      );
                    } else {
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
                    }
                  } catch (error) {}
                })
                .map((empData) => (
                  <EmployeeConfig
                    key={empData.id}
                    empData={empData}
                    HandleChangePass={HandleChange}
                    selectedData={selected}
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
        setDataSelected={setSelected}
      />
    </div>
  );
};

export default Employee;

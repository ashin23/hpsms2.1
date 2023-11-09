import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";

function ModalDeploy({
  isOpenDeploy,
  isCloseDeploy,
  Deploy,
  DataSelected,
  selectednames,
}) {
  const [name, setname] = useState([]);
  const [dataEmp, setdataEmp] = useState([]);
  const [datadisplay, setdatadisplay] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setname(DataSelected);
  }, [DataSelected, Deploy]);

  useEffect(() => {
    userList();
  }, []);

  const HandleSendCoordinator = async () => {
    const { data: coordinator } = await supabase
      .from("EmployeeListCoordinator")
      .insert([
        {
          Email: datadisplay,
          Data: name,
        },
      ]);
    for (let index = 0; index < selectednames.length; index++) {
      const { data: employee } = await supabase
        .from("Employee_List")
        .update({
          status: "Deploy",
        })
        .eq("Name", name);
    }
  };

  const userList = async () => {
    const { data: userList } = await supabase.from("UserList").select();
    setdataEmp(userList);
  };

  function close() {
    isCloseDeploy();
    setdatadisplay("");
  }

  if (!isOpenDeploy) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className=" grid justify-center bg-white md:p-5  p-2 gap-3  md:h-[45%]  h-[60%] md:w-[20%] w-[100%] rounded-3xl shadow-2xl">
        <label className=" flex p-3 px-3 text-slate-100 md:text-[30px] h-fit text-xl  text-center font-semibold
          bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Selected Employees
        </label>
        <div className="grid grid-cols-2 md:w-[70%] gap-10 md:gap-5 md:h-[20%]">
          <button
            onClick={() => HandleSendCoordinator()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm md:px-15 md:py-5 md:mr-5 md:mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Send
          </button>
          <button
            onClick={() => close()}
            className=" md:px-15 md:py-5 md:mr-5 md:mb-5 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        {name.length > 0 ? (
          <ul className="grid grid-cols  ">
            <li className=" h-[50%] bg-slate-400 ">{name}</li>
          </ul>
        ) : (
          "No Data Selected"
        )}
        <div>
          <h1 className="font-bold pb-2 text-[20px]">Select Coordinator</h1>
          <input
            value={datadisplay}
            onChange={(e) => setdatadisplay(e.target.value)}
            type="text"
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          ></input>
          <div
            className={`${
              datadisplay === ""
                ? "hidden"
                : ` bg-slate-400 overflow-y-auto`
            }`}
          >
            {dataEmp
              .filter((val) => {
                try {
                  if (datadisplay === "") {
                    return val;
                  } else if (
                    val.Email.toLowerCase().includes(datadisplay.toLowerCase())
                  ) {
                    return val;
                  } else {
                    return val;
                  }
                } catch (error) {}
              })
              .map((e) => (
                <div
                  className={`${datadisplay === email ? "hidden" : "md:h-[20%]"}`}
                  onClick={() => setdatadisplay(e.Email) || setEmail(e.Email)}
                >
                  {e.Email}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDeploy;

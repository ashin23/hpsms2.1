import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";

function ModalDeploy({ isOpenDeploy, isCloseDeploy, Deploy, DataSelected }) {
  const [data, setData] = useState([]);
  const [emailSend, setEmailSend] = useState(
    window.localStorage.getItem("email")
  );
  const [dataEmp, setdataEmp] = useState([]);
  const [datadisplay, setdatadisplay] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setData(DataSelected);
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
          Data: data,
        },
      ]);
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
      <button
        onClick={() => close()}
        className="top-[123px] place-content-center ml-[470px] absolute py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
      >
        Cancel
      </button>
      <div className=" grid grid-cols-1 justify-center h-[65%] w-[30%] bg-white p-10 gap-3 rounded-2xl">
        <label className=" flex pl-9 pr-40 py-1 ml-2 my-1 h-[70%] text-slate-100 text-[20px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Selected Employees
        </label>
        <div className="grid grid-cols-1 w-[30%] h-[20%]">
          <button
            onClick={() => HandleSendCoordinator()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-5 mr-5 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Send
          </button>
        </div>

        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li
                key={item.id}
                className="justify-between flex bg-slate-300 p-3 mt-1 rounded-md"
              >
                {item.empData.Name}
              </li>
            ))}
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
                : `max-h-[50px] bg-slate-400 overflow-y-auto`
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
                  className={`${datadisplay === email ? "hidden" : ""}`}
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

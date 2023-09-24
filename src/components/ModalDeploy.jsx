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
      <div className=" grid grid-cols-1 justify-center bg-white p-10 gap-3 rounded-2xl">
        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li
                key={item.id}
                className="justify-between flex bg-slate-300 p-3 mt-1 rounded-md"
              >
                {item.empData.FullName}
              </li>
            ))}
          </ul>
        ) : (
          "No Data Selected"
        )}
        <div>
          <h1 className="font-bold pb-2">Coordinator</h1>
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
        <button onClick={() => HandleSendCoordinator()}>Send</button>
        <button onClick={() => close()}>Cancel</button>
       
      </div>
    </div>
  );
}

export default ModalDeploy;

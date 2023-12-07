import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import Deploy from "./Deploy";
function ModalDeploy({ isOpenDeploy, isCloseDeploy, Position }) {
  const [employee, setemployee] = useState([]);
  const [userlist, setUserList] = useState([]);
  const [datadisplay, setdatadisplay] = useState();
  const [email, setEmail] = useState();
  const [coord, setcoord] = useState("Coordinator");

  const currentdate = new Date().toDateString();

  useEffect(() => {
    userList();
    empDeploy();
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Employee_List" },
        (payload) => {
          empDeploy();
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);

  const empDeploy = async () => {
    const { data: emp12 } = await supabase
      .from("Employee_List")
      .select()
      .match({ Position: Position, status: "Undeploy" })
      .eq("Position", Position);
    setemployee(emp12);
  };

  const HandleSendCoordinator = async () => {
    if (!datadisplay) {
      toast.warning("Select Coordinator", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      if (employee.length > 0) {
        const { data: coordinator } = await supabase
          .from("EmployeeListCoordinator")
          .insert([
            {
              created_at: currentdate,
              Email: datadisplay,
              Data: employee,
            },
          ]);

        for (let index = 0; index < employee.length; index++) {
          const { data: emparray } = await supabase
            .from("Employee_List")
            .update({ status: "Deploy" })
            .eq("uuid", employee[index].uuid);
        }
        setdatadisplay("");
        toast.success("Sent Succesfully!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          isCloseDeploy();
        }, [3000]);
      } else if (employee.length <= 0) {
        toast.warning("No data selected", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const userList = async () => {
    const { data: userList } = await supabase
      .from("UserList")
      .select()
      .eq("userlvl", coord);
    setUserList(userList);
  };

  function close() {
    isCloseDeploy();
    setdatadisplay("");
    empDeploy()
  }

  if (!isOpenDeploy) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center z-50 top-50 flex "
      >
        <div
          data-aos="zoom-in"
          className=" grid justify-center bg-white md:p-5  p-2 gap-3  overflow-auto overflow-x-hidden md:h-[20%] lg:h-[50%] h-[80%] md:w-[25%] w-[100%] rounded-3xl shadow-2xl"
        >
          <label
            className=" flex p-3 px-3 text-slate-100 md:text-[30px] h-fit text-xl  text-center font-semibold
            bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl -mb-24"
          >
            Selected Employees
          </label>
          <div className="flex grid-cols-2 md:-mb-14 md:mt-2">
            <button
              onClick={() => HandleSendCoordinator()}
              className="  focus:outline-none md:h-[40%] h-[50%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >
              Send
            </button>
            <button
              onClick={close}
              className=" focus:outline-none md:h-[40%] h-[50%] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
            >
              Cancel
            </button>
          </div>
          {employee && (
            <div className=" overflow-y-auto overflow-x-hidden md:h-[50%]">
              {employee.map((pos, index) => (
                <Deploy
                  key={index}
                  pos={pos}
                  setemployee={setemployee}
                  employee={employee}
                 
                />
              ))}
            </div>
          )}
         

          <div className="md:-mt-10">
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
                  : ` bg-slate-400 overflow-y-auto absolute`
              }`}
            >
              {userlist
                .filter((val) => {
                  try {
                    if (datadisplay === "") {
                      return val;
                    } else if (
                      val.Email.toLowerCase().includes(
                        datadisplay.toLowerCase()
                      )
                    ) {
                      return val;
                    } else {
                      return val;
                    }
                  } catch (error) {}
                })
                .map((e) => (
                  <div
                    className={`${
                      datadisplay === email ? "hidden" : "md:h-[20%] "
                    }`}
                    onClick={() => setdatadisplay(e.Email) || setEmail(e.Email)}
                  >
                    {e.Email}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}

export default ModalDeploy;

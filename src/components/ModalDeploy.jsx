import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import Deploy from "./Deploy";
import "ldrs/ring";
import { lineSpinner } from "ldrs";
function ModalDeploy({
  isOpenDeploy,
  isCloseDeploy,
  Position,
  Hotel,
  Location,
  Personel,
  id,
  Email,
  checkerCompletion,
}) {
  const [employee, setemployee] = useState([]);
  const [userlist, setUserList] = useState([]);
  const [datadisplay, setdatadisplay] = useState("");
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

  const [disable, setdisable] = useState(false);

  const HandleSendCoordinator = async () => {
    setdisable(true);
    if (!Email) {
      toast.warning("Select Coordinator", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setdisable(false);
      return;
    } else {
      if (employee.length > 0) {
        const { data: coordinator } = await supabase
          .from("EmployeeListCoordinator")
          .insert([
            {
              created_at: currentdate,
              Email: Email,
              Data: employee,
              Position: Position,
              Hotel: Hotel,
              Location: Location,
            },
          ]);

        let update = Personel - employee.length;

        const { data: updatePersonel } = await supabase
          .from("Request")
          .update({ Personel: update })
          .match({ id: id });

        for (let index = 0; index < employee.length; index++) {
          const { data: emparray } = await supabase
            .from("Employee_List")
            .update({ status: "Deploy" })
            .eq("id", employee[index].id);
        }

        checkerCompletion();
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
        setdisable(false);
        isCloseDeploy();
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
        setdisable(false);
        return;
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
    empDeploy();
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
          className=" grid justify-center bg-white md:p-5  p-2 gap-3  overflow-auto overflow-x-hidden md:h-[20%] lg:h-[50%] lg:w-[40%] h-[80%] md:w-[25%] w-[100%] rounded-3xl shadow-2xl"
        >
          <div className="flex   sticky top-0 h-fit justify-between  md:w-full items-center    bg-white">
            <label
              className=" flex p-3 px-3  text-slate-100 md:text-[30px] h-fit text-xl  text-center font-semibold
              bg-gradient-to-r from-[#020024] via-[#040463] to-[#040463] rounded-2xl "
            >
              Selected Employees
            </label>
            <div className="flex grid-cols-2 md:ml-2 ">
              <button
                disabled={disable}
                onClick={() => HandleSendCoordinator()}
                className={`${
                  !disable
                    ? "focus:outline-none  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    : "bg-gray-500"
                } md:h-[40%] h-[50%] text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
              >
                {disable ? (
                  <l-line-spinner
                    size="20"
                    stroke="3"
                    speed="1"
                    color="black"
                  ></l-line-spinner>
                ) : (
                  "Send"
                )}
              </button>
              <button
                disabled={disable}
                onClick={close}
                className=" focus:outline-none md:h-[40%] h-[50%] text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900 "
              >
                Cancel
              </button>
            </div>
          </div>

          {employee && (
            <div className=" overflow-y-auto overflow-x-hidden  md:h-[100%]">
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

          <div className="md-mt-10">
            <h1 className="font-bold pb-2 text-[20px]">Select Coordinator</h1>
            <input
              disabled={true}
              value={Email}
              type="text"
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDeploy;

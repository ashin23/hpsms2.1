import React from "react";
import supabase from "./supabaseClient";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const UserListConfig = ({ e, notify }) => {
  const [view, setView] = useState(false);
  const [password, setPassword] = useState("");
  const [img, setImg] = useState();
  const [broken, isBroken] = useState(false);

  useEffect(() => {
    getAvatar(e.Email);
  }, [e]);

  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
  }, []);


  async function Handlerestricted() {
    var oldrole = e.userlvl;
    const { data: user } = await supabase
      .from("UserList")
      .update({ userlvl: "Restricted", oldRole: oldrole })
      .eq("id", e.id);
    const { data: emp } = await supabase
      .from("Employee_List")
      .update({ userlvl: "Restricted", oldRole: oldrole })
      .eq("id", e.id);
    const { data: newuser } = await supabase
      .from("NewUser")
      .update({ userlvl: "Restricted", oldRole: oldrole })
      .eq("id", e.id);
    toast.success("Successfully Restricted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  async function Handleunrestricted() {
    const { data: user } = await supabase
      .from("UserList")
      .update({ userlvl: e.oldRole })
      .eq("id", e.id);
    const { data: emp } = await supabase
      .from("Employee_List")
      .update({ userlvl: e.oldRole })
      .eq("id", e.id);
    const { data: newuser } = await supabase
      .from("NewUser")
      .update({ userlvl: e.oldRole })
      .eq("id", e.id);
    toast.success("Successfully Unrestricted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  async function Handleremovenotif() {
    const { data: user } = await supabase
      .from("UserList")
      .update({ Notifications: "true" })
      .eq("id", e.id);
    const { data: emp } = await supabase
      .from("Employee_List")
      .update({ Notifications: "true" })
      .eq("id", e.id);
    const { data: newuser } = await supabase
      .from("NewUser")
      .update({ Notifications: "true" })
      .eq("id", e.id);
    toast.success("Success", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  async function Handledelete() {
   
    const { data: user } = await supabase
      .from("UserList")
      .delete()
      .eq("id", e.id);
    const { data: emp } = await supabase
      .from("Employee_List")
      .delete()
      .eq("id", e.id);
    const { data: newuser } = await supabase
      .from("NewUser")
      .delete()
      .eq("id", e.id);
    toast.success("Successfully Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const getAvatar = async (email1) => {
    const { data: avatar } = await supabase.storage.from("Files").list(email1, {
      limit: 1,
    });
    if (avatar.length > 0) {
      isBroken(true);
      return setImg(avatar[0].name);
    } else {
      isBroken(false);
    }
  };

  var displayColor = "";
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    displayColor = color;

    return color;
  }

  function avatarComponent(name) {
    return (
      <div
        style={{ background: stringToColor(name) }}
        className={`flex text-white items-center justify-center md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full font-thin`}
      >{`${name?.split(" ")[0][0]}`}</div>
    );
  }

  
  return (
    <>
      {" "}
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
        className={`${
          e.Notifications === "false" && "border-2 border-red-500 "
        }  md:text-base text-[10px] h-fit grid grid-cols-3 justify-center items-center mb-1 bg-slate-200 p-1  rounded-md  font-thin cursor-pointer`}
      >
        <div className="text-md flex items-center gap-1 ">
          {broken ? (
            <img
              onError={() => isBroken(true)}
              className="md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full shadow-md"
              src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
            ></img>
          ) : (
            <>{avatarComponent(e.Email)}</>
          )}

          {e.Email}
        </div>
        <div className="text-md cursor-pointer flex justify-center">
          {e.userlvl}
        </div>
        <div className=" grid-rows-3 w-[10%] ml-12 md:ml-[40%]  grid md:h-10  md:flex  gap-2 md:-mt-2 ">
          {e.userlvl === "Restricted" ? (
            <button
              onClick={() => Handleunrestricted()}
              className="-ml-20 focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg md:text-sm   text-xs md:px-3 px-1 py-1 md:py-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900  "
            >
              Unrestricted
            </button>
          ) : (
            <button
              onClick={() => Handlerestricted()}
              className="-ml-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg md:text-sm  text-xs md:px-3 px-1 py-1 md:y-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
            >
              Restricted
            </button>
          )}

         
          <button
            onClick={() => Handleremovenotif()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg md:text-sm md:px-3 text-xs px-1 py-1 md:y-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 "
          >
            Complete
          </button>
          <button
            onClick={() => Handledelete()}
            className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg md:text-sm md:px-3 text-xs px-1 py-1 md:y-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900 "
          >
            Delete
          </button>
        </div>{" "}
      
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default UserListConfig;
// {view ? (
//   <div>
//     <input
//       className="pl-2 rounded-sm "
//       type="text"
//       // value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     ></input>
//   </div>
// ) : (
//   <div className="mt-1.5">*****</div>
// )}
// <button onClick={() => setView(!view)}>
//   {view ? (
//     <AiFillEyeInvisible className="text-[20px]" />
//   ) : (
//     <AiFillEye className="text-[20px]" />
//   )}
// </button>


  

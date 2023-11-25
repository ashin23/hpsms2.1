import React from "react";
import supabase from "./supabaseClient";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const UserListConfig = ({ e, notify }) => {
  const [view, setView] = useState(false);
  const [password, setPassword] = useState(e.Password);

  async function HandleUpdate() {
    if (e.Password === password) {
    } else {
      const { data, error } = await supabase
        .from("UserList")
        .update({ Password: password })
        .eq("id", e.id)
        .select();

      const { data: emp } = await supabase
        .from("Employee_List")
        .update({ Password: password })
        .eq("id", e.id)
        .select();
      const { data: newuser } = await supabase
        .from("NewUser")
        .update({ Password: password })
        .eq("id", e.id)
        .select();
      setView(false);
      setPassword(password);
      toast.success("Successfully Updated", {
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

  return (
    <div className="flex bg-slate-200  mt-2 w-[100%] rounded-md">
      <div className="p-3  md:hover:translate-x-2   md:hover:p-4 md:duration-500 mt-1 lg:h-10 rounded-md grid grid-rows-3 md:flex w-[100%] ">
        <div className="text-md w-[100%] ">{e.Email}</div>
        <div className="text-md md:w-[100%]   flex gap-2">
          {view ? (
            <div>
              <input
                className="pl-2 rounded-sm "
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          ) : (
            <div className="mt-1.5">*****</div>
          )}
          <button onClick={() => setView(!view)}>
            {view ? (
              <AiFillEyeInvisible className="text-[20px]" />
            ) : (
              <AiFillEye className="text-[20px]" />
            )}
          </button>
        </div>
        <div className="text-md w-[100%] ">{e.userlvl}</div>
        <div className="w-[10%] md:h-10  flex gap-2 -mt-2 ">
          <button
            onClick={() => Handledelete()}
            className="-ml-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
          >
            delete
          </button>
          <button
            onClick={() => HandleUpdate()}
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 "
          >
            Update
          </button>
        </div>
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
    </div>
  );
};

export default UserListConfig;

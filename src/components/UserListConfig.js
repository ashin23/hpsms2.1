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

  const Notifysucces = () => {
    toast.success("Successfully Updated", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };



  async function HandleUpdate() {
    if (e.Password === password) {
    } else {
      const { data, error } = await supabase
        .from("UserList")
        .update({ Password: password })
        .eq("id", e.id)
        .select();
      setView(false);
      setPassword(password);
      Notifysucces();
    }
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
        <div className="w-[10%] mr-10 -mt-2 ">
          <button
            onClick={() => HandleUpdate()}
            className="bg-slate-400 p-1 rounded-md  "
          >
            Update
          </button>
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
  );
};

export default UserListConfig;

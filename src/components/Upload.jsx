import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = ({ isUpload, isCloseUpload, email }) => {
  const [email1, setEmail1] = useState("");
  const [sSS_Number, setSSS_Number] = useState("");
  const [phil_Health_No, setPhil_Health_No] = useState("");
  const [pag_Ibig_No, setPag_Ibig_No] = useState("");
  const [tin_No, setTin_No] = useState("");

  useEffect(() => {
    getter();
  }, []);

  const getter = async () => {
    setEmail1(email.Email);
  };

  const Notify = () => {
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      isCloseUpload();
    }, [2000]);
  };

  const NotifyError1 = () => {
    toast.error("Fill all the blanks", {
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

  async function HandleSubmit() {
    if (!sSS_Number || !phil_Health_No || !tin_No || !pag_Ibig_No) {
      NotifyError1();
      return;
    }
    const { data: updatemp } = await supabase
      .from("Employee_List")
      .update({
        // Notifications: "false",
        SSS_Number: sSS_Number,
        Phil_Health_No: phil_Health_No,
        Tin_Number: tin_No,
        Pag_Ibig_No: pag_Ibig_No,
      })
      .eq("Email", email1)
      .single();
    Notify();
  }

  if (!isUpload) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center flex  "
    >
      <div className="bg-white h-[50%] w-[100%] md:h-[57%] md:w-[45%] md:rounded-md  rounded-md shadow-2xl shadow-gray-500 overflow-auto ">
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-56 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Upload
        </label>
        <button
          onClick={() => HandleSubmit()}
          className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          onClick={isCloseUpload}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3  p-5 rounded ">
          <label className="flex font-bold">SSS No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="SSS Number"
            onChange={(e) => setSSS_Number(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Phil Health No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Phil Heatlh Number"
            onChange={(e) => setPhil_Health_No(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Pag-IBIG No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Pag-IBIG Number"
            onChange={(e) => setPag_Ibig_No(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Tin No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Tin Number"
            onChange={(e) => setTin_No(e.target.value)}
            type="text"
          ></input>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Upload;

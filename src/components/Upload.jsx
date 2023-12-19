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

  async function HandleSubmit() {
    if (!sSS_Number || !phil_Health_No || !tin_No || !pag_Ibig_No) {
      toast.error("Fill all the blanks", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const { data: updatemp } = await supabase
      .from("Employee_List")
      .update({
        documents: "Complete",
        Notifications: "false",
        SSS_Number: sSS_Number,
        Phil_Health_No: phil_Health_No,
        Tin_Number: tin_No,
        Pag_Ibig_No: pag_Ibig_No,
      })
      .eq("Email", await email.Email)
      .single();
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      isCloseUpload();
    }, [3000]);
  }

  if (!isUpload) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center flex  "
    >
      <div className="bg-white h-[50%] w-[100%] md:h-[40%] lg:w-[30%] lg:h-[50%] md:w-[25%] md:rounded-md  rounded-md shadow-2xl shadow-gray-500 overflow-auto ">
        <div className="sticky top-6 w-[40%]  items-center   bg-white">
          <label
            className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-56 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#020024] via-[#040463] to-[#040463] rounded-2xl"
          >
            Upload
          </label>
          <div className="md:-mt-5 mt-3 flex px-5 text-lg">
            <button
              onClick={() => HandleSubmit()}
              className="text-white bg-green-700 whitespace-nowrap  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Submit
            </button>
            <button
              onClick={isCloseUpload}
              className="text-white bg-gray-700 whitespace-nowrap  hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className=" grid grid-cols-1  gap-3  p-5 rounded  ">
          <div>
            <label className="flex font-bold">SSS No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="SSS Number"
              onChange={(e) => setSSS_Number(e.target.value)}
              type="number"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Phil Health No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Phil Heatlh Number"
              onChange={(e) => setPhil_Health_No(e.target.value)}
              type="number"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Pag-IBIG No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Pag-IBIG Number"
              onChange={(e) => setPag_Ibig_No(e.target.value)}
              type="number"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Tin No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Tin Number"
              onChange={(e) => setTin_No(e.target.value)}
              type="number"
            ></input>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Upload;

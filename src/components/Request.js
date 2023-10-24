import React, { useState } from "react";
import position from "./position.json";
import NumberOfPersonnel from "./NumberofPersonnel.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalRequest = ({ isVisible5, onClose5, email }) => {
  const [locations, setLocations] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [positions, setPositions] = useState("");
  const [personnels, setPersonnels] = useState("");

  const [request1, setRequest] = useState();

  const NotifyError2 = () => {
    toast.warning("Please fill the blanks", {
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

  const Notify = () => {
    toast.success("Request sent successfully!", {
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
      onClose5();
    }, [2000]);
  };
  const HandleRequst = async (e) => {
    // e.preventDefault()
    if (!locations || !hotel || !date || !info || !positions || !personnels) {
      NotifyError2();
      return;
    }
    const { data, error } = await supabase.from("Request").insert([
      {
        Email: email.Email,
        Location: locations,
        Date: date,
        Personel: personnels,
        Position: positions,
        AddInfo: info,
        Hotel: hotel,
      },
    ]);
    Notify();
  };

  if (!isVisible5) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="bg-white h-[600px] w-[45%] rounded-3xl p-10 shadow-2xl">
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4  text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Request
        </label>
        <div className="grid grid-cols-2 gap-3 ">
          <label className="justify-center flex font-semibold">Location</label>
          <input
            onChange={(e) => setLocations(e.target.value)}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Location"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">Hotel</label>
          <input
            onChange={(e) => setHotel(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Hotel"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">
            Date Needed
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder=""
            type="datetime-local"
          ></input>

          <label className="justify-center flex font-semibold">
            Additional Information
          </label>
          <input
            onChange={(e) => setInfo(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Additional Information"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">
            Number of Personel
          </label>
          <div className="">
            <select
              onClick={(e) => setPersonnels(e.target.value)}
              className=" pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 "
            >
              {NumberOfPersonnel.map((NumberOfPersonnels) => (
                <option key={NumberOfPersonnels.id}>
                  {" "}
                  {NumberOfPersonnels.personnels}
                </option>
              ))}
            </select>
          </div>
          <label className="justify-center flex font-semibold">Position</label>
          <div className="">
            <select
              onClick={(e) => setPositions(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 "
            >
              {position.map((positions) => (
                <option key={positions.id}> {positions.position}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex place-content-center gap-2 mt-5 w-[100%] ">
            <button
              onClick={() => HandleRequst()}
              className=" text-white bg-blue-700 w-[40%] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Request
            </button>

            <button
              onClick={onClose5}
              className="py-2.5 w-[40%] px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default ModalRequest;

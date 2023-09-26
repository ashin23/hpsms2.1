import React, { useState } from "react";
import position from "./position.json";
import NumberOfPersonnel from "./NumberofPersonnel.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalRequest = ({ isVisible5, onClose5,email }) => {
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
     onClose5()
    }, [2000]);
  };
  const HandleRequst = async (e) => {
    // e.preventDefault()
    if (
      !locations ||
      !hotel ||
      !date ||
      !description ||
      !info ||
      !positions ||
      !personnels
    ) {
      NotifyError2()
      return
    }
    const { data, error } = await supabase.from("Request").insert([
      {
        Email: email.Email,
        Location: locations,
        Date: date,
        Description: description,
        Personel: personnels,
        Position: positions,
        AddInfo: info,
        Hotel: hotel,
      },
    ]);
    Notify()
  };
 

  if (!isVisible5) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="bg-white h-[520px] rounded-3xl">
        <div className="  grid grid-cols-2 p-10 gap-3 ">
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
          <label className="justify-center flex font-semibold">Date</label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder=""
            type="datetime-local"
          ></input>
          <label className="justify-center flex font-semibold">
            Jobs Description
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Jobs Description"
            type="text"
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
              className=" w-[40%] items-center hover:bg-sky-400 border-2 border-black text-black hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg"
            >
              Request
            </button>

            <button
              onClick={onClose5}
              className=" w-[40%] items-center hover:bg-sky-400 border-2 border-black text-black hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg"
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

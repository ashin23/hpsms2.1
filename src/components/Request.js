import React, { useState } from "react";
import pos1 from "./position.json";
import NumberOfPersonnel from "./NumberofPersonnel.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalRequest = ({ isVisible5, onClose5, email }) => {
  const [locations, setLocations] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  // const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [positions, setPositions] = useState("Select Position");
  const [personnels, setPersonnels] = useState("");

  const [request1, setRequest] = useState();

  const HandleRequst = async () => {
    try {
      if (
        !locations ||
        !hotel ||
        !date ||
        !info ||
        // personnels === "Number of Personnel" ||
        positions === "Select Position"
      ) {
        toast.warning(
          `${
            ((!locations ||
              !hotel ||
              !date ||
              // personnels === "Number of Personnel" ||
              positions === "Select Position" ||
              !info) &&
              "Fill up the blanks") ||
            (!locations && "Location is required") ||
            (!hotel && "Hotel is required") ||
            (!date && "Date is required") ||
            (!info && "Additional information is required") ||
            // (personnels === "Number of Personnel") ||
            positions === "Select Position"
          }`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
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
          Notifications: "false"
        },
      ]);
      setLocations("");
      setDate("");
      setHotel("");
      setInfo("");
      toast.success("Request sent successfully!", {
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
        onClose5();
      }, [3000]);
    } catch (error) {}
  };

  if (!isVisible5) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="bg-white h-[75%] w-[100%] md:h-[57%] lg:h-[60%] lg:w-[50%] lg:p-5 md:w-[45%] md:rounded-md  rounded-md shadow-2xl shadow-gray-500 overflow-auto">
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4 text-slate-100 text-[30px] md:text-[30px] h-fit text-xl w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Request
        </label>
        <div className="grid grid-cols-1 gap-5  md:grid-cols-2 md:gap-3 ">
          <label className="justify-center flex font-semibold">Location</label>
          <input
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Location"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">Hotel</label>
          <input
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Hotel"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">
            Date Needed
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder=""
            type="date"
          ></input>

          <label className="justify-center flex font-semibold">
            Additional Information
          </label>
          <input
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Additional Information"
            type="text"
          ></input>
          <label className="justify-center flex font-semibold">
            Number of Personel
          </label>
          <input
            value={personnels}
            onChange={(e) => setPersonnels(e.target.value)}
            className=" pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Number of Personnels"
            type="number"
          ></input>
          <label className="justify-center flex font-semibold">Position</label>
          <select
                className="pl-4 pr-3 py-1 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setPositions(e.target.value)}
              >
                {pos1.map((position) => (
                  <option key={position.id}> {position.position}</option>
                ))}
              </select>
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
              className="py-2.5 w-[40%] px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
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

export default ModalRequest;

import React, { useState } from "react";
import pos1 from "./position.json";
import NumberOfPersonnel from "./NumberofPersonnel.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ldrs/ring";
import { lineSpinner } from "ldrs";
import moment from "moment/moment";
const ModalRequest = ({ isVisible5, onClose5, email }) => {
  const [locations, setLocations] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  // const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [positions, setPositions] = useState("Select Position");
  const [personnels, setPersonnels] = useState("");

  const [request1, setRequest] = useState();
  const [disable, setdisable] = useState(false);
  var date1 = moment(new Date()).format("yyyy-M-D");
  const HandleRequst = async () => {
    try {
      setdisable(true);
      if (
        !locations ||
        !hotel ||
        !date ||
        !info ||
        !personnels ||
        positions === "Select Position"
      ) {
        toast.warning(
          `${
            ((!locations ||
              !hotel ||
              !date ||
              !personnels ||
              positions === "Select Position" ||
              !info) &&
              "Fill up the blanks") ||
            (!locations && "Location is required") ||
            (!hotel && "Hotel is required") ||
            (!date && "Date is required") ||
            (!info && "Additional information is required") ||
            (!personnels && "Number of Personnel is required") ||
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
        setdisable(false);
        return;
      }
      const { data, error } = await supabase.from("Request").insert([
        {
          created_at: date1,
          Email: email.Email,
          Location: locations,
          Date: date,
          Personel: personnels,
          Position: positions,
          AddInfo: info,
          Hotel: hotel,
          Notifications: "false",
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
      setdisable(false);
      onClose5();
    } catch (error) {}
  };

  if (!isVisible5) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="bg-white h-[75%] w-[100%] md:h-[41%]  lg:p-5 md:w-[40%] md:rounded-md  rounded-md shadow-2xl shadow-gray-500 overflow-x-hidden ">
        <div className="sticky top-4 md:w-[50%] mt-5 md:-mt-1 items-center   bg-white">
          <label className="flex pl-9 pr-56 py-3  my-4 text-slate-100 text-[30px] md:text-[30px] h-fit text-xl w-fit text-center font-semibold  bg-gradient-to-r from-[#020024] via-[#040463] to-[#040463] rounded-2xl">
            Request
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-2 p-2 md:p-0  md:grid-cols-2 md:gap-3 ">
          <div>
            <label className=" flex font-semibold">Location</label>
            <input
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="md:pl-10 pl-2 lg:pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Location"
              type="text"
            ></input>
          </div>
          <div>
            <label className=" flex font-semibold">Hotel</label>
            <input
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              className=" md:pl-10 pl-2 lg:pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Hotel"
              type="text"
            ></input>
          </div>
          <div>
            <label className=" flex font-semibold">Date Needed</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className=" md:pl-10 pl-2 lg:pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder=""
              type="date"
            ></input>
          </div>
          <div>
            <label className=" flex font-semibold">
              Additional Information
            </label>
            <input
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className=" md:pl-10 pl-2 lg:pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Additional Information"
              type="text"
            ></input>
          </div>
          <div>
            <label className=" flex font-semibold">Number of Personel</label>
            <input
              value={personnels}
              onChange={(e) => setPersonnels(e.target.value)}
              className="md:pl-10 pl-2 lg:pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Number of Personnels"
              type="number"
            ></input>
          </div>
          <div>
            <label className=" flex font-semibold">Position</label>
            <select
              className="p-2  w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setPositions(e.target.value)}
            >
              {pos1.map((position) => (
                <option key={position.id}> {position.position}</option>
              ))}
            </select>
          </div>
        </div>
        <div className=" mt-5 md:mt-3 md:flex justify-end -mr-7 px-5 text-lg">
          <button
            disabled={disable}
            onClick={() => HandleRequst()}
            className={`${
              !disable
                ? " bg-blue-700 hover:bg-blue-800 focus:ring-4 text-white focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                : "bg-gray-300"
            }text-white  whitespace-nowrap   font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2`}
          >
            {disable ? (
              <l-line-spinner
                size="20"
                stroke="3"
                speed="1"
                color="black"
              ></l-line-spinner>
            ) : (
              "REQUEST"
            )}
          </button>

          <button
            disabled={disable}
            onClick={onClose5}
            className="text-white bg-gray-700 whitespace-nowrap  hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            CANCEL
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

export default ModalRequest;

import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import moment from "moment/moment";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

emailjs.init("-qtQXoQ1iYx4JDljO");

const ModalAccept = ({ isAccepted, isReject, info }) => {
  const [date, setDate] = useState();
  const [location, setLocation] = useState();

  const [email1, setEmail] = useState(info.Email);

  const [name, setName] = useState(info.FullName);

  const [company1, setCompany] = useState("Hotel Pro Services INC.");
  const [message1, setMessage] = useState();

  async function HandleTransfer() {
    const { data: Quelist } = await supabase.from("QueuingList").insert({
      FullName: info.FullName,
      Email: info.Email,
      City: info.City,
      Exp: info.Exp,
      Relocate: info.Relocate,
      Position: info.Position,
    });

    const { error } = await supabase

      .from("ApplicantsList")
      .delete()
      .eq("id", info.id);
  }
  const Notify = () => {
    toast.success("Sent succesfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      isReject();
    }, [5000]);
  };

  const NotifyError2 = () => {
    toast.warning("Please fill the blanks", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function InfoEmail(e) {
    var date1 = moment(date).format("LLL");
    if (!date || !location) {
      NotifyError2();
      return;
    } else {
      emailjs.send(
        "service_yj6ye3j",
        "template_v7ln2cg",
        {
          from_name: info.FullName,
          message: message1,
          email1: email1,
          location: location,
          date: date1,
        },
        "-qtQXoQ1iYx4JDljO"
      );
      Notify();
      HandleTransfer();
    }
  }

  if (!isAccepted) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className=" grid grid-cols-1 justify-center bg-white p-10 gap-3 rounded-2xl">
        {/* email  */}
        <label className="flex font-semibold text-[20px]">Email</label>
        <input
          type="text"
          value={email1}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        {/* date  */}
        <label className="flex font-semibold text-[20px]">
          Select date and Time
        </label>
        <input
          className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        ></input>

        {/* location  */}
        <label className="flex font-semibold text-[20px]">Location</label>
        <input
          className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        {/* company  */}
        <input
          type="text"
          value={company1}
          onChange={(e) => setCompany(e.target.value)}
        ></input>
        {/* message  */}
        <textarea
          rows={10}
          type="text"
          value={message1}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Additional Message"
        ></textarea>

        <button
          onClick={() => InfoEmail()}
          className="bg-green-600 w-[100%]  px-3 py-2 text-sm   hover:bg-green-400 hover:text-black rounded-lg "
        >
          Send to Email
        </button>
        <button
          onClick={isReject}
          className="px-3 py-2 text-sm   hover:bg-gray-400 hover:text-black rounded-lg bg-slate-300 w-[100%]"
        >
          Cancel
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
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
    </div>
  );
};

export default ModalAccept;

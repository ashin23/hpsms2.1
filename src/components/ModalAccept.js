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
  const [time, setTime] = useState();
  const [location, setLocation] = useState();

  const [email1, setEmail] = useState(info.Email);

  const [name, setName] = useState(info.FullName);

  const [company1, setCompany] = useState("Hotel Pro Services INC.");
  const [message1, setMessage] = useState("");

  var date1 = moment(date).format("LLL");

  const HandleTransfer = async () => {
    const { info: Quelist } = await supabase.from("Queuing_List").insert({
      Email: info.Email,
      Password: info.Password,
      Name: info.Name,
      Mobile_No: info.Mobile_No,
      Age: info.Age,
      City_Address: info.City_Address,
      Religion: info.Religion,
      Sex: info.Sex,
      Provincial_Address: info.Provincial_Address,
      Date_of_Birth: info.Date_of_Birth,
      CivilStatus: info.CivilStatus,
      Name_of_Mother: info.Name_of_Mother,
      Occupation_Mother: info.Occupation_Mother,
      Name_of_Father: info.Name_of_Father,
      Occupation_Father: info.Occupation_Father,
      Notify_Emergency: info.Notify_Emergency,
      Relationship: info.Relationship,
      Emergency_Address: info.Emergency_Address,
      Contact_Number: info.Contact_Number,
      College: info.College,
      College_Graduated: info.College_Graduated,
      Course: info.Course,
      Special_Course: info.Special_Course,
      Vocational: info.Vocational,
      Vocational_Graduated: info.Vocational_Graduated,
      HighSchool: info.HighSchool,
      HighSchool_Graduated: info.HighSchool_Graduated,
      Elementary: info.Elementary,
      Elementary_Graduated: info.Elementary_Graduated,
      Inclusive_Dates: info.Inclusive_Dates,
      Company_History: info.Company_History,
      Position_History: info.Position_History,
      Name_References: info.Name_References,
      Company_References: info.Company_References,
      Position_References: info.Position_References,
      SSS_Number: info.SSS_Number,
      Phil_Health_No: info.Phil_Health_No,
      Pag_Ibig_No: info.Pag_Ibig_No,
      Tin_Number: info.Tin_Number,
      Position: info.Position,
      userlvl: "Employee",
      status: "Undeploy",
      Notifications: "false",
      date: date,
      Time: time,
    });

    const { error } = await supabase

      .from("Applicant_List")
      .delete()
      .eq("id", info.id);
  };
  const Notify = () => {
    toast.success("Sent succesfully!", {
      position: "top-center mt-20",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // setTimeout(() => {
    //   isReject();
    // }, [5000]);
  };

  const NotifyError2 = () => {
    toast.warning("Please fill the blanks", {
      position: "top-center mt-20",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const InfoEmail = async () => {
    if (!date || !location) {
      NotifyError2();
      return;
    } else {
      // emailjs.send(
      //   "service_yj6ye3j",
      //   "template_v7ln2cg",
      //   {
      //     from_name: info.FullName,
      //     message: message1,
      //     email1: email1,
      //     location: location,
      //     date: date,
      //     time: time
      //   },
      //   "-qtQXoQ1iYx4JDljO"
      // );

      HandleTransfer();
      Notify();
    }
  };

  //*To prevent user inputting past dates
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  if (!isAccepted) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="overflow-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[50%] rounded-3xl  py-6 px-5 md:px-14 shadow-2xl">
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Select Schedule of Interview
        </label>
        <div className="grid grid-cols-1 w-[50%] md:grid-cols-2 md:w-[30%]">
          <button
            onClick={() => InfoEmail()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Send to Email
          </button>
          <button
            onClick={isReject}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>

        <div className=" grid grid-cols-1 justify-center gap-3">
          {/* email  */}
          <label className="flex font-bold text-[25px]">Email</label>
          <input
            type="text"
            value={email1}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {/* date  */}
          <label className="flex font-semibold text-[20px]">
            Select date and Time
          </label>
          <div className="">
            <input
              className="pl-5 pr-3 py-2 md:w-[30%] lg:w-[35%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              min={disablePastDate()}
            ></input>
            <input
              className="ml-3 pl-5 pr-3 py-2 md:w-[30%] lg:w-[35%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              type="time"
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>
          {/* location  */}
          <label className="flex font-bold text-[20px]">
            Interview Address
          </label>
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
    </div>
  );
};

export default ModalAccept;

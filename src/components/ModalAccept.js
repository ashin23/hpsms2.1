import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import moment from "moment/moment";
import supabase from "./supabaseClient";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import "ldrs/ring";
import { lineSpinner } from "ldrs";

const ModalAccept = ({ info, showAccept, setShowAccept, srcIMG, close }) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState(
    "3203 Robinsons Equitable Tower, ADB Ave Cor. Poveda St., Ortigas Center, Pasig City., Pasig, Philippines"
  );

  const [email1, setEmail] = useState(info.Email);

  const [name, setName] = useState(info.FullName);

  const [company1, setCompany] = useState("Hotel Pro Services INC.");
  const [message1, setMessage] = useState("");

  var date1 = moment(date).format("yyyy-M-D");
  const currentDate = new Date().toDateString();
  var time1 = moment(new Date(`2000-01-01T${time}`)).format("LT");
  const [disable, setdisable] = useState(false);

  
  const InfoEmail = async () => {
    setdisable(true);
    if (!date || !location || !time || !email1) {
      toast.warning(
        `${
          (!date && !time && !location && "Please fill up the blanks") ||
          (!date && "Please fill the date") ||
          (!location && "Location is required") ||
          (!time && "Please select time")
        }`,
        {
          position: "top-center mt-20",
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
    // emailjs.send(
    //   "service_yj6ye3j",
    //   "template_v7ln2cg",
    //   {
    //     from_name: info.Name,
    //     message: message1,
    //     emailsend: email1,
    //     location: location,
    //     date: date1,
    //     time: time1,
    //   },
    //   "-qtQXoQ1iYx4JDljO"
    // );
    
    await supabase.from("Queuing_List").insert({
      // id: info.id,
      uuid: info.uuid,
      created_at: date1,
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
      Hotel: info.Hotel,
      action: "Interview, Please check your email",
    });
    toast.success("Moved to queuing list", {
      autoClose: 1500,
    });
    setdisable(false);
    delete1();
  };

  const delete1 = async () => {
    const { data: que } = await supabase
      .from("Applicant_List")
      .delete()
      .eq("uuid", info.uuid);
    setShowAccept();
    close();
  };

  //*To prevent user inputting past dates
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  if (!showAccept) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div className="overflow-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[50%] rounded-3xl  py-6 px-5 md:px-14 shadow-2xl">
        <div className="h-fit   bg-white top-0 w-[100%]">
          <label
            className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3  md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-semibold whitespace-nowrap bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            Select Schedule of Interview
          </label>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 justify-center gap-3  mt-8 ">
          <div>
            <div className=" items-center ml-10  w-full">
              <img
                src={srcIMG}
                className=" w-[200px]   -mt-8 md:mt-0 shadow-md shadow-black rounded-full"
              ></img>
            </div>
            <div className=" ml-2 gap-2 font-base">
              <div className="flex  ">
                Full Name: <p className="font-thin pl-1 pr-1">{info.Name} </p>(
                <em className="flex font-base">{info.Sex}</em>)
              </div>
              <div className="flex ">
                Email: <p className="font-thin pl-1 ">{info.Email}</p>
              </div>
              <div className="flex ">
                Age: <p className="font-thin pl-1">{info.Age}</p>
              </div>
              <div className="flex ">
                Mobile Number:{" "}
                <p className="font-thin pl-1">{info.Mobile_No}</p>
              </div>
              <div className="flex ">
                City Address:{" "}
                <p className="font-thin pl-1">{info.City_Address}</p>
              </div>
            </div>
          </div>

          <div className="">
            {/* email  */}
            <div>
              <label className="flex font-semibold text-xl">Email</label>
              <input
                className="w-[100%]"
                type="text"
                value={email1}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            {/* date  */}
            <div className="mt-4">
              {" "}
              <label className="flex font-semibold text-xl">
                Select Date and Time
              </label>
              <div className="flex mt-2">
                <input
                  className=" px-8  py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  min={disablePastDate()}
                ></input>
                <input
                  className="ml-3 px-8  py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                ></input>
              </div>
            </div>

            {/* location  */}
            <div className="mt-4">
              <label className="flex font-semibold text-xl">
                Interview Address
              </label>
              <input
                value={location}
                className="pl-2 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
            </div>

            {/* company  */}
            <div className="mt-4">
              <input
                type="text"
                value={company1}
                onChange={(e) => setCompany(e.target.value)}
              ></input>
            </div>

            {/* message  */}
            <textarea
              className="mt-4 w-full order-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              rows={10}
              type="text"
              value={message1}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Additional Message"
            ></textarea>
            <div className="flex justify-end w-full mt-1 ">
              <button
              disabled={disable}
                onClick={() => InfoEmail()}
                className={`${
                  !disable
                    ? " bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    : "bg-gray-500"
                } focus:outline-none whitespace-nowrap text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 `}
              >
                {disable ? (
                <l-line-spinner
                  size="20"
                  stroke="3"
                  speed="1"
                  color="black"
                ></l-line-spinner>
              ) : (
                "Send to Email"
              )}
              </button>
              <button
              disabled={disable}
                onClick={() => setShowAccept(false)}
                className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAccept;

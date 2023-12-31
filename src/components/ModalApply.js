import React, { useState } from "react";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "ldrs/ring";
import { lineSpinner } from "ldrs";
const ModalApply = ({ isVisible, onClose, Position, Data, Hotel, checker }) => {
  const currentDate = new Date().toDateString();
  const [disable, setdisable] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
    if (Data);
  }, []);

  const handleSubmit = async () => {
    setdisable(true);
    const { data: app } = await supabase.from("Applicant_List").select();
    for (let index = 0; index < app.length; index++) {
      if (
        app[index].uuid === Data.uuid &&
        app[index].Hotel === Hotel &&
        app[index].Position === Position
      ) {
        const { data: update } = await supabase
          .from("Applicant_List")
          .update({
            uuid: Data.uuid,
            created_at: currentDate,
            Email: Data.Email,
            Password: Data.Password,
            Name: Data.Name,
            Mobile_No: Data.Mobile_No,
            Age: Data.Age,
            City_Address: Data.City_Address,
            Religion: Data.Religion,
            Sex: Data.Sex,
            Provincial_Address: Data.Provincial_Address,
            Date_of_Birth: Data.Date_of_Birth,
            CivilStatus: Data.CivilStatus,
            Name_of_Mother: Data.Name_of_Mother,
            Occupation_Mother: Data.Occupation_Mother,
            Name_of_Father: Data.Name_of_Father,
            Occupation_Father: Data.Occupation_Father,
            Notify_Emergency: Data.Notify_Emergency,
            Relationship: Data.Relationship,
            Emergency_Address: Data.Emergency_Address,
            Contact_Number: Data.Contact_Number,
            College: Data.College,
            College_Graduated: Data.College_Graduated,
            Course: Data.Course,
            Special_Course: Data.Special_Course,
            Vocational: Data.Vocational,
            Vocational_Graduated: Data.Vocational_Graduated,
            HighSchool: Data.HighSchool,
            HighSchool_Graduated: Data.HighSchool_Graduated,
            Elementary: Data.Elementary,
            Elementary_Graduated: Data.Elementary_Graduated,
            Inclusive_Dates: Data.Inclusive_Dates,
            Company_History: Data.Company_History,
            Position_History: Data.Position_History,
            Name_References: Data.Name_References,
            Company_References: Data.Company_References,
            Position_References: Data.Position_References,
            SSS_Number: Data.SSS_Number,
            Phil_Health_No: Data.Phil_Health_No,
            Pag_Ibig_No: Data.Pag_Ibig_No,
            Tin_Number: Data.Tin_Number,
            Position: Position,
            status: "applicant",
            Notifications: "false",
            Hotel: Hotel,
            action: "Pending",
          })
          .match({ uuid: Data.uuid, Hotel: Hotel, Position: Position });
        toast.success("Your Application has been submitted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setdisable(false);
        onClose();
        return;
      }
    }
    const { data: profile12 } = await supabase.from("Applicant_List").insert({
      uuid: Data.uuid,
      created_at: currentDate,
      Email: Data.Email,
      Password: Data.Password,
      Name: Data.Name,
      Mobile_No: Data.Mobile_No,
      Age: Data.Age,
      City_Address: Data.City_Address,
      Religion: Data.Religion,
      Sex: Data.Sex,
      Provincial_Address: Data.Provincial_Address,
      Date_of_Birth: Data.Date_of_Birth,
      CivilStatus: Data.CivilStatus,
      Name_of_Mother: Data.Name_of_Mother,
      Occupation_Mother: Data.Occupation_Mother,
      Name_of_Father: Data.Name_of_Father,
      Occupation_Father: Data.Occupation_Father,
      Notify_Emergency: Data.Notify_Emergency,
      Relationship: Data.Relationship,
      Emergency_Address: Data.Emergency_Address,
      Contact_Number: Data.Contact_Number,
      College: Data.College,
      College_Graduated: Data.College_Graduated,
      Course: Data.Course,
      Special_Course: Data.Special_Course,
      Vocational: Data.Vocational,
      Vocational_Graduated: Data.Vocational_Graduated,
      HighSchool: Data.HighSchool,
      HighSchool_Graduated: Data.HighSchool_Graduated,
      Elementary: Data.Elementary,
      Elementary_Graduated: Data.Elementary_Graduated,
      Inclusive_Dates: Data.Inclusive_Dates,
      Company_History: Data.Company_History,
      Position_History: Data.Position_History,
      Name_References: Data.Name_References,
      Company_References: Data.Company_References,
      Position_References: Data.Position_References,
      SSS_Number: Data.SSS_Number,
      Phil_Health_No: Data.Phil_Health_No,
      Pag_Ibig_No: Data.Pag_Ibig_No,
      Tin_Number: Data.Tin_Number,
      Position: Position,
      status: "applicant",
      Notifications: "false",
      Hotel: Hotel,
      action: "Pending",
    });

    toast.success("Submitted succesfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    toast.info("Please check your email for interview", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setdisable(false);
    onClose();
  };

  if (!isVisible) return null;
  return (
    <div
      className=" fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm
      justify-center items-center flex  "
    >
      <div
        data-aos="zoom-in"
        data-aos-duration="200"
        className="  bg-white  md:h-[25%]  md:w-fit flex-col flex  rounded-3xl p-3 shadow-2xl item-center justify-center"
      >
        <div className="mt-2  ">
          <label className="text-[20px] font-semibold ">
            {" "}
            Would you like to submit an application?
          </label>
        </div>
        <div className="grid grid-cols-2 md:mt-6  gap-5  ">
          <button
            disabled={disable}
            onClick={() => handleSubmit()}
            className={`${
              !disable
                ? "bg-blue-700   hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 focus:ring-blue-300 "
                : "bg-gray-500"
            }text-white  focus:ring-4  font-medium   rounded-lg text-sm px-2 py-2 mr-2 mb-2`}
          >
            {disable ? (
              <l-line-spinner
                size="20"
                stroke="3"
                speed="1"
                color="black"
              ></l-line-spinner>
            ) : (
              "Submit"
            )}
          </button>
          <button
            disabled={disable}
            onClick={onClose}
            className={`${
              !disable
                ? "bg-gray-700   hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 focus:ring-gray-300 "
                : "bg-gray-500"
            }text-white  focus:ring-4  font-medium   rounded-lg text-sm px-2 py-2 mr-2 mb-2`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalApply;

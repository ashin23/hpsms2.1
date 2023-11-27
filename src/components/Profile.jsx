import React from "react";
import supabase from "./supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
import CivilStatus from "./CivilStatus.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fileviewer from "./Fileviewer";

import AOS from "aos";
import "aos/dist/aos.css";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = ({ isProfile, isProfileclose, email2, applicant }) => {
  const [email, setEmail1] = useState("");
  const [allow, setAllow] = useState(false);

  const [name, setName] = useState("");
  const [mobile_No, setMobile_No] = useState("");
  const [age, setAge] = useState("");
  const [city_Address, setCity_Address] = useState("");
  const [religion, setReligion] = useState("");
  const [sex, setSex] = useState("");
  const [provincial_Address, setProvincial_Address] = useState("");
  const [date_of_Birth, setDate_of_Birth] = useState("");
  const [civil_Status, setCivil_Status] = useState("");
  const [name_of_Mother, setName_of_Mother] = useState("");
  const [occupation_Mother, setOccupation_Mother] = useState("");
  const [name_of_Father, setName_of_Father] = useState("");
  const [occupation_Father, setOccupation_Father] = useState("");
  const [notify_Emergency, setNotify_Emergency] = useState("");
  const [relationship, setRelationship] = useState("");
  const [emegency_Address, setEmergency_Address] = useState("");
  const [contact_Number, setContact_Number] = useState("");
  const [college, setCollege] = useState("");
  const [college_Graduated, setCollege_Graduated] = useState("");
  const [course, setCourse] = useState("");
  const [special_Course, setSpecial_Course] = useState("");
  const [vocational, setVocational] = useState("");
  const [vocational_Graduated, setVocational_Graduated] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [highSchool_Graduated, setHighSchool_Graduated] = useState("");
  const [elementary, setElementary] = useState("");
  const [elementary_Graduated, setElementary_Graduated] = useState("");
  const [inclusive_Dates, setInclusive_Dates] = useState("");
  const [company_History, setCompany_History] = useState("");
  const [position_History, setPosition_History] = useState("");
  const [name_References, setName_References] = useState("");
  const [company_References, setCompany_References] = useState("");
  const [position_References, setPosition_References] = useState("");
  const [sSS_Number, setSSS_Number] = useState("");
  const [phil_Health_No, setPhil_Health_No] = useState("");
  const [pag_Ibig_No, setPag_Ibig_No] = useState("");
  const [tin_No, setTin_No] = useState("");

  const [file1, setFile] = useState();
  const nav = useNavigate();

  useEffect(() => {}, [applicant]);


  const getter = async () => {
    setEmail1(email2.Email);
    setName(email2.Name);
    setMobile_No(email2.Mobile_No);
    setAge(email2.Age);
    setCity_Address(email2.City_Address);
    setReligion(email2.Religion);
    setSex(email2.Sex);
    setProvincial_Address(email2.Provincial_Address);
    setDate_of_Birth(email2.Date_of_Birth);
    setCivil_Status(email2.CivilStatus);
    setName_of_Mother(email2.Name_of_Mother);
    setOccupation_Mother(email2.Occupation_Mother);
    setName_of_Father(email2.Name_of_Father);
    setOccupation_Father(email2.Occupation_Father);
    setNotify_Emergency(email2.Notify_Emergency);
    setRelationship(email2.Relationship);
    setEmergency_Address(email2.Emergency_Address);
    setContact_Number(email2.Contact_Number);
    setCollege(email2.College);
    setCollege_Graduated(email2.College_Graduated);
    setCourse(email2.Course);
    setSpecial_Course(email2.Special_Course);
    setVocational(email2.Vocational);
    setVocational_Graduated(email2.Vocational_Graduated);
    setHighSchool(email2.HighSchool);
    setHighSchool_Graduated(email2.HighSchool_Graduated);
    setElementary(email2.Elementary);
    setElementary_Graduated(email2.Elementary_Graduated);
    setInclusive_Dates(email2.Inclusive_Dates);
    setCompany_History(email2.Company_History);
    setPosition_History(email2.Position_History);
    setName_References(email2.Name_References);
    setCompany_References(email2.Company_References);
    setPosition_References(email2.Position_References);
    setSSS_Number(email2.SSS_Number);
    setPhil_Health_No(email2.Phil_Health_No);
    setPag_Ibig_No(email2.Pag_Ibig_No);
    setTin_No(email2.Tin_Number);
     Handlefetchfile(await email2.Email)
  };

  useEffect(() => {
    AOS.init({ duration: 300, easing: "linear" });
    if(email2)getter();
   
  }, [email2]);

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
  };

  

  const Handlefetchfile = async (email2) => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(email2 + "/");
    setFile(file);
  };

  function edit() {
    document.getElementById("name1").disabled = false;
    document.getElementById("age1").disabled = false;
    document.getElementById("city_address").disabled = false;
    document.getElementById("provincial_address").disabled = false;
    document.getElementById("mobile_no").disabled = false;
    document.getElementById("religion1").disabled = false;
    document.getElementById("date_of_birth").disabled = false;
    document.getElementById("civil_status").disabled = false;
    document.getElementById("sex1").disabled = false;
    document.getElementById("name_of_mother").disabled = false;
    document.getElementById("occupation_mother").disabled = false;
    document.getElementById("name_of_father").disabled = false;
    document.getElementById("occupation_father").disabled = false;
    document.getElementById("notify_emergency").disabled = false;
    document.getElementById("relationship1").disabled = false;
    document.getElementById("emergency_address").disabled = false;
    document.getElementById("contact_number").disabled = false;
    document.getElementById("college1").disabled = false;
    document.getElementById("college_graduated").disabled = false;
    document.getElementById("course1").disabled = false;
    document.getElementById("special_course").disabled = false;
    document.getElementById("vocational1").disabled = false;
    document.getElementById("vocational_graduated").disabled = false;
    document.getElementById("highschool").disabled = false;
    document.getElementById("highschool_graduated").disabled = false;
    document.getElementById("elementary1").disabled = false;
    document.getElementById("elementary_graduated").disabled = false;
    document.getElementById("inclusive_dates").disabled = false;
    document.getElementById("company_history").disabled = false;
    document.getElementById("position_history").disabled = false;
    document.getElementById("name_references").disabled = false;
    document.getElementById("company_references").disabled = false;
    document.getElementById("position_references").disabled = false;
    document.getElementById("sss_number").disabled = false;
    document.getElementById("phil_health_no").disabled = false;
    document.getElementById("pag_ibig_no").disabled = false;
    document.getElementById("tin_no").disabled = false;
    setAllow(true);
  }

  function close() {
    isProfileclose();
    setAllow(false);
  }

  async function save() {
    const { data: NewUserupdate } = await supabase
      .from("NewUser")
      .update({
        Name: name,
        Mobile_No: mobile_No,
        Age: age,
        City_Address: city_Address,
        Religion: religion,
        Sex: sex,
        Provincial_Address: provincial_Address,
        Date_of_Birth: date_of_Birth,
        CivilStatus: civil_Status,
        Name_of_Mother: name_of_Mother,
        Occupation_Mother: occupation_Mother,
        Name_of_Father: name_of_Father,
        Occupation_Father: occupation_Father,
        Notify_Emergency: notify_Emergency,
        Relationship: relationship,
        Emergency_Address: emegency_Address,
        Contact_Number: contact_Number,
        College: college,
        College_Graduated: college_Graduated,
        Course: course,
        Special_Course: special_Course,
        Vocational: vocational,
        Vocational_Graduated: vocational_Graduated,
        HighSchool: highSchool,
        HighSchool_Graduated: highSchool_Graduated,
        Elementary: elementary,
        Elementary_Graduated: elementary_Graduated,
        Inclusive_Dates: inclusive_Dates,
        Company_History: company_History,
        Position_History: position_History,
        Name_References: name_References,
        Company_References: company_References,
        Position_References: position_References,
        SSS_Number: sSS_Number,
        Phil_Health_No: phil_Health_No,
        Pag_Ibig_No: pag_Ibig_No,
        Tin_Number: tin_No,
      })
      .eq("Email", email)
      .single();

    Notify();
    setAllow(false);
  }

  if (!isProfile) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex "
    >
      <div
        data-aos="zoom-in"
        className="overflow-y-scroll bg-white h-[70%]  w-[80%] md:h-[70%] md:w-[80%] rounded-3xl  pb-6 px-5 md:px-14 shadow-2xl "
      >
        <div className="sticky top-0 bg-white w-full h-[13%] p-5">
          <div className="flex justify-end   ">
            <button
              onClick={close}
              className="-mr-7 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Close
            </button>
          </div>
        </div>
        <label
          className="
        flex 
        md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Profile
        </label>
        <div className="flex grid-cols-2 md:gap-15 ">
          <button
            onClick={() => edit()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => save()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Save
          </button>
        </div>
        <div className="">
          Photo
          {file1 && (
            <div className="">
              {file1.map((file1) => (
                <Fileviewer key={file1.id} file1={file1} Email={email2} />
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 lg:gap-10 gap-4 gap-y-9 mb-3 p-2 ">
          <div>
            <label className="flex font-bold">Name</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%]  lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="name"
              value={name}
              disabled="true"
              id="name1"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label className="flex font-bold">City Address</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="City Address"
              disabled="true"
              id="city_address"
              value={city_Address}
              onChange={(e) => setCity_Address(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Provincial Address</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Provincial Address"
              disabled="true"
              id="provincial_address"
              value={provincial_Address}
              onChange={(e) => setProvincial_Address(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Mobile No.</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Mobile Number"
              disabled="true"
              id="mobile_no"
              value={mobile_No}
              onChange={(e) => setMobile_No(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Religion</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              disabled="true"
              id="religion1"
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Date of Birth</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Date of Birth"
              value={date_of_Birth}
              onChange={(e) => setDate_of_Birth(e.target.value)}
              type="date"
              disabled="true"
              id="date_of_birth"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Age</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled="true"
              id="age1"
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Sex</label>
            <input
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Sex"
              disabled="true"
              id="sex1"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Civil Status</label>
            <select
              value={civil_Status}
              disabled="true"
              id="civil_status"
              onChange={(e) => setCivil_Status(e.target.value)}
              className="pl-4 pr-3 py-2 w-[20%] lg:w-[80%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            >
              {CivilStatus.map((civilstatus) => (
                <option key={civilstatus.id}> {civilstatus.Civilstatus}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-bold">Name of Mother</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Name of Mother"
            disabled="true"
            id="name_of_mother"
            value={name_of_Mother}
            onChange={(e) => setName_of_Mother(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Occupation</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Occupation"
            value={occupation_Mother}
            onChange={(e) => setOccupation_Mother(e.target.value)}
            type="text"
            disabled="true"
            id="occupation_mother"
          ></input>
          <label className="flex font-bold">Name of Father</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Occupation"
            value={name_of_Father}
            onChange={(e) => setName_of_Father(e.target.value)}
            disabled="true"
            id="name_of_father"
            type="text"
          ></input>
          <label className="flex font-bold">Occupation</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Name of Father"
            value={occupation_Father}
            onChange={(e) => setOccupation_Father(e.target.value)}
            type="text"
            disabled="true"
            id="occupation_father"
          ></input>
          <label className="flex font-bold">
            Person to Notify Incase of Emergency
          </label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Notify"
            disabled="true"
            id="notify_emergency"
            value={notify_Emergency}
            onChange={(e) => setNotify_Emergency(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Relationship</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Relationship"
            value={relationship}
            disabled="true"
            onChange={(e) => setRelationship(e.target.value)}
            id="relationship1"
            type="text"
          ></input>
          <label className="flex font-bold">His/her Address</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Address"
            value={emegency_Address}
            disabled="true"
            onChange={(e) => setEmergency_Address(e.target.value)}
            id="emergency_address"
            type="text"
          ></input>
          <label className="flex font-bold">Contact No:</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Number"
            disabled="true"
            value={contact_Number}
            onChange={(e) => setContact_Number(e.target.value)}
            type="text"
            id="contact_number"
          ></input>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          EDUCATIONAL BACKGROUND
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-bold">College</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            disabled="true"
            id="college1"
            type="text"
          ></input>
          <label className="flex font-bold">Year Graduated</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Year Graduated"
            value={college_Graduated}
            onChange={(e) => setCollege_Graduated(e.target.value)}
            id="college_graduated"
            disabled="true"
            type="text"
          ></input>
          <label className="flex font-bold">Course</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            disabled="true"
            id="course1"
            type="text"
          ></input>
          <label className="flex font-bold">Special Course & Training</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Course & Training"
            disabled="true"
            id="special_course"
            value={special_Course}
            onChange={(e) => setSpecial_Course(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Vocational</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Year Graduated"
            value={vocational}
            onChange={(e) => setVocational(e.target.value)}
            disabled="true"
            id="vocational1"
            type="text"
          ></input>
          <label className="flex font-bold">Year Graduated</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Year Graduated"
            disabled="true"
            id="vocational_graduated"
            value={vocational_Graduated}
            onChange={(e) => setVocational_Graduated(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">High School</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="High School"
            disabled="true"
            id="highschool"
            onChange={(e) => setHighSchool(e.target.value)}
            value={highSchool}
            type="text"
          ></input>
          <label className="flex font-bold">Year Graduated</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Year Graduated"
            id="highschool_graduated"
            disabled="true"
            onChange={(e) => setHighSchool_Graduated(e.target.value)}
            value={highSchool_Graduated}
            type="text"
          ></input>
          <label className="flex font-bold">Elementary School</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Elementary School"
            value={elementary}
            onChange={(e) => setElementary(e.target.value)}
            disabled="true"
            id="elementary1"
            type="text"
          ></input>
          <label className="flex font-bold">Year Graduated</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Year Graduated"
            disabled="true"
            id="elementary_graduated"
            value={elementary_Graduated}
            onChange={(e) => setElementary_Graduated(e.target.value)}
            type="text"
          ></input>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          EMPLOYMENT HISTORY
        </label>
        <label className="flex ml-10 text-[15px] ">
          (from recent to backwards)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2">
          <div>
            <label className="flex font-bold md:ml-[30%]">
              Inclusive Dates
            </label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              disabled="true"
              id="inclusive_dates"
              value={inclusive_Dates}
              onChange={(e) => setInclusive_Dates(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="flex font-bold md:ml-[30%]">
              Company/Employer
            </label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              disabled="true"
              id="company_history"
              value={company_History}
              onChange={(e) => setCompany_History(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="flex font-bold md:ml-[30%]">Position</label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              disabled="true"
              id="position_history"
              onChange={(e) => setPosition_History(e.target.value)}
              value={position_History}
            ></textarea>
          </div>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          CHARACTER REFERENCES
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2">
          <div>
            <label className="flex font-bold  md:ml-[30%]">Names</label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              value={name_References}
              onChange={(e) => setName_References(e.target.value)}
              disabled="true"
              id="name_references"
            ></textarea>
          </div>
          <div>
            <label className="flex font-bold  md:ml-[30%]">
              Company/Employer
            </label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              disabled="true"
              id="company_references"
              onChange={(e) => setCompany_References(e.target.value)}
              value={company_References}
            ></textarea>
          </div>
          <div>
            <label className="flex font-bold  md:ml-[30%]">Position</label>
            <textarea
              className={`${
                allow ? "bg-blue-200 " : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              type="text"
              disabled="true"
              id="position_references"
              value={position_References}
              onChange={(e) => setPosition_References(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-bold">SSS No:</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 md:w-[20%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="SSS Number"
            value={sSS_Number}
            onChange={(e) => setSSS_Number(e.target.value)}
            type="text"
            id="sss_number"
            disabled="true"
          ></input>
          <label className="flex font-bold">Phil Health No:</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 md:w-[20%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Phil Heatlh Number"
            value={phil_Health_No}
            onChange={(e) => setPhil_Health_No(e.target.value)}
            type="text"
            disabled="true"
            id="phil_health_no"
          ></input>
          <label className="flex font-bold">Pag-IBIG No:</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 md:w-[20%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Pag-IBIG Number"
            onChange={(e) => setPag_Ibig_No(e.target.value)}
            value={pag_Ibig_No}
            disabled="true"
            id="pag_ibig_no"
            type="text"
          ></input>
          <label className="flex font-bold">Tin No:</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 md:w-[20%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Tin Number"
            value={tin_No}
            onChange={(e) => setTin_No(e.target.value)}
            disabled="true"
            id="tin_no"
            type="text"
          ></input>
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

export default Profile;

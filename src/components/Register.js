import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "./supabaseClient";
import CivilStatus from "./CivilStatus.json";
import { v4 as uuidv4 } from "uuid";

const Register = ({ isRegister, isRegisterClose }) => {
  const [email, setEmail] = useState("");

  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState(true);
  const [verCode, setVerCode] = useState();

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

  const [files, setFiles] = useState("");
  const Notify = () => {
    toast.success("Account create succesfully!", {
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
      isRegisterClose();
    }, [2000]);
  };

  const NotifyCode = () => {
    toast.success("Correct code", {
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
  const VeriCode = () => {
    toast.success("Code sent succesfully", {
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
  const NotifyError = () => {
    toast.error("Incorrect Code", {
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

  const NotifyError1 = () => {
    toast.error("Incorrect Password", {
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

  useEffect(() => {
    codeGenerator();
  }, []);

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
  }

  const HandleSendCode = () => {
    if (!email) {
      NotifyError2();
      return;
    }
    // emailjs.send(
    //   "service_yj6ye3j",
    //   "template_aek4udy",
    //   {
    //     email: email,
    //     code: otpCode,
    //   },
    //   "-qtQXoQ1iYx4JDljO"
    // );
    // VeriCode();
  };

  function HandleCheckCode() {
    if (verCode === otpCode) {
      setCodeStatus(false);
      NotifyCode();
      return;
    } else {
      NotifyError();
    }
  }

  const HandleCreate = async () => {
    if (
      !email ||
      !password ||
      !name ||
      !mobile_No ||
      !age ||
      !city_Address ||
      !religion ||
      !sex ||
      !provincial_Address ||
      !date_of_Birth ||
      !civil_Status ||
      !name_of_Mother ||
      !occupation_Mother ||
      !name_of_Father ||
      !occupation_Father ||
      !notify_Emergency ||
      !relationship ||
      !emegency_Address ||
      !contact_Number ||
      !college ||
      !college_Graduated ||
      !course ||
      !college_Graduated ||
      !special_Course ||
      !vocational ||
      !vocational_Graduated ||
      !highSchool ||
      !highSchool_Graduated ||
      !elementary ||
      !elementary_Graduated ||
      !inclusive_Dates ||
      !company_History ||
      !position_History ||
      !name_References ||
      !company_References ||
      !position_References ||
      !sSS_Number ||
      !phil_Health_No ||
      !pag_Ibig_No ||
      !tin_No ||
      !files
    ) {
      NotifyError2();
      return;
    } else {
      if (password2 === password) {
        const { data, error } = await supabase.from("NewUser").insert([
          {
            Email: email,
            Password: password,
            userlvl: "applicant",
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
          },
        ]);
        const { data1, error1 } = await supabase.storage
          .from("Files")
          .upload(email + "/" + uuidv4(), files);

        Notify();
      } else if (password !== password2) {
        NotifyError1();
        return;
      }
    }
  };

  if (!isRegister) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex "
    >
      <div className="overflow-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[80%] rounded-3xl  py-6 px-5 md:px-14 shadow-2xl">
        <div className="">
          <label
            className="flex
          md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            REGISTER
          </label>
          <div className="flex grid-cols-2 md:gap-5 md:w-[100%] w-[100%]">
            <button
              onClick={() => isRegisterClose()}
              className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel
            </button>
            <button
              onClick={() => HandleCreate()}
              className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-10 gap-4 gap-y-9 mb-3 p-2">
            <label className="font-bold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Email"
              type="text"
            ></input>
            <label className="font-bold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Password"
              type="text"
            ></input>
            <label className="flex font-bold">Confirm Password</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Confirm Password"
              type="text"
            ></input>
            <label className="flex font-bold">Verification Code</label>
            <input
              className="m pl-10 pr-3 py-2  w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Verification Code"
              value={verCode}
              onChange={(e) => setVerCode(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="flex justify-center space-x-6 p-2 w-full">
            <button
              onClick={() => HandleSendCode()}
              className=" px-10 py-2 w-fit text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
            >
              Send Code
            </button>
            <button
              onClick={() => HandleCheckCode()}
              className="px-10 py-2 w-fit text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
            >
              Check Code
            </button>
          </div>
          <label
            className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            PROFILE
          </label>
          <div className="grid grid-cols-1  md:grid-cols-6 gap-4 lg:gap-10 gap-y-9 mb-3 p-2">
            <label className="flex font-bold">Name</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">City Address</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="City Address"
              onChange={(e) => setCity_Address(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Provincial Address</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Provincial Address"
              onChange={(e) => setProvincial_Address(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Mobile No.</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Mobile Number"
              onChange={(e) => setMobile_No(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Religion</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Religion"
              onChange={(e) => setReligion(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Date of Birth</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Date of Birth"
              onChange={(e) => setDate_of_Birth(e.target.value)}
              type="date"
            ></input>
            <label className="flex font-bold">Age</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Sex</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Sex"
              onChange={(e) => setSex(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Civil Status</label>
            <select
              onChange={(e) => setCivil_Status(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] lg:w-[120%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            >
              {CivilStatus.map((civilstatus) => (
                <option key={civilstatus.id}> {civilstatus.Civilstatus}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2">
            <label className="flex font-bold">Name of Mother</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Name of Mother"
              onChange={(e) => setName_of_Mother(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Occupation</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Occupation"
              onChange={(e) => setOccupation_Mother(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Name of Father</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Occupation"
              onChange={(e) => setName_of_Father(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Occupation</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Name of Father"
              onChange={(e) => setOccupation_Father(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">
              Person to Notify Incase of Emergency
            </label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Notify"
              onChange={(e) => setNotify_Emergency(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Relationship</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Relationship"
              onChange={(e) => setRelationship(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">His/her Address</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Address"
              onChange={(e) => setEmergency_Address(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Contact No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Number"
              onChange={(e) => setContact_Number(e.target.value)}
              type="text"
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
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="College"
              onChange={(e) => setCollege(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Year Graduated</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Year Graduated"
              onChange={(e) => setCollege_Graduated(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Course</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Course"
              onChange={(e) => setCourse(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Special Course & Training</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Course & Training"
              onChange={(e) => setSpecial_Course(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Vocational</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Year Graduated"
              onChange={(e) => setVocational(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Year Graduated</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Year Graduated"
              onChange={(e) => setVocational_Graduated(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">High School</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="High School"
              onChange={(e) => setHighSchool(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Year Graduated</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Year Graduated"
              onChange={(e) => setHighSchool_Graduated(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Elementary School</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Elementary School"
              onChange={(e) => setElementary(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Year Graduated</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Year Graduated"
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
              <label className="flex justify-center  font-bold md:ml-[30%]">Inclusive Dates</label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setInclusive_Dates(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center font-bold md:ml-[30%]">
                Company/Employer
              </label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setCompany_History(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center font-bold md:ml-[30%]">Position</label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setPosition_History(e.target.value)}
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

          <div className="grid grid-cols-1  md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2">
            <div className="">
              <label className="flex justify-center lg:mr-[10%] font-bold md:ml-[30%]">
                Names
              </label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setName_References(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center lg:mr-[10%] font-bold md:ml-[30%]">
                Company/Employer
              </label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setCompany_References(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center lg:mr-[10%] font-bold md:ml-[30%]">
                Position
              </label>
              <textarea
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setPosition_References(e.target.value)}
              ></textarea>
            </div>
          </div>
          <label className="flex font-bold ">Upload Image</label>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="multiple_files"
          >
            Upload Image
          </label>
          <input
            className="block w-[250px] px-5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400"
            id="multiple_files"
            type="file"
            onChange={(e) => setFiles(e.target.value)}
            accept="image/png, image/jpeg"
          ></input>
          <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
            <label className="flex font-bold">SSS No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="SSS Number"
              onChange={(e) => setSSS_Number(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Phil Health No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Phil Heatlh Number"
              onChange={(e) => setPhil_Health_No(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Pag-IBIG No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Pag-IBIG Number"
              onChange={(e) => setPag_Ibig_No(e.target.value)}
              type="text"
            ></input>
            <label className="flex font-bold">Tin No:</label>
            <input
              className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Tin Number"
              onChange={(e) => setTin_No(e.target.value)}
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
    </div>
  );
};

export default Register;

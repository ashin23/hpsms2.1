import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "./supabaseClient";
import CivilStatus from "./CivilStatus.json";
import { v4 as uuidv4 } from "uuid";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Gender from "./Gender.json";
import AOS from "aos";
import "aos/dist/aos.css";
import Termsandcondition from "./Termsandcondition";
const Register = ({ isRegister, isRegisterClose }) => {
  const [showTerms, setTerms] = useState(false);
  const [otpCode, setCode] = useState("");
  const [files, setFiles] = useState([]);

  const [view, setView] = useState(false);
  const [view1, setView1] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);
  //code generator
  useEffect(() => {
    codeGenerator();
  }, []);

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
  }
  function HandleSendCode(e) {
    e.preventDefault();
    if (!formdata.email) {
      toast.warning("Email is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    emailjs.send(
      "service_yj6ye3j",
      "template_aek4udy",
      {
        email2: formdata.email,
        code: otpCode,
      },
      "-qtQXoQ1iYx4JDljO"
    );
    toast.success("Code sent succesfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(otpCode);
  }

  const HandleCreate = async (e) => {
    e.preventDefault();

    const { data: applist } = await supabase.from("NewUser").select();
    const { data: user } = await supabase.from("UserList").select();
    const { data: emp } = await supabase.from("Employee_List").select();
    var data = applist.concat(user, emp);
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if (
          data[index].Email === formdata.email &&
          data[index].userlvl === "Restricted"
        ) {
          toast.error("Email is deactivated", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (
          data[index].Email === formdata.email &&
          data[index].userlvl !== "Restricted"
        ) {
          toast.error("Email already exist", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
      }
    }
    if (formdata.password !== formdata.password2) {
      toast.error("Incorrect Password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (formdata.verCode !== otpCode) {
      toast.error("Incorrect Code", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (
      formdata.password2 === formdata.password &&
      formdata.verCode === otpCode
    ) {
      const { data, error } = await supabase.from("NewUser").insert([
        {
          Email: formdata.email,
          Password: formdata.password,
          userlvl: "applicant",
          Name: formdata.name,
          Mobile_No: formdata.mobile_No,
          Age: formdata.age,
          City_Address: formdata.city_Address,
          Religion: formdata.religion,
          Sex: formdata.sex,
          Provincial_Address: formdata.provincial_Address,
          Date_of_Birth: formdata.date_of_Birth,
          CivilStatus: formdata.civil_Status,
          Name_of_Mother: formdata.name_of_Mother,
          Occupation_Mother: formdata.occupation_Mother,
          Name_of_Father: formdata.name_of_Father,
          Occupation_Father: formdata.occupation_Father,
          Notify_Emergency: formdata.notify_Emergency,
          Relationship: formdata.relationship,
          Emergency_Address: formdata.emegency_Address,
          Contact_Number: formdata.contact_Number,
          College: formdata.college,
          College_Graduated: formdata.college_Graduated,
          Course: formdata.course,
          Special_Course: formdata.special_Course,
          Vocational: formdata.vocational,
          Vocational_Graduated: formdata.vocational_Graduated,
          HighSchool: formdata.highSchool,
          HighSchool_Graduated: formdata.highSchool_Graduated,
          Elementary: formdata.elementary,
          Elementary_Graduated: formdata.elementary_Graduated,
          Inclusive_Dates: formdata.inclusive_Dates,
          Company_History: formdata.company_History,
          Position_History: formdata.position_History,
          Name_References: formdata.name_References,
          Company_References: formdata.company_References,
          Position_References: formdata.position_References,
          SSS_Number: formdata.sSS_Number,
          Phil_Health_No: formdata.phil_Health_No,
          Pag_Ibig_No: formdata.pag_Ibig_No,
          Tin_Number: formdata.tin_No,
          uuid: uuidv4(),
        },
      ]);
      const { data1, error1 } = await supabase.storage
        .from("Files")
        .upload(formdata.email + "/" + uuidv4(), files, {
          contentType: "image/jpg , image/png",
        });

      toast.success("Account create succesfully!", {
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
        isRegisterClose();
      }, [3000]);
    }
  };

  const [formdata, setformdata] = useState({
    email: "",
    name: "",
    mobile_No: "",
    age: "",
    password2: "",
    password: "",
    city_Address: "",
    religion: "",
    sex: "",
    provincial_Address: "",
    date_of_Birth: "",
    civil_Status: "",
    name_of_Mother: "",
    occupation_Mother: "",
    name_of_Father: "",
    occupation_Father: "",
    notify_Emergency: "",
    relationship: "",
    emegency_Address: "",
    contact_Number: "",
    college: "",
    college_Graduated: "",
    course: "",
    special_Course: "",
    vocational: "",
    vocational_Graduated: "",
    highSchool: "",
    highSchool_Graduated: "",
    elementary: "",
    elementary_Graduated: "",
    inclusive_Dates: "",
    company_History: "",
    position_History: "",
    name_References: "",
    company_References: "",
    position_References: "",
    sSS_Number: "",
    phil_Health_No: "",
    tin_No: "",
  });

  //*Onchange event
  function handleChange(event) {
    setformdata((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //close
  function close(e) {
    e.preventDefault();
    isRegisterClose();
  }
  function openterms(e) {
    e.preventDefault();
    setTerms(true);
  }
  if (!isRegister) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex "
    >
      <form
        onSubmit={HandleCreate}
        className="overflow-y-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[80%] rounded-3xl  pb-6 px-5 md:px-14 shadow-2xl"
      >
        <div className="sticky top-0 bg-white  w-full h-[40%] md:h-[13%] p-5">
          <div className="md:flex md:justify-between  grid grid-cols-1  ">
            <button
              type="submit"
              className="text-white md:ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <label className="md:-ml-7 font-semibold text-xl">
              Type N.A. if the data is not available.
            </label>
            <button
              onClick={close}
              className="md:-mr-7  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Close
            </button>
          </div>
        </div>

        <div className="">
          <label
            className="flex
          md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            REGISTER
          </label>
          {/* Button */}

          {/* Email  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-4 gap-y-9 mb-3 p-2">
            <div>
              <label className="font-bold">Email</label>
              <input
                name="email"
                onChange={handleChange}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Email"
                required
                type="text"
                // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              ></input>
            </div>
            {/* Verification Code */}
            <div>
              <div className="flex flex-col">
                <label className="flex font-bold">Verification Code</label>
                <div className="flex items-center">
                  <input
                    className="m pl-10 pr-3 py-2  w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                    placeholder="Verification Code"
                    name="verCode"
                    required
                    onChange={handleChange}
                    type="number"
                  ></input>
                  <button
                    onClick={HandleSendCode}
                    className="md:ml-2 ml-2 md:px-5 md:py-2 md:w-[20%] text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
                  >
                    Send Code
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Password */}
          <div className="md:grid-cols-2  md:grid lg:gap-10 gap-4 gap-y-9 mb-3 p-2">
            <div className="flex flex-col md:mb-0 mb-5 ">
              <label className="flex font-bold">Password</label>
              <div className="flex items-center ">
                <input
                  name="password"
                  // value={password}
                  required
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2  w-[100%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  placeholder="Password"
                  type={view ? "text" : "password"}
                ></input>
                <div className=" ml-1" onClick={() => setView(!view)}>
                  {view ? (
                    <AiFillEyeInvisible className="text-[20px]" />
                  ) : (
                    <AiFillEye className="text-[20px]" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex-col flex">
              <label className="flex font-bold">Confirm Password</label>
              <div className="flex items-center ">
                <input
                  // value={password2}
                  name="password2"
                  required
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  placeholder="Confirm Password"
                  type={view1 ? "text" : "password"}
                ></input>
                <div className="ml-1" onClick={() => setView1(!view1)}>
                  {view1 ? (
                    <AiFillEyeInvisible className="text-[20px]" />
                  ) : (
                    <AiFillEye className="text-[20px]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <label
            className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            PROFILE
          </label>
          {/* Profile Info */}
          <div className="grid grid-cols-1  md:grid-cols-3 gap-4 lg:gap-10 gap-y-9  mb-3 p-2">
            <div className="">
              <label className="flex font-bold">Name</label>
              <input
                name="name"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">City Address</label>
              <input
                name="city_Address"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="City Address"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Provincial Address</label>
              <input
                name="provincial_Address"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Provincial Address"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Mobile No.</label>
              <input
                name="mobile_No"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Mobile Number"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Religion</label>
              <input
                name="religion"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Religion"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Date of Birth</label>
              <input
                name="date_of_Birth"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Date of Birth"
                onChange={handleChange}
                required
                type="date"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Age</label>
              <input
                name="age"
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Age"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Sex</label>
              <select
                required
                name="sex"
                onChange={handleChange}
                className="pl-4 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              >
                {Gender.map((gender) => (
                  <option key={gender.id}> {gender.gender}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex font-bold">Civil Status</label>
              <select
                required
                name="civil_Status"
                onChange={handleChange}
                className="pl-4 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              >
                {CivilStatus.map((civilstatus) => (
                  <option key={civilstatus.id}>
                    {" "}
                    {civilstatus.Civilstatus}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Profile Background */}
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2">
            <div>
              <label className="flex font-bold">Name of Mother</label>
              <input
                name="name_of_Mother"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name of Mother"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Occupation</label>
              <input
                name="occupation_Mother"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Occupation"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Name of Father</label>
              <input
                name="name_of_Father"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Occupation"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Occupation</label>
              <input
                name="occupation_Father"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name of Father"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">
                Person to Notify Incase of Emergency
              </label>
              <input
                name="notify_Emergency"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Notify"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Relationship</label>
              <input
                name="relationship"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Relationship"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">His/her Address</label>
              <input
                name="emegency_Address"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Address"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Contact No:</label>
              <input
                name="contact_Number"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Number"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
          </div>
          <label
            className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            EDUCATIONAL BACKGROUND
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2">
            <div>
              <label className="flex font-bold">College</label>
              <input
                name="college"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="College"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                name="college_Graduated"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Course</label>
              <input
                name="course"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Course"
                required
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">
                Special Course & Training
              </label>
              <input
                name="special_Course"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Course & Training"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Senior HighSchool</label>
              <input
                name="vocational"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={handleChange}
                required
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                required
                name="vocational_Graduated"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">High School</label>
              <input
                name="highSchool"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="High School"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                name="highSchool_Graduated"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Elementary School</label>
              <input
                name="elementary"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Elementary School"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                name="elementary_Graduated"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
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
              <label className="flex justify-center  font-bold md:ml-[30%]">
                Inclusive Dates
              </label>
              <textarea
                name="inclusive_Dates"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center font-bold md:ml-[30%]">
                Company/Employer
              </label>
              <textarea
                name="company_History"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center font-bold md:ml-[30%]">
                Position
              </label>
              <textarea
                name="position_History"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={handleChange}
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
                name="name_References"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center lg:mr-[10%] font-bold md:ml-[30%]">
                Company/Employer
              </label>
              <textarea
                name="company_References"
                required
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center lg:mr-[10%] font-bold md:ml-[30%]">
                Position
              </label>
              <textarea
                name="position_References"
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                required
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <label className="flex font-bold ">Upload Image</label>
          <input
            // value={files}
            className="block w-[250px] px-5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400"
            // id="multiple_files"
            type="file"
            onChange={(e) => setFiles(e.target.files[0])}
            accept="image/png, image/jpeg"
            required
          ></input>
          <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
            <div>
              <label className="flex font-bold">SSS No:</label>
              <input
                name="sSS_Number"
                required
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="SSS Number"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Phil Health No:</label>
              <input
                name="phil_Health_No"
                required
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Phil Heatlh Number"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Pag-IBIG No:</label>
              <input
                name="pag_Ibig_No"
                required
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Pag-IBIG Number"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Tin No:</label>
              <input
                name="tin_No"
                required
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Tin Number"
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className="flex">
              <input name="terms1" required type="checkbox" />
              <button
                className="border-b-2 border-blue-400"
                onClick={openterms}
              >
                Terms and Condition
              </button>
            </div>
          </div>
        </div>
        <Termsandcondition isOpen={showTerms} isClose={() => setTerms(false)} />
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
      </form>
    </div>
  );
};

export default Register;

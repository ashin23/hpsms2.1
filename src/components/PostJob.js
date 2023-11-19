import React, { useRef, useState } from "react";
import position from "./position.json";
import carrerlevel from "./carrerlevel.json";
import Employeexp from "./Employeexp.json";
import Jobtypee from "./Jobtype.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = ({ isPost, isPostClose }) => {
  const [positions, setPositions] = useState("Select Position");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [salary, setSalary] = useState("");
  const [hotel, setHotel] = useState("");
  const [dob, setDob] = useState("");
  const [jobDescrip, setJobDescrip] = useState("");
  const [career, setCareer] = useState("Carrer Level");
  const [experience, setExperience] = useState("Employee Experience");
  const [specializations, setSpecializations] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobtype, setJobType] = useState("Job Type");

  const Postjobnotifyerror = () => {
    toast.warning("Please fill up all the blanks", {
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

  function close() {
    isPostClose();
  }

  const Notify = () => {
    toast.success("Posted Successfully!", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      close();
    },[2000])
    
  };

  const handleStoreData = async () => {
    if (
      positions === "Select Position" ||
      !location ||
      !age ||
      !height ||
      !salary ||
      !hotel ||
      !dob ||
      !jobDescrip ||
      career === "Carrer Level" ||
      experience === "Employee Experience" ||
      !specializations ||
      !qualification ||
      jobtype === "Job Type"
    ) {
      Postjobnotifyerror();

      return;
    } else {
      const { data, error } = await supabase.from("PostJob").insert([
        {
          position: positions,
          location: location,
          age: age,
          height: height,
          salary: salary,
          hotel: hotel,
          dob: dob,
          jobdescrip: jobDescrip,
          carrier: career,
          experience: experience,
          specializations: specializations,
          qualifications: qualification,
          jobtype: jobtype,
        },
      ]);

    setPositions("Select Position");
    setLocation("");
    setAge("")
    setHeight("")
    setSalary("")
    setHotel("")
    setDob("")
    setJobDescrip("")
    setCareer("Carrer Level")
    setExperience("Employee Experience")
    setSpecializations("")
    setQualification("")
    setJobType("Job Type")
    Notify();
    return;
    }
  };

  if (!isPost) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex  "
    >
      <div className="bg-white h-[75%] w-[100%] lg:h-[60%] lg:w-[50%] md:h-[57%] md:w-[45%] md:rounded-md  rounded-md shadow-2xl shadow-gray-500 overflow-auto ">
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4 text-slate-100 text-[30px] md:text-[30px] h-fit text-xl w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Post a Job
        </label>
        <div className="p-2">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4 p-5 md:p-2 md:m-1 md:gap-3  overflow-y-auto rounded-md ">
            <label className="justify-center flex font-semibold h-fit text-md md:text-[20px] text-[17px] ">
              Position
            </label>
            <select
              value={positions}
              className=" pr-3 py-2 w-[100%]  text-md md:w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setPositions(e.target.value)}
            >
              {position.map((positions) => (
                <option key={positions.id}> {positions.position}</option>
              ))}
            </select>
            <label className="justify-center text-md h-fit flex  font-semibold md:text-[20px] text-[17px]">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Location"
              type="text"
            ></input>
            <label className="justify-center flex font-semibold text-md h-fit md-text-[20px] text-[17px]">
              Age Requirements
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Age"
              type="text"
            ></input>
            <label className="justify-center flex font-semibold">
              Height Requirements
            </label>
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Height"
              type="text"
            ></input>
            <label className="justify-center flex font-semibold">Salary</label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Salary per day"
              type="text"
            ></input>
            <label className="justify-center flex font-semibold">Hotel</label>
            <input
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Hotel"
              type="text"
            ></input>
            <label className="justify-center flex font-semibold">
              Date and Time
            </label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              type="date"
            ></input>
            <label className="justify-center flex font-semibold">
              Job Description
            </label>
            <input
              value={jobDescrip}
              onChange={(e) => setJobDescrip(e.target.value)}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Job Description"
              type="text"
            ></input>

            <label className="justify-center flex font-semibold">
              Carrier Level
            </label>
            <select
              value={career}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setCareer(e.target.value)}
            >
              {carrerlevel.map((carrerlevels) => (
                <option key={carrerlevels.id}> {carrerlevels.carrerlvl}</option>
              ))}
            </select>

            <label className="justify-center flex font-semibold">
              Years of Experience
            </label>
            <select
              value={experience}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setExperience(e.target.value)}
            >
              {Employeexp.map((Employeexps) => (
                <option key={Employeexps.id}> {Employeexps.Employeeexp}</option>
              ))}
            </select>
            <label className="justify-center flex font-semibold">
              Job Specializations
            </label>
            <div>
              <input
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Hotel/Restaurant,Food/Beverage"
                type="text"
              ></input>
            </div>
            <label className="justify-center flex font-semibold">
              Qualification
            </label>
            <div>
              <input
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="pl-5 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Bachelor's/College Degree"
                type="text"
              ></input>
            </div>

            <label className="justify-center flex font-semibold">
              Job Type
            </label>
            <select
              value={jobtype}
              className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onChange={(e) => setJobType(e.target.value)}
            >
              {Jobtypee.map((Jobtypees) => (
                <option key={Jobtypees.id}> {Jobtypees.Jobtype}</option>
              ))}
            </select>
          </div>
          <div className="flex  justify-between gap-2 mt-6   ">
            <button
              className=" w-[100%] p-1 hover:bg-sky-400 border border-black text-black hover:text-white  hover:-translate-y-1 rounded-lg"
              onClick={() => handleStoreData()}
            >
              Post A job
            </button>

            <button
              onClick={() => isPostClose()}
              className=" w-[100%]   hover:bg-sky-400 border border-black text-black hover:text-white  hover:-translate-y-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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

export default PostJob;

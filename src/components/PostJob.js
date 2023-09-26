import React, { useState } from "react";
import position from "./position.json";
import carrerlevel from "./carrerlevel.json";
import Employeexp from "./Employeexp.json";
import Jobtypee from "./Jobtype.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PostJob = ({ isPost, isPostClose }) => {
  const [positions, setPositions] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [salary, setSalary] = useState("");
  const [hotel, setHotel] = useState("");
  const [dob, setDob] = useState("");
  const [jobDescrip, setJobDescrip] = useState("");
  const [career, setCareer] = useState("");
  const [experience, setExperience] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobtype, setJobType] = useState("");



  const Postjobnotifyerror = () => {
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
      isPostClose();
    }, [2000]);
  };

  const handleStoreData = async () => {
    if (
      !positions ||
      !location ||
      !age ||
      !height ||
      !salary ||
      !hotel ||
      !dob ||
      !jobDescrip ||
      !career ||
      !experience ||
      !specializations ||
      !qualification ||
      !jobtype
    ) {
      Postjobnotifyerror()
      console.log(true)
      return;
    }

    const {data, error} = await supabase.from("PostJob").insert([
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

   
    Notify()
  };
  
 

  if (!isPost) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex  "
    >
      <div className=" bg-white p-10 grid grid-cols-2 gap-3 h-[800px] overflow-y-auto rounded-md">
        <label className="justify-center flex font-semibold">Position</label>
        <select
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          onChange={(e) => setPositions(e.target.value)}
        >   
           {position.map((positions) => (
            <option key={positions.id}> {positions.position}</option>
          ))}
        </select>
        <label className="justify-center flex font-semibold">Location</label>
        <input
          onChange={(e) => setLocation(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Location"
          type="text"
        ></input>
        <label className="justify-center flex font-semibold">Age</label>
        <input
          onChange={(e) => setAge(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Age"
          type="text"
        ></input>
        <label className="justify-center flex font-semibold">Height</label>
        <input
          onChange={(e) => setHeight(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Height"
          type="text"
        ></input>
        <label className="justify-center flex font-semibold">Salary</label>
        <input
          onChange={(e) => setSalary(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Salary per day"
          type="text"
        ></input>
        <label className="justify-center flex font-semibold">Hotel</label>
        <input
          onChange={(e) => setHotel(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Hotel"
          type="text"
        ></input>
        <label className="justify-center flex font-semibold">
          Date and Time
        </label>
        <input
          onChange={(e) => setDob(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          type="date"
        ></input>
        <label className="justify-center flex font-semibold">
          Job Description
        </label>
        <input
          onChange={(e) => setJobDescrip(e.target.value)}
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Job Description"
          type="text"
        ></input>

        <label className="justify-center flex font-semibold">
          Carrier Level
        </label>
        <select
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
            onChange={(e) => setQualification(e.target.value)}
            className="pl-5 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Bachelor's/College Degree"
            type="text"
          ></input>
        </div>

        <label className="justify-center flex font-semibold">Job Type</label>
        <select
          className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          onChange={(e) => setJobType(e.target.value)}
        >
          {Jobtypee.map((Jobtypees) => (
            <option key={Jobtypees.id}> {Jobtypees.Jobtype}</option>
          ))}
        </select>
        
        <div className="flex-col   ">
          <div className="flex gap-5 justify-center  mt-2 w-[205%]">
         
          <button
            className=" w-[40%]  hover:bg-sky-400 border border-black text-black hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg"
            onClick={() => handleStoreData()}
          >
            Post A job
          </button>
         
          <button
            onClick={isPostClose}
            className=" w-[40%]   hover:bg-sky-400 border border-black text-black hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg"
          >
            Cancel
          </button>
          </div>
         
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

export default PostJob;

import React, { useEffect, useRef, useState } from "react";
import position from "./position.json";
import carrerlevel from "./carrerlevel.json";
import Employeexp from "./Employeexp.json";
import Jobtypee from "./Jobtype.json";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
const PostJob = ({ isPost, isPostClose }) => {
  const [positions, setPositions] = useState("Select Position");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [salary, setSalary] = useState("");
  const [hotel, setHotel] = useState("");
  const currentDate = new Date().toDateString();
  const [jobDescrip, setJobDescrip] = useState("");
  const [career, setCareer] = useState("Career Level");
  const [experience, setExperience] = useState("Employee Experience");
  const [specializations, setSpecializations] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobtype, setJobType] = useState("Job Type");
  const [jobtitle, setjobtitle] = useState("");
  const [files, setFiles] = useState([]);
  const [hotelid, setHotelid] = useState("");
  const [files1, setFiles1] = useState([]);

  function close() {
    isPostClose();
  }

  useEffect(() => {
    setHotelid(uuidv4());
  }, [isPost]);

  const handleStoreData = async () => {
    try {
      if (
        positions === "Select Position" ||
        !location ||
        !age ||
        !height ||
        !salary ||
        !hotel ||
        !jobDescrip ||
        career === "Career Level" ||
        experience === "Employee Experience" ||
        !specializations ||
        !qualification ||
        !jobtitle ||
        jobtype === "Job Type"
      ) {
        toast.warning(
          `${
            ((!location ||
              !age ||
              !height ||
              !salary ||
              !hotel ||
              !jobDescrip ||
              !jobtitle ||
              !specializations ||
              !qualification) &&
              "Please fill up all the blanks") ||
            (!location && "Location is required") ||
            (!age && "Age is Required") ||
            (!height && "Height requirements is required") ||
            (!salary && "Salary is required") ||
            (!jobtitle && "Job Title is required") ||
            (!hotel && "Hotel is required") ||
            (!jobDescrip && "Job description is required") ||
            (!specializations && "Job specializations is required") ||
            (positions === "Select Position" && "Select Position") ||
            (career === "Career Level" && "Select Career Level") ||
            (experience === "Employee Experience" &&
              "Select Employee Experience") ||
            (jobtype === "Job Type" && "Select Job Type")
          }`,
          {
            autoClose: 3000,
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        return;
      } else {
        const { data, error } = await supabase.from("PostJob").insert([
          {
            position: positions,
            location: location,
            age: age,
            created_at: currentDate,
            height: height,
            salary: salary,
            hotel: hotel,
            jobdescrip: jobDescrip,
            carrier: career,
            experience: experience,
            specializations: specializations,
            qualifications: qualification,
            jobtype: jobtype,
            jobtitle: jobtitle,
            hoteluuid: hotelid,
            coveruuid: hotelid,
          },
        ]);
        if (error) throw error;
        const { data1, error: error1 } = await supabase.storage
          .from("Logo")
          .upload(hotelid + "/" + uuidv4(), files, {
            contentType: "image/jpg , image/png",
          });
        const { data2, error: error2 } = await supabase.storage
          .from("Cover")
          .upload(hotelid + "/" + uuidv4(), files1, {
            contentType: "image/jpg , image/png",
          });
        if (error1) throw error1;
        setjobtitle("");
        setPositions("Select Position");
        setLocation("");
        setAge("");
        setHeight("");
        setSalary("");
        setHotel("");
        setJobDescrip("");
        setCareer("Career Level");
        setExperience("Employee Experience");
        setSpecializations("");
        setQualification("");
        setJobType("Job Type");
        toast.success("Posted Successfully!", {
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
          close();
        }, [3000]);
        return;
      }
    } catch (error) {}
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
        <div className="m-5 grid-cols-2 grid">
          <div>
            <label className="flex font-bold ">Upload Logo</label>
            <input
              // value={files}
              className="block w-[250px] px-5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400"
              // id="multiple_files"
              type="file"
              onChange={(e) => setFiles(e.target.files[0])}
              accept="image/png, image/jpeg"
              required
            ></input>
          </div>
          <div>
            <label className="flex font-bold ">Upload Cover Photo</label>
            <input
              // value={files}
              className="block w-[250px] px-5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400"
              // id="multiple_files"
              type="file"
              onChange={(e) => setFiles1(e.target.files[0])}
              accept="image/png, image/jpeg"
              required
            ></input>
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5 md:p-2 md:m-1 md:gap-5  overflow-y-auto rounded-md ">
            <div>
              <label className=" text-md h-fit flex  font-semibold md:text-[20px] text-[17px]">
                Job Title
              </label>
              <input
                value={jobtitle}
                onChange={(e) => setjobtitle(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Job Title"
                type="text"
              ></input>
            </div>
            <div>
              <label className=" flex font-semibold h-fit text-md md:text-[20px] text-[17px] ">
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
            </div>
            <div>
              <label className=" text-md h-fit flex  font-semibold md:text-[20px] text-[17px]">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Location"
                type="text"
              ></input>
            </div>
            <div>
              <label className=" flex font-semibold text-md h-fit md-text-[20px] text-[17px]">
                Age Requirements
              </label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Age"
                type="text"
              ></input>
            </div>
            <div>
              <label className=" flex font-semibold">Height Requirements</label>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Height"
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-semibold">Salary</label>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Salary per day"
                type="text"
              ></input>
            </div>
            <div>
              <label className=" flex font-semibold">Hotel</label>
              <input
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Hotel"
                type="text"
              ></input>
            </div>

            <div>
              <label className=" flex font-semibold">Carrier Level</label>
              <select
                value={career}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setCareer(e.target.value)}
              >
                {carrerlevel.map((carrerlevels) => (
                  <option key={carrerlevels.id}>
                    {" "}
                    {carrerlevels.carrerlvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className=" flex font-semibold">Years of Experience</label>
              <select
                value={experience}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setExperience(e.target.value)}
              >
                {Employeexp.map((Employeexps) => (
                  <option key={Employeexps.id}>
                    {" "}
                    {Employeexps.Employeeexp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className=" flex font-semibold">Job Specializations</label>

              <input
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Hotel/Restaurant,Food/Beverage"
                type="text"
              ></input>
            </div>

            <div>
              <label className=" flex font-semibold">Qualification</label>

              <input
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="pl-5 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Bachelor's/College Degree"
                type="text"
              ></input>
            </div>

            <div>
              {" "}
              <label className=" flex font-semibold">Job Type</label>
              <select
                value={jobtype}
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => setJobType(e.target.value)}
              >
                {Jobtypee.map((Jobtypees) => (
                  <option key={Jobtypees.id}> {Jobtypees.Jobtype}</option>
                ))}
              </select>{" "}
            </div>
            <div>
              <label className=" flex font-semibold">Job Description</label>
              <textarea
                value={jobDescrip}
                name="todolist"
                id="todolist"
                rows={5}
                onChange={(e) => setJobDescrip(e.target.value)}
                className="pl-4 pr-3 py-2 w-[100%]  font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Job Description"
                type="text"
              ></textarea>
            </div>
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
        autoClose={3000}
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

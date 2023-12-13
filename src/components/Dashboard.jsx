import React, { useEffect, useRef, useState } from "react";
import ModalApply from "./ModalApply";
import supabase from "./supabaseClient";
import PostConfig from "./PostConfig";
import logo1 from "./images/waiter1.jpg";

import logo3 from "./images/hotel.jpg";
import logo4 from "./images/leadership.png";

import banner from "./images/banner.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
import ReactPaginate from "react-paginate";
import Marco from "./images/Marco_Polo_Hotels_Logo.jpg";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { RxDotFilled } from "react-icons/rx";
import { GoClock } from "react-icons/go";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import Logoviewer from "./Logoviewer";
import Coverviewer from "./Coverviewer";
import { FaBriefcase, FaBuilding, FaClock, FaSearch } from "react-icons/fa";
import { FaLocationDot, FaCalendarDay, FaPesoSign } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from "react-toastify";
const Dashboard = ({ email, applicant, Hrdashboard, admindashboard }) => {
  const [showModal, setShowModal] = useState(false);

  const [info, setInfo] = useState();
  const [positions, setPositions] = useState();
  const [location, setLocation] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [salary, setSalarys] = useState();
  const [hotel, setHotel] = useState();
  const [dob, setDob] = useState();
  const [jobDescrip, setJobDescrip] = useState();
  const [career, setCareer] = useState();
  const [experience, setExperience] = useState();
  const [specializations, setSpecializations] = useState();
  const [qualification, setQualification] = useState();
  const [jobtype, setJobType] = useState();
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [edit, setEdit] = useState(true);
  const [jobtitle, setjobtitle] = useState("");
  const [disable, setdisable1] = useState(false);

  const Job = useRef(null);

  //AOS
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "linear" });
  }, []);

  //POSTED JOB
  useEffect(() => {
    handleGetPost();
    const PostJob = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "PostJob" },
        (payload) => {
          handleGetPost();
        }
      )
      .subscribe();
  }, [email]);
  //GETTER NG POST
  const handleGetPost = async () => {
    const { data, error } = await supabase.from("PostJob").select();

    if (data) {
      setPostJobInfo(data);
    }
  };

  const handleUpdate = async () => {
    const { data: update } = await supabase
      .from("PostJob")
      .update({
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
        jobtitle: jobtitle,
      })
      .eq("id", info.id)
      .single();

    setEdit(!edit);
  };

  const handleDelete = async () => {
    const { data: deleted } = await supabase
      .from("PostJob")
      .delete()
      .eq("id", info.id);
  };

  const [postJobInfo, setPostJobInfo] = useState([]);

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 5;

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(postJobInfo);
    setpagecount(Math.ceil(postJobInfo.length / perpage));
  }, [itemsOffset, perpage, postJobInfo]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % postJobInfo.length;

    setItemOffset(newOffset);
  };

  if (showModal) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

  function apply1() {
    setShowModal(true);
  }

  const applychecker = async (postinfo) => {
    const { data: applicant } = await supabase.from("Applicant_List").select();
    for (let index = 0; index < applicant.length; index++) {
      if (
        applicant[index].Hotel === postinfo.hotel &&
        applicant[index].Email === (await email.Email)
        // remove await
      ) {
        setdisable1(true);
        return;
      } else {
        setdisable1(false);
      }
    }
  };
  const [file1, setFile] = useState();
  const [file12, setFile21] = useState();
  const [hide, sethide] = useState(false);
  const [desktop, setdesktop] = useState(false);

  function mobile() {
    if (window.innerWidth < 700) {
      sethide(!hide);
      return;
    } else {
      setdesktop(true);
    }
  }
  function widthchecker() {
    if (window.innerWidth > 700 && !hide) {
      return true;
    } else if (window.innerWidth < 700 && hide) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    mobile();
    widthchecker();
    sethide(false);
  }, [window.innerWidth]);
  return (
    <>
      <div className="  h-screen  ">
        <div className="  md:h-[100%] sticky top-0 w-full  overflow-x-hidden    overflow-y-auto   bg-slate-100 p-0 md:p-10">
          {/* Search  */}

          <div className=" flex justify-center  pt-[130px]  w-full relative p-2  bg-gradient-to-r from-[#020024] via-[#040463] to-[#040463] ">
            <p className="absolute md:-mt-[80px] font-bold md:text-3xl text-sm   -mt-[30px] text-white  ">
              Your Dream Job Awaits: Apply Now & Thrive!
            </p>

            <FaSearch className="md:mt-2 mt-4   -ml-[86%] md:-ml-[56%] text-2xl absolute text-slate-400" />
            <input
              className="top-96 w-[90%] md:w-[30%] mt-3 md:mt-0 mb-10 h-[30%]  md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-s-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Enter Position or key words "
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            ></input>

            <input
              className="top-96 w-[90%] md:w-[30%] mt-3 md:mt-0  mb-10 h-[30%]  md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-e-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Enter City"
              type="search"
              onChange={(e) => setSearch2(e.target.value)}
            ></input>
            <FaLocationDot className="md:mt-2 mt-4 ml-8 text-2xl absolute text-slate-400" />
          </div>
          {/* right side */}
          <div className="md:flex  grid grid-cols-1  shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]">
            {/* Map */}
            {!hide && (
              <div className="md:w-[60%] ">
                {currentitems && (
                  <div className=" md:pl-14 pl-10 justify-center rounded-md rounded-e-none  md:w-[100%] ">
                    <h1 className="font-bold ml-[10px] md:text-lg text-[#162388] mt-10 ">
                      TO APPLY
                    </h1>
                    {currentitems
                      .filter((val) => {
                        if (
                          val.position

                            .toLowerCase()
                            .includes(search.toLowerCase()) &&
                          val.location
                            .toLowerCase()
                            .includes(search2.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .slice(itemsOffset, endoffsett)
                      .map((e) => (
                        <PostConfig
                          key={e.id}
                          postInfo={e}
                          Pposition={setPositions}
                          Plocation={setLocation}
                          Page={setAge}
                          Pheight={setHeight}
                          Psalary={setSalarys}
                          Photel={setHotel}
                          Pdob={setDob}
                          PjobDescrip={setJobDescrip}
                          Pcareer={setCareer}
                          Pexperience={setExperience}
                          Pspecializations={setSpecializations}
                          Pqualification={setQualification}
                          Pjobtype={setJobType}
                          setInfo={setInfo}
                          setjobtitle={setjobtitle}
                          email={email}
                          applychecker={applychecker}
                          setFile1={setFile}
                          setFile21={setFile21}
                          mobile={mobile}
                        />
                      ))}
                    <div className="-mr-5">
                      <ReactPaginate
                        previousLabel={
                          <span className="mt-2 w-10 h-10 flex items-center justify-center rounded-md -ml-10 md:ml-0  bg-gray-200 mr-4">
                            <BsChevronCompactLeft />
                          </span>
                        }
                        nextLabel={
                          <span className="mt-2 w-10 h-10 flex items-center justify-center md:mr-4 rounded-md -ml-10 md:ml-0 bg-gray-200">
                            <BsChevronCompactRight />
                          </span>
                        }
                        breakLabel={<span className="mr-4 mt-4">...</span>}
                        pageRangeDisplayed={3}
                        pageCount={pagecount}
                        onPageChange={handlePageClick}
                        renderOnZeroPageCount={null}
                        containerClassName="flex mt-2   "
                        pageClassName="block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-5 mr-5 md:w-10 h-10 flex items-center justify-center roundend-md  md:mr-4 "
                      />
                    </div>
                  </div>
                )}{" "}
              </div>
            )}

            {/* Sticky */}
            {widthchecker() && (
              <div
                ref={Job}
                className=" md:ml-10 overflow-x-hidden  h-[600px] w-[100%] right-0 rounded-xl mt-2   md:sticky grid grid-cols-1 top-10 overflow-y-auto  mb-24 p-5 mr-32 justify-center pl-2 text-center items-center      "
              >
                <button
                  className="md:hidden visible text-left text-3xl text-blue-500  "
                  onClick={() => mobile()}
                >
                  <IoMdArrowRoundBack />
                </button>
                {file12 && (
                  <div className="flex mt-5 w-full justify-center  ">
                    {file12.map((file1) => (
                      <Coverviewer
                        key={file1.id}
                        file1={file1}
                        Email={info.coveruuid}
                      />
                    ))}
                  </div>
                )}

                {file1 && (
                  <div className="flex mt-5">
                    {file1.map((file1) => (
                      <Logoviewer
                        key={file1.id}
                        file1={file1}
                        Email={info.hoteluuid}
                      />
                    ))}
                  </div>
                )}
                <div className=" ">
                  {email !== "" && (
                    <ModalApply
                      isVisible={showModal}
                      onClose={() => setShowModal(false)}
                      Position={positions}
                      Hotel={hotel}
                      Data={email}
                      // checker={checker}
                      // setdisable={setdisable}
                    />
                  )}

                  {positions ? (
                    <>
                      {jobtitle ? (
                        <div className="flex items-start flex-col p-2 mt-3 ">
                          <div className="grid  grid-cols-3 gap-2 md:gap-3  ">
                            <button
                              onClick={() => setEdit(!edit)}
                              className={`${
                                Hrdashboard === "HR"
                                  ? "text-white w-[100%] md:w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                                  : `${
                                      admindashboard
                                        ? "text-white w-[100%] md:w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        : "hidden"
                                    }`
                              }`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleUpdate()}
                              className={`${
                                Hrdashboard === "HR"
                                  ? "focus:outline-none md:w-[100%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                                  : `${
                                      admindashboard
                                        ? "focus:outline-none md:w-[100%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        : "hidden"
                                    }`
                              }`}
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete()}
                              className={`${
                                Hrdashboard === "HR"
                                  ? "focus:outline-none text-white md:w-[100%] bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  : `${
                                      admindashboard
                                        ? "focus:outline-none text-white md:w-[100%] bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 md:px-10 py-3 md:py-3 mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        : "hidden"
                                    }`
                              }`}
                            >
                              Delete
                            </button>
                            <div className="mb-3">
                              {edit ? (
                                <label className="text-3xl font-semibold text-[#162388]">
                                  {jobtitle}
                                </label>
                              ) : (
                                <div className="flex">
                                  Job Title:{" "}
                                  <input
                                    type="text"
                                    value={jobtitle}
                                    className="bg-blue-200"
                                    onChange={(e) =>
                                      setjobtitle(e.target.value)
                                    }
                                  ></input>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label className="flex text-lg font-normal">
                                <FaBriefcase className="text-xl mt-1 mr-3 text-slate-400" />
                                {positions}
                              </label>
                            ) : (
                              <div className="flex">
                                Position:{" "}
                                <input
                                  type="text"
                                  value={positions}
                                  className="bg-blue-200"
                                  onChange={(e) => setPositions(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label className="flex text-lg font-normal ">
                                <FaLocationDot className="text-xl mt-1 mr-3 text-slate-400" />{" "}
                                {location}
                              </label>
                            ) : (
                              <div className="">
                                Location:{" "}
                                <input
                                  type="text"
                                  value={location}
                                  className="bg-blue-200"
                                  onChange={(e) => setLocation(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3 flex">
                            {edit ? (
                              <label className="flex text-lg font-normal ml-1">
                                {" "}
                                <FaPesoSign className="text-xl mt-1 mr-2 text-slate-400" />{" "}
                                {salary} per day
                              </label>
                            ) : (
                              <div className="">
                                Salary:{" "}
                                <input
                                  type="text"
                                  value={salary}
                                  className="bg-blue-200"
                                  onChange={(e) => setSalarys(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label className="flex text-lg font-normal">
                                <FaClock className="text-xl mt-1 mr-3 text-slate-400" />{" "}
                                {jobtype}
                              </label>
                            ) : (
                              <div className="">
                                Job Type:
                                <input
                                  type="text"
                                  value={jobtype}
                                  className="bg-blue-200"
                                  onChange={(e) => setJobType(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label className="flex text-lg font-normal">
                                {" "}
                                <FaBuilding className="text-xl mt-1 mr-3 text-slate-400" />{" "}
                                {hotel}
                              </label>
                            ) : (
                              <div className="">
                                Hotel:{" "}
                                <input
                                  type="text"
                                  value={hotel}
                                  className="bg-blue-200"
                                  onChange={(e) => setHotel(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          {applicant && (
                            <button
                              disabled={disable}
                              onClick={apply1}
                              className={`
                        ${
                          !disable
                            ? " bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            : " bg-gray-400 "
                        }    focus:outline-none items-center text-white rounded-lg text-sm px-10 py-2.5  mb-2 font-medium `}
                            >
                              APPLY
                            </button>
                          )}

                          <div className="mb-3 mt-10">
                            {edit ? (
                              <label>Age: {age}</label>
                            ) : (
                              <div className="">
                                Age:{" "}
                                <input
                                  type="text"
                                  value={age}
                                  className="bg-blue-200"
                                  onChange={(e) => setAge(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label>Height: {height}</label>
                            ) : (
                              <div className="">
                                Height:{" "}
                                <input
                                  type="text"
                                  value={height}
                                  className="bg-blue-200"
                                  onChange={(e) => height(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {edit ? (
                              <label>Date Posted: {dob}</label>
                            ) : (
                              <div className="">
                                Date Posted:{" "}
                                <input
                                  type="text"
                                  value={dob}
                                  className="bg-blue-200"
                                  onChange={(e) => setDob(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="font-bold">Job Description</div>
                          <div className="mb-3">
                            {edit ? (
                              <p>{jobDescrip}</p>
                            ) : (
                              <div className="">
                                <input
                                  type="text"
                                  value={jobDescrip}
                                  className="bg-blue-200"
                                  onChange={(e) =>
                                    setJobDescrip(e.target.value)
                                  }
                                ></input>
                              </div>
                            )}
                          </div>
                          <div className="flex items-start flex-col">
                            <div className="pt-5 font-bold mb-3">
                              Additional Information
                            </div>
                            <div className="font-bold">Carrer Level</div>
                            <div className="mb-3">
                              {edit ? (
                                <label>Carrer: {career}</label>
                              ) : (
                                <div className="">
                                  Carrer:{" "}
                                  <input
                                    type="text"
                                    value={career}
                                    className="bg-blue-200"
                                    onChange={(e) => setCareer(e.target.value)}
                                  ></input>
                                </div>
                              )}
                            </div>

                            <div className="pt-5 font-bold">
                              Years of Experience
                            </div>
                            <div className="mb-3">
                              {edit ? (
                                <label>{experience}</label>
                              ) : (
                                <div className="">
                                  {" "}
                                  <input
                                    type="text"
                                    value={experience}
                                    className="bg-blue-200"
                                    onChange={(e) =>
                                      setExperience(e.target.value)
                                    }
                                  ></input>
                                </div>
                              )}
                            </div>

                            <div className="pt-5 font-bold">
                              Job Specializations
                            </div>
                            <div className="mb-3">
                              {edit ? (
                                <label>{specializations}</label>
                              ) : (
                                <div className="">
                                  <input
                                    type="text"
                                    value={specializations}
                                    className="bg-blue-200"
                                    onChange={(e) =>
                                      setSpecializations(e.target.value)
                                    }
                                  ></input>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        "Loading"
                      )}
                    </>
                  ) : (
                    <div className="pt-[30%] text-3xl text-[#162388] font-bold items-center">
                      JOB INFORMATION
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Dashboard;

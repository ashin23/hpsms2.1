import React, { useEffect, useState } from "react";
import ModalApply from "./ModalApply";
import supabase from "./supabaseClient";
import PostConfig from "./PostConfig";
import logo1 from "./images/waiter1.jpg";

const Dashboard = ({ email, applicant, Hrdashboard, admindashboard }) => {
  const [showModal, setShowModal] = useState(false);
  const [postJobInfo, setPostJobInfo] = useState([]);

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
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    handleGetPost();

    const PostJob = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "PostJob" },
        (payload) => {
          handleGetPost();
        }
      )
      .subscribe();
  }, []);

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
  return (
    <>
      <div className="grid grid-row-2 ">
        <div className="">
          <div className="">
            <div className="sticky top-1 flex justify-center  pt-[120px] bg-gradient-to-t from-slate-100 via-blue-400 to-blue-500">
              <input
                className="top-96 w-[750px] z-50 mb-10 h-16 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search Here..."
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className=" h-[700px]  overflow-x-auto bg-slate-100 p-10  ">
              {/* right side */}
              <div className="shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] grid grid-cols-2 rounded-md ">
                {postJobInfo && (
                  <div className=" ml-20 pl-20 justify-center    rounded-[60px] rounded-e-none ">
                    <h1 className="font-bold ml-[10px] md:text-lg  mt-10 ">
                      TO APPLY
                    </h1>
                    {postJobInfo
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.position
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        } else if (
                          val.location
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
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
                        />
                      ))}
                  </div>
                )}

                {/* left side */}
                <div className="  right-0 rounded-[60px] rounded-s   mb-24 p-1 mr-32 justify-center pl-2 text-center items-center">
                  <div className=" ">
                    <ModalApply
                      isVisible={showModal}
                      onClose={() => setShowModal(false)}
                      Position={positions}
                      Data={email}
                    />

                    {positions ? (
                      <div className="flex items-start flex-col p-2 ">
                        <button
                          onClick={() => setShowModal(true)}
                          className={`${
                            applicant
                              ? "ml-[40%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              : "hidden"
                          }`}
                        >
                          APPLY
                        </button>
                        <div className="grid grid-cols-3 gap-5">
                          <button
                            onClick={() => setEdit(!edit)}
                            className={`${
                              Hrdashboard === "HR"
                                ? "text-white w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                                : `${
                                    admindashboard
                                      ? "text-white w-[100%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                                ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                                : `${
                                    admindashboard
                                      ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
                                ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-5 mr-3 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                : `${
                                    admindashboard
                                      ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-3 mr-3 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                      : "hidden"
                                  }`
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="mb-3">
                          {edit ? (
                            <label>Position:{positions}</label>
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
                            <label>Location: {location}</label>
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
                        <div className="mb-3">
                          {edit ? (
                            <label>Salary: {salary}</label>
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
                            <label>Hotel: {hotel}</label>
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
                        <div className="mb-3">
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
                            <label> {jobDescrip}</label>
                          ) : (
                            <div className="">
                              <input
                                type="text"
                                value={jobDescrip}
                                className="bg-blue-200"
                                onChange={(e) => setJobDescrip(e.target.value)}
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
                          <div className="pt-5 font-bold">Job Type</div>
                          <div className="mb-3">
                            {edit ? (
                              <label> {jobtype}</label>
                            ) : (
                              <div className="">
                                <input
                                  type="text"
                                  value={jobtype}
                                  className="bg-blue-200"
                                  onChange={(e) => setJobType(e.target.value)}
                                ></input>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-[30%] font-bold items-center">
                        JOB INFORMATION
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

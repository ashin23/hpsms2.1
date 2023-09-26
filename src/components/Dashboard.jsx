import React, { useEffect, useState } from "react";
import ModalApply from "./ModalApply";
import supabase from "./supabaseClient";
import PostConfig from "./PostConfig";
import logo1 from "./images/waiter1.jpg"

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const [postJobInfo, setPostJobInfo] = useState([]);

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

  return (
    <>
      
      <div className="grid grid-row-2  ">
        <div className="">
          <div className="">
            <div className="flex  justify-center mt-10 mb-10 bg-[#D8D9DA] p-2  h-[70px]  ">
              <input
                className="w-[750px]  pl-10 pr-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search Here..."
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className="grid grid-cols-2   ">
              {/* right side */}
              {postJobInfo && (
                <div className="ml-20 pl-20 justify-center bg-white  overflow-scroll overflow-x-hidden h-[590px] rounded-[60px] rounded-e-none ">
                  <h1 className="font-bold ml-[10px] md:text-lg  mt-10 ">TO APPLY</h1>
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
                        val.location.toLowerCase().includes(search.toLowerCase())
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
                      />
                    ))}
                  {console.log(positions)}
                </div>
              )}

              {/* left side */}
              <div className=" rounded-[60px] rounded-s bg-white p-1  mr-32 justify-center pl-2 text-center items-center   overflow-scroll overflow-x-hidden h-[590px]">
                <div className=" ">
                  <ModalApply
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                    Position={positions}
                  />
                  {positions ? (
                    <div className="flex items-start flex-col p-2 bg-[#FBF8FF]">
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white rounded-lg mt-8 p-2 ml-[40%]    flex w-[30%] justify-center mb-7 "
                      >
                        APPLY
                      </button>
                      <div className="mb-3">Position: {positions}</div>
                      <div className="mb-3">Location: {location}</div>
                      <div className="mb-3">Salary: {salary}</div>
                      <div className="mb-3">Hotel: {hotel}</div>
                      <div className="mb-3">Age: {age}</div>
                      <div className="mb-3">Height: {height}</div>
                      <div className="pb-10">Posted: {dob}</div>
                      <div className="font-bold">Job Description</div>
                      <div></div>
                      <ul className="list-disc ml-5 p-2 ">
                        <li>{jobDescrip}</li>
                      </ul>
                      <div className="flex items-start flex-col">
                        <div className="pt-5 font-bold">
                          Additional Information
                        </div>
                        <div className="font-bold">Carrer Level</div>
                        <div>{career}</div>
                        <div className="pt-5 font-bold">
                          Years of Experience
                        </div>
                        <div>{experience}</div>
                        <div className="pt-5 font-bold">
                          Job Specializations
                        </div>
                        <div>{specializations}</div>
                        <div className="pt-5 font-bold">Qualification</div>
                        <div>{qualification}</div>
                        <div className="pt-5 font-bold">Job Type</div>
                        <div>{jobtype}</div>
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
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import ModalApply from "./ModalApply";
import supabase from "./supabaseClient";
import PostConfig from "./PostConfig";
import logo1 from "./images/waiter1.jpg";
import logo2 from "./images/hotelproimage.png";
import logo3 from "./images/hotel.jpg";
import logo4 from "./images/leadership.png";
import Solaire from "./images/Solaire_Resort_logo.png";
import Sheraton from "./images/sheraton.jpg";
import Marriot from "./images/Marriot.png";
import Heritage from "./images/Heritage.jpg";
import newWorld from "./images/newWorld.png";
import Shangrila from "./images/Shangrila.png";
import Richmonde from "./images/Richmonde.jpg";
import Grand from "./images/Grandhyatt.png";
import Marco from "./images/Marco_Polo_Hotels_Logo.jpg";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
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
        { event: "*", schema: "public", table: "PostJob" },
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

  const slides = [
    {
      url: "https://pix8.agoda.net/hotelImages/451/45166/45166_14011718200018097318.jpg?ca=2&ce=1&s=1024x768",
    },
    {
      url: "https://media.hrs.com/media/image/25/f1/fd/Marco_Polo_Ortigas_Manila-Pasig_City-Hotel_outdoor_area-635783.jpg",
    },
    {
      url: "https://www.hospitalitynet.org/picture/xxl_153096644.jpg?t=1548055521",
    },

    {
      url: "https://secure.s.forbestravelguide.com/img/properties/sky-tower-at-solaire-resort-and-casino/extra-large/sky-tower-at-solaire-resort-casino-exterior.jpg",
    },
    {
      url: "https://campbell.com.ph/wp-content/uploads/2019/03/img-hyatt-4.jpg",
    },
  ];

  useEffect(() => {
    startslider();
  }, []);

  const startslider = () => {
     setInterval(() => {
      nextSlide();
    }, 10000);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="grid grid-row-2 ">
        <div className="">
          <div className="">
            <div className="sticky top-1 flex justify-center  pt-[120px] bg-gradient-to-t from-slate-100 via-blue-400 to-blue-500">
              <input
                className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%]  md:h-10 pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search Here..."
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className=" h-[700px]   w-fit md:w-[100%] overflow-x-auto bg-slate-100 p-5 md:p-10">
              {/* <label className="text-[200%] md:flex hidden ml-[25%] md:ml-[70%] font-bold">
                Our Partners
              </label> */}
              <div className="grid grid-cols-1 gap-3">
                {/* Image slider */}
                <div className="max-w-[1500px]  md:w-[100%]  h-[900%] md:h-[760px] w-[100%] md:m-auto  relative">
                  <div
                    style={{
                      backgroundImage: `url(${slides[currentIndex].url})`,
                    }}
                    className="w-full h-full object-cover  rounded-2xl bg-center bg-cover duration-500 "
                  ></div>
                  {/* Left Arrow */}
                  <div className="hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                  </div>
                  {/* Right Arrow */}
                  <div className="hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                  </div>
                  <div className="flex top-4 justify-center py-2">
                    {slides.map((slide, slideIndex) => (
                      <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className="text-2xl cursor-pointer"
                      >
                        <RxDotFilled />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid md:flex grid-rows-1  md:h-[30%] md:w-[10%] mt-[95%] md:mt-[5%]  md:gap-5 gap-2">
                  <img src={Solaire} className="" />
                  <img src={Sheraton} className="" />
                  <img src={Marriot} className="" />
                  <img src={Heritage} className="w-[100%]" />
                  <img src={newWorld} className="" />
                  <img src={Shangrila} className="" />
                  <img src={Richmonde} className="" />
                  <img
                    src={Grand}
                    className=""
                  />
                  <img src={Marco} className="w-[100%]" />
                </div>
              {/* wala pang animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center  gap-y-5  md:mt-[3%] ">
                <div className="text-black">
                  <img
                    src={logo1}
                    className="
                   md:ml-[10%]
                   h-[100%] w-[100%] rounded-md md:h-[90%] md:w-[70%] "
                  ></img>
                </div>
                <div className=" md:text-left">
                  <p className="text-blue-700 text-[50px] font-semibold mb-[2%]">
                    About Hotel Pro Services
                  </p>
                  <p className="mr-[10%] text-justify  ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam, ex, quia, nemo quo voluptatibus totam aliquam eum
                    accusamus quisquam unde repudiandae culpa dignissimos
                    doloremque incidunt deleniti eaque fugit magnam accusantium
                    suscipit natus? Voluptatibus aliquid, doloremque natus
                    recusandae enim eaque commodi officia soluta cum qui rerum,
                    voluptate repellat est nam illo eius obcaecati nobis
                    perferendis placeat? Incidunt quam sunt similique temporibus
                    dicta, at mollitia molestiae. Commodi et quisquam ratione
                    nemo at dolores quod maxime repudiandae, mollitia in!
                    Nesciunt eveniet minima eos molestias, sed ipsam porro non
                    culpa reiciendis consequatur unde blanditiis, modi omnis
                    natus laborum soluta nobis alias adipisci odio accusantium.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1  md:grid-cols-3 text-[50px] font-semibold mt-[5%] text-blue-700 ml-[5%]">
                <div>
                  <h1>300M</h1>
                  <p className="text-[20px]">Unique monthly visitors</p>
                </div>
                <div>
                  <h1>250M</h1>
                  <p className="text-[20px]">Resumes On Hotel Pro Services</p>
                </div>
                <div>
                  <h1>800M+</h1>
                  <p className="text-[20px]">Total ratings and reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-[10%]">
                <div>
                  <h1 className="text-blue-700 text-[50px] font-semibold md:text-left md:ml-[10%]">
                    Our People
                  </h1>
                  <p className="text-justify md:ml-[10%] mt-[5%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, iusto. Enim rem debitis amet impedit odio, alias
                    quidem veniam dignissimos, dolorem itaque officiis
                    voluptatum consequatur! Iste tempore nemo corrupti vitae,
                    exercitationem architecto at cumque officia eum enim.
                    Consequatur molestiae quam ullam sunt aspernatur autem iusto
                    dignissimos veritatis neque ad odit rem est provident
                    impedit doloremque soluta animi iure error, voluptatem qui
                    tempore fugiat amet eos laudantium! Magnam aspernatur
                    eveniet at incidunt quas! Ducimus consectetur minima
                    voluptas minus et exercitationem, harum nobis! Dicta soluta
                    adipisci minus labore vel maiores! Sed laboriosam
                    distinctio, id odio dolorem corrupti sapiente possimus modi
                    minus quam.
                  </p>
                </div>

                <div className="text-black">
                  <img
                    src={logo3}
                    className="h-[100%] w-[100%] md:h-[90%] md:w-[70%] rounded-md md:ml-[21%] md:mt-10 mt-5"
                  ></img>
                </div>

                <div className="text-black mb-[5%]">
                  <img
                    src={logo4}
                    className="md:h-[90%] md:w-[70%] rounded-md md:ml-20 mt-10"
                  ></img>
                </div>

                <div className="md:ml-20 md:mr-20 md:mb-[5%] mb-[5%]">
                  <h1 className="text-[50px] font-semibold text-blue-700 mb-10 text-left mt-[5%]">
                    Our LeaderShip
                  </h1>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio ex quibusdam vero vel amet. Doloribus ex alias
                    inventore tenetur, ipsam dignissimos quam eveniet vel magni
                    hic veniam, fugit, commodi omnis iure blanditiis error minus
                    veritatis maiores! Laudantium debitis explicabo quas
                    doloremque facere, illo, repellendus porro ex voluptate
                    similique error consequuntur nihil cumque aut suscipit
                    molestias in pariatur ipsam praesentium sunt laborum?
                    Officiis aperiam eos hic non suscipit accusamus, animi iste
                    ad facere labore. Sint maxime ipsam ducimus animi totam.
                    Perferendis eligendi dolor at ipsam. Ullam accusantium
                    blanditiis aut distinctio laudantium, placeat numquam at
                    dignissimos quas tenetur eos fugit officia molestiae.
                  </p>
                  <button
                    className="
                  h-[12%] w-[30%] ml-[35%] mb-[10%] mt-[3%]
                  rounded-xl text-blue-100 font-bold bg-blue-700 md:h-[12%] md:w-[20%]  md:p-[2%] md:mr-[90%] md:mt-[3%]"
                  >
                    Meet Our Team
                  </button>
                </div>
              </div>
              {/* right side */}
              <div className="shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] grid md:grid-cols-2 grid-cols-1 rounded-md ">
                {postJobInfo && (
                  <div className=" md:ml-20  md:pl-20 pl-10 justify-center    rounded-[60px] rounded-e-none ">
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
                              ? "md:ml-[30%] xl:w-[50%] md:w-[60%] w-[100%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              : "hidden"
                          }`}
                        >
                          APPLY
                        </button>
                        <div className="grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-3 ">
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

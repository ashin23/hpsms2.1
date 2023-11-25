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
  const [email, setEmail] = useState("");

  const [showTerms, setTerms] = useState(false);
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setCode] = useState("");
  const [verCode, setVerCode] = useState();

  const [view, setView] = useState(false);
  const [view1, setView1] = useState(false);

  const [name, setName] = useState("");
  const [mobile_No, setMobile_No] = useState("");
  const [age, setAge] = useState("");
  const [city_Address, setCity_Address] = useState("");
  const [religion, setReligion] = useState("");
  const [sex, setSex] = useState("Select Here");
  const [provincial_Address, setProvincial_Address] = useState("");
  const [date_of_Birth, setDate_of_Birth] = useState("");
  const [civil_Status, setCivil_Status] = useState("Select Here");
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
  const [terms1, setTerms1] = useState("");
  const [files, setFiles] = useState([]);

  const Notify = () => {};

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);

  function close() {
    setVerCode("");
    isRegisterClose();
  }

  //code generator
  useEffect(() => {
    codeGenerator();
  }, []);

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
  }
  const HandleSendCode = () => {
    if (!email) {
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
    // emailjs.send(
    //   "service_yj6ye3j",
    //   "template_aek4udy",
    //   {
    //     email2: email,
    //     code: otpCode,
    //   },
    //   "-qtQXoQ1iYx4JDljO"
    // );
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
  };

  const HandleCreate = async () => {
    try {
      if (
        !email ||
        !password ||
        !name ||
        !mobile_No ||
        !age ||
        !city_Address ||
        !religion ||
        !provincial_Address ||
        !date_of_Birth ||
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
        !files ||
        civil_Status === "Select Here" ||
        sex === "Select Here"
      ) {
        toast.warning(
          `${
            ((!email ||
              !password ||
              !name ||
              !mobile_No ||
              !age ||
              !city_Address ||
              !religion ||
              !provincial_Address ||
              !date_of_Birth ||
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
              !tin_No) &&
              "Please fill up the blanks") ||
            (sex === "Select Here" && "Select Sex") ||
            (!date_of_Birth && "Date of birth is required") ||
            (!civil_Status === "Select Here" && "Select civil status")||
            (!files  && "Photo is required")
          }`,
          {
            position: "top-center",
            autoClose: 3000,
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
        if (password2 === password && verCode === otpCode && terms1) {
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
              uuid: uuidv4(),
            },
          ]);
          const { data1, error1 } = await supabase.storage
          .from("Files")
          .upload(email + "/" + uuidv4(), files, { contentType: "image/jpg , image/png" });

          setEmail("");
          setPassword("");
          setName("");
          setFiles("");
          setMobile_No("");
          setAge("");
          setCity_Address("");
          setReligion("");
          setSex("Select Here");
          setCivil_Status("Select Here");
          setProvincial_Address("");
          setDate_of_Birth("");
          setCivil_Status("");
          setName_of_Mother("");
          setOccupation_Mother("");
          setName_of_Father("");
          setOccupation_Father("");
          setNotify_Emergency("");
          setRelationship("");
          setEmergency_Address("");
          setContact_Number("");
          setCollege("");
          setCollege_Graduated("");
          setCourse("");
          setSpecial_Course("");
          setVocational("");
          setVocational_Graduated("");
          setHighSchool("");
          setHighSchool_Graduated("");
          setElementary("");
          setElementary_Graduated("");
          setInclusive_Dates("");
          setCompany_History("");
          setPosition_History("");
          setName_References("");
          setCompany_References("");
          setPosition_References("");
          setSSS_Number("");
          setPag_Ibig_No("");
          setPhil_Health_No("");
          setTin_No("");

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
            close();
          }, [3000]);
        } else if (password !== password2) {
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
        } else if (!terms1) {
          toast.warning("Please check terms and conditions", {
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
        } else {
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
        }
      }
    } catch (error) {}
  };

  
  if (!isRegister) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex "
    >
      <div className="overflow-y-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[80%] rounded-3xl  pb-6 px-5 md:px-14 shadow-2xl">
        <div className="sticky top-0 bg-white  w-full h-[40%] md:h-[13%] p-5">
          <div className="md:flex md:justify-between  grid grid-cols-1  ">
            <button
              onClick={() => HandleCreate()}
              className="text-white md:ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <label className="md:-ml-7 font-semibold text-xl">
              Type N.A. if the data is not available.
            </label>

            <button
              onClick={() => isRegisterClose()}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Email"
                type="text"
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
                    value={verCode}
                    onChange={(e) => setVerCode(e.target.value)}
                    type="number"
                  ></input>
                  <button
                    onClick={() => HandleSendCode()}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
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
                value={name}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">City Address</label>
              <input
                value={city_Address}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="City Address"
                onChange={(e) => setCity_Address(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Provincial Address</label>
              <input
                value={provincial_Address}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Provincial Address"
                onChange={(e) => setProvincial_Address(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Mobile No.</label>
              <input
                value={mobile_No}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Mobile Number"
                onChange={(e) => setMobile_No(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Religion</label>
              <input
                value={religion}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Religion"
                onChange={(e) => setReligion(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Date of Birth</label>
              <input
                value={date_of_Birth}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Date of Birth"
                onChange={(e) => setDate_of_Birth(e.target.value)}
                type="date"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Age</label>
              <input
                value={age}
                className="pl-10 pr-3 py-2 w-[100%] lg:w-[90%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
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
                value={civil_Status}
                onChange={(e) => setCivil_Status(e.target.value)}
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
                value={name_of_Mother}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name of Mother"
                onChange={(e) => setName_of_Mother(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Occupation</label>
              <input
                value={occupation_Mother}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Occupation"
                onChange={(e) => setOccupation_Mother(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Name of Father</label>
              <input
                value={name_of_Father}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Occupation"
                onChange={(e) => setName_of_Father(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Occupation</label>
              <input
                value={occupation_Father}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Name of Father"
                onChange={(e) => setOccupation_Father(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">
                Person to Notify Incase of Emergency
              </label>
              <input
                value={notify_Emergency}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Notify"
                onChange={(e) => setNotify_Emergency(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Relationship</label>
              <input
                value={relationship}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Relationship"
                onChange={(e) => setRelationship(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">His/her Address</label>
              <input
                value={emegency_Address}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Address"
                onChange={(e) => setEmergency_Address(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Contact No:</label>
              <input
                value={contact_Number}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Number"
                onChange={(e) => setContact_Number(e.target.value)}
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
                value={college}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="College"
                onChange={(e) => setCollege(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                value={college_Graduated}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={(e) => setCollege_Graduated(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Course</label>
              <input
                value={course}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Course"
                onChange={(e) => setCourse(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">
                Special Course & Training
              </label>
              <input
                value={special_Course}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Course & Training"
                onChange={(e) => setSpecial_Course(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Senior HighSchool</label>
              <input
                value={vocational}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={(e) => setVocational(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                value={vocational_Graduated}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={(e) => setVocational_Graduated(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">High School</label>
              <input
                value={highSchool}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="High School"
                onChange={(e) => setHighSchool(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                value={highSchool_Graduated}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={(e) => setHighSchool_Graduated(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Elementary School</label>
              <input
                value={elementary}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Elementary School"
                onChange={(e) => setElementary(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Year Graduated</label>
              <input
                value={elementary_Graduated}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Year Graduated"
                onChange={(e) => setElementary_Graduated(e.target.value)}
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
                value={inclusive_Dates}
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
                value={company_History}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setCompany_History(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="flex justify-center font-bold md:ml-[30%]">
                Position
              </label>
              <textarea
                value={position_History}
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
                value={name_References}
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
                value={company_References}
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
                value={position_References}
                className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                type="text"
                onChange={(e) => setPosition_References(e.target.value)}
              ></textarea>
            </div>
          </div>
          <label className="flex font-bold ">Upload Image</label>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            // for="multiple_files"
          >
            Upload Image
          </label>
          <input
            // value={files}
            className="block w-[250px] px-5 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400"
            // id="multiple_files"
            type="file"
            onChange={(e) => setFiles(e.target.files[0])}
            accept="image/png, image/jpeg"
          ></input>
          <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
            <div>
              <label className="flex font-bold">SSS No:</label>
              <input
                value={sSS_Number}
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%]  font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="SSS Number"
                onChange={(e) => setSSS_Number(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Phil Health No:</label>
              <input
                value={phil_Health_No}
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Phil Heatlh Number"
                onChange={(e) => setPhil_Health_No(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Pag-IBIG No:</label>
              <input
                value={pag_Ibig_No}
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Pag-IBIG Number"
                onChange={(e) => setPag_Ibig_No(e.target.value)}
                type="text"
              ></input>
            </div>
            <div>
              <label className="flex font-bold">Tin No:</label>
              <input
                value={tin_No}
                className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Tin Number"
                onChange={(e) => setTin_No(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                onChange={(e) => setTerms1(e.target.checked)}
              />
              <button
                className="border-b-2 border-blue-400"
                onClick={() => setTerms(true)}
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
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect, useRef } from "react";
import logo from "./images/hotelproimage.png";
import { Link } from "react-router-dom";
import PostJob from "./PostJob";
import Request from "./Request";
import AccountSetting from "./AccountSetting";
import Signin from "./Signin";
import supabase from "./supabaseClient";
import Profile from "./Profile";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiFillHome, AiFillFile } from "react-icons/ai";
import { MdManageAccounts, MdPostAdd, MdMarkEmailUnread } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { PiBooks } from "react-icons/pi";
import { FaUpload } from "react-icons/fa";
import Notifications from "./Notifications";
import { ToastContainer } from "react-toastify";
import moment from "moment";
const Navbar = ({
  setEmailSend,
  applicant1,
  hrdashboard,
  admindashboard,
  setemailcoord,
  setaccettingemp,
  setuserauth,
}) => {
  const navigate = useNavigate();
  const [showModalPostJob, setShowPostJob] = useState(false);
  const [showModalRequest, setShowRequest] = useState(false);
  const [showModalAcc, setShowAcc] = useState(false);
  const [showModalSignin, setModalSignin] = useState(false);
  const [showModalUpload, setModalUpload] = useState(false);
  const [showmodalProfile, setModalProfile] = useState(false);
  const [modalnotifications, setmodalnotifications] = useState(false);

  const [menu, setMenu] = useState(false);

  const [notifapplicant, setNotif] = useState(false);
  const [notifque, setNotifque] = useState(false);
  const [notifemp, setNotifemp] = useState(false);
  const [notifarch, setNotifarch] = useState(false);
  const [notifreq, setNotifreq] = useState(false);

  const [emp, setEmp] = useState(false);
  const [applicant, setApplicant] = useState(false);
  const [coordinator, setCoordinator] = useState(false);
  const [hr, setHR] = useState(false);
  const [admin, setAdmin] = useState(false);
  const generatedToken = uuidv4();
  const [email, setEmail] = useState("");
  //AOS

  // Sign in
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      HandleCheckerUser();
      document.getElementById("signIn").hidden = true;
    } else {
      // setModalSignin(true);

      document.getElementById("signOut").hidden = true;
    }

    const channels = supabase
      .channel("custom-delete-channel")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "Employee_List" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "NewUser" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "UserList" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Employee_List" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "NewUser" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "UserList" },
        (payload) => {
          HandleCheckerUser();
        }
      )
      .subscribe();
  }, []);
  //Notifications realtime
  useEffect(() => {
    getnotifapplicant();
    getnotifque();
    getnotifemp();
    getnotiarch();
    getnotifreq();

    const Applicant_List = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Applicant_List" },
        (payload) => {
          getnotifapplicant();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Queuing_List" },
        (payload) => {
          getnotifque();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Employee_List" },
        (payload) => {
          getnotifemp();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Archive_List" },
        (payload) => {
          getnotiarch();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        (payload) => {
          getnotifreq();
        }
      )
      .subscribe();
  }, []);

  async function HandleCheckerUser() {
    const { data: applist } = await supabase.from("NewUser").select();
    const { data: user } = await supabase.from("UserList").select();
    const { data: emp } = await supabase.from("Employee_List").select();
    var data = applist.concat(user, emp);
    if (applist && user && emp) {
      for (let index = 0; index < data.length; index++) {
        if (
          data[index].token === window.localStorage.getItem("token") &&
          data[index].userlvl !== "Restricted"
        ) {
          checker(
            true,
            data[index].userlvl,
            data[index].Email,
            data[index].token
          );
          document.getElementById("signIn").hidden = true;
          document.getElementById("signOut").hidden = false;
          return;
        }
      }
    }
    document.getElementById("signOut").hidden = false;
    window.localStorage.clear();
    window.location.reload();
    return;
  }

  function handleSignOut() {
    navigate("/");
    setHR(false);
    setAdmin(false);
    setApplicant(false);
    setCoordinator(false);
    setuserauth("");
    window.localStorage.clear();
    window.location.reload();
  }

  async function checker(verify, userlvl, email, token) {
    if (email) {
      try {
        // Applicant
        if (verify === true && userlvl === "applicant") {
          if (window.localStorage.getItem("token") === token) {
            const { data: getterApplicant } = await supabase
              .from("NewUser")
              .select()
              .eq("token", window.localStorage.getItem("token"))
              .single();
            await setEmail(getterApplicant);
            applicant1(getterApplicant);
            setEmailSend(getterApplicant);
            setuserauth("applicant");
            setApplicant(true);
            document.getElementById("signIn").hidden = true;
            document.getElementById("signOut").hidden = false;
            return;
          } else {
            const { data: getterApplicant } = await supabase
              .from("NewUser")
              .select()
              .eq("Email", email)
              .single();
            await setEmail(getterApplicant);
            applicant1(getterApplicant);
            setEmailSend(getterApplicant);
            setuserauth("applicant");
            const { data: userlist } = await supabase
              .from("NewUser")
              .update({ token: generatedToken })
              .eq("Email", email)
              .single();
            localStorage.setItem("token", generatedToken);
            setApplicant(true);
            document.getElementById("signIn").hidden = true;
            document.getElementById("signOut").hidden = false;
            return;
          }
        }
        // Coordinator

        if (verify === true && userlvl === "Coordinator") {
          window.localStorage.setItem("email", email);
          try {
            if (window.localStorage.getItem("token") === token) {
              const { data: getterCoordinator } = await supabase
                .from("UserList")
                .select()
                .eq("token", window.localStorage.getItem("token"))
                .single();
              await setEmail(getterCoordinator);
              setemailcoord(getterCoordinator);
              setuserauth("Coordinator");
              setCoordinator(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            } else {
              const { data: getterCoordinator } = await supabase
                .from("UserList")
                .select()
                .eq("Email", email)
                .single();
              await setEmail(getterCoordinator);
              setemailcoord(getterCoordinator);
              setuserauth("Coordinator");
              const { data: userlist } = await supabase
                .from("UserList")
                .update({ token: generatedToken })
                .eq("Email", email)
                .single();

              localStorage.setItem("token", generatedToken);
              setCoordinator(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            }
          } catch (error) {}
        }

        // Employee
        if (verify === true && userlvl === "Employee") {
          try {
            if (window.localStorage.getItem("token") === token) {
              const { data: emp2 } = await supabase
                .from("Employee_List")
                .select()
                .eq("token", window.localStorage.getItem("token"))
                .single();
              if (emp2) await setEmail(emp2);
              setuserauth("Employee");
              const { data: User } = await supabase
                .from("UserList")
                .select()
                .eq("token", window.localStorage.getItem("token"))
                .single();
              if (User) await setEmail(User);
              setuserauth("Employee");
              setEmp(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;

              return;
            } else {
              const { data: emp1 } = await supabase
                .from("Employee_List")
                .select()
                .eq("Email", email)
                .single();
              if (emp1) await setEmail(emp1);
              setuserauth("Employee");
              const { data: emp } = await supabase
                .from("Employee_List")
                .update({ token: generatedToken })
                .eq("Email", email)
                .single();

              const { data: getterEmp1 } = await supabase
                .from("UserList")
                .select()
                .eq("Email", email)
                .single();
              if (getterEmp1) await setEmail(getterEmp1);
              setuserauth("Employee");
              const { data: userlist } = await supabase
                .from("UserList")
                .update({ token: generatedToken })
                .eq("Email", email)
                .single();
              localStorage.setItem("token", generatedToken);
              setEmp(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            }
          } catch (error) {}
        }
        // HR
        if (verify === true && userlvl === "HR") {
          window.localStorage.setItem("email", email);
          try {
            if (window.localStorage.getItem("token") === token) {
              const { data: getterHR } = await supabase
                .from("UserList")
                .select()
                .eq("token", window.localStorage.getItem("token"))
                .single();
              await setEmail(getterHR);
              hrdashboard(getterHR);
              setuserauth("HR");
              setHR(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            } else {
              const { data: getterHR } = await supabase
                .from("UserList")
                .select()
                .eq("Email", email)
                .single();
              await setEmail(getterHR);
              setuserauth("HR");
              hrdashboard(getterHR);
              const { data: userlist } = await supabase
                .from("UserList")
                .update({ token: generatedToken })
                .eq("Email", email)
                .single();
              localStorage.setItem("token", generatedToken);
              setHR(true);
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            }
          } catch (error) {}
        }
        //admin
        if (verify === true && userlvl === "admin") {
          window.localStorage.setItem("email", email);
          try {
            if (window.localStorage.getItem("token") === token) {
              const { data: getterAdmin } = await supabase
                .from("UserList")
                .select()
                .eq("token", window.localStorage.getItem("token"))
                .single();
              if (getterAdmin) await setEmail(getterAdmin);
              admindashboard(getterAdmin);
              setAdmin(true);
              setHR(true);
              setuserauth("admin");
              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            } else {
              const { data: getterAdmin } = await supabase
                .from("UserList")
                .select()
                .eq("Email", email)
                .single();
              if (getterAdmin) await setEmail(getterAdmin);
              setuserauth("admin");
              admindashboard(getterAdmin);
              const { data: userlist } = await supabase
                .from("UserList")
                .update({ token: generatedToken })
                .eq("Email", email)
                .single();
              localStorage.setItem("token", generatedToken);
              setAdmin(true);
              setHR(true);

              document.getElementById("signIn").hidden = true;
              document.getElementById("signOut").hidden = false;
              return;
            }
          } catch (error) {}
        }
      } catch (error) {}
    }
  }

  async function getnotifreq() {
    const { data: notifreq } = await supabase.from("Request").select();
    for (let index = 0; index < notifreq.length; index++) {
      if (notifreq[index].Notifications === "false") {
        setNotifreq(true);
        return;
      }
    }
    setNotifreq(false);
    return;
  }

  async function getnotifapplicant() {
    const { data: notif } = await supabase.from("Applicant_List").select();
    for (let index = 0; index < notif.length; index++) {
      if (notif[index].Notifications === "false") {
        setNotif(true);
        return;
      }
    }
    setNotif(false);
    return;
  }

  async function getnotifque() {
    const { data: notifq } = await supabase.from("Queuing_List").select();
    for (let index = 0; index < notifq.length; index++) {
      if (moment(notifq[index].created_at).isBefore(new Date())) {
        if (notifq[index].Notifications === "false") {
          setNotifque(true);
          return;
        }
      }
    }
    setNotifque(false);
    return;
  }

  async function getnotifemp() {
    const { data: notifemp } = await supabase.from("Employee_List").select();
    for (let index = 0; index < notifemp.length; index++) {
      if (moment(notifemp[index].created_at).isBefore(new Date())) {
        if (notifemp[index].Notifications === "false") {
          setNotifemp(true);
          return;
        }
      }
    }
    setNotifemp(false);
    return;
  }

  async function getnotiarch() {
    const { data: notifarch } = await supabase.from("Archive_List").select();
    for (let index = 0; index < notifarch.length; index++) {
      if (notifarch[index].Notifications === "false") {
        setNotifarch(true);
        return;
      }
    }
    setNotifarch(false);
    return;
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchNotif();
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Applicant_List" },
        (payload) => {
          fetchNotif();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Queuing_List" },
        (payload) => {
          fetchNotif();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Archive_List" },
        (payload) => {
          fetchNotif();
        }
      )
      .subscribe();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
  }, [email]);

  if (
    showModalAcc ||
    showModalSignin ||
    showModalPostJob ||
    showModalRequest ||
    showModalUpload ||
    showmodalProfile ||
    modalnotifications
  )
    document.body.style.overflow = "hidden";
  else document.body.style.overflow = "unset";

  const [data, setdata] = useState([]);

  const fetchNotif = async () => {
    var array = data;
    const { data: notifapp } = await supabase.from("Applicant_List").select();
    const { data: archive } = await supabase.from("Archive_List").select();
    const { data: que } = await supabase.from("Queuing_List").select();
    var supadata = notifapp.concat(archive, que);

    if (email?.Email) {
      for (let index = 0; index < supadata.length; index++) {
        if (email?.Email === supadata[index].Email) {
          array = array.concat(...data, supadata[index]);
          setdata(array);
        }
      }
    }
  };

  return (
    <div className="h-2  ">
      <div className="flex   gap-5 bg-white text-white font-bold w-screen h-[83px] py-2 md:text-sm text-lg  ">
        <div className=" md:w-[200px] w-[130px] flex gap-1 items-center md:font-bold  text-sm ">
          <img src={logo} alt="/" className="h-[60px] w-fit  ml-3 "></img>
          <p className=" text-2xl  md:text-5xl ml-5  text-[#162388] md:flex hidden">
            HPSMS
          </p>
        </div>

        <div className=" w-[90%]  justify-end flex p-4 md:text-lg text-sm  rounded-lg text-white font-semibold gap-4 items-center">
          <Link
            to="/"
            className={`${
              applicant || coordinator || hr || emp || admin
                ? "flex hover:border-b-4 hover:border-blue-500  p-1  rounded-md h-fit "
                : "hidden"
            } `}
          >
            <AiFillHome className="mt-1 text-[20px] text-[#162388] flex md:hidden " />
            <label className="md:flex hidden text-[#162388]">Job Search</label>
          </Link>

          <div
            onClick={() => setMenu(!menu)}
            className={`${
              hr || admin
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit "
                : "hidden"
            }`}
          >
            {notifapplicant && (
              <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
            )}
            {notifque && (
              <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
            )}
            {notifemp && (
              <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
            )}
            {notifarch && (
              <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
            )}
            {notifreq && (
              <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
            )}
            <PiBooks className="mt-1 text-[20px] text-[#162388] flex md:hidden" />
            <label className="md:flex hidden text-[#162388]">Module</label>
            {menu && (
              <ul
                className={`${
                  menu
                    ? "absolute bg-[#3F83F8] md:h-[18rem] gap-2  rounded-lg p-3 mt-9"
                    : "hidden"
                }`}
              >
                <li>
                  <Link
                    className={`${
                      hr
                        ? "flex hover:bg-sky-400 hover:text-white p-2  rounded-lg"
                        : "hidden"
                    }`}
                    to="/Applicant"
                  >
                    {notifapplicant && (
                      <IoMdNotifications className=" text-red-500 text-[20px] " />
                    )}
                    Applicants Lists
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      hr
                        ? "flex hover:bg-sky-400  hover:text-white p-2  rounded-lg"
                        : "hidden"
                    }`}
                    to="/Quelist"
                  >
                    {notifque && (
                      <IoMdNotifications className=" text-red-500 text-[20px] " />
                    )}{" "}
                    Queuing List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Employee"
                    className={`${
                      hr
                        ? "flex hover:bg-sky-400 hover:text-white p-2 rounded-lg"
                        : "hidden"
                    }`}
                  >
                    {notifemp && (
                      <IoMdNotifications className=" text-red-500 text-[20px] " />
                    )}
                    Employee List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Archive"
                    className={`${
                      hr
                        ? "flex hover:bg-sky-400 hover:text-white p-2  rounded-lg"
                        : "hidden"
                    }`}
                  >
                    {notifarch && (
                      <IoMdNotifications className=" text-red-500 text-[20px] " />
                    )}{" "}
                    Archive
                  </Link>
                </li>
                <li>
                  <Link
                    to="/RequestList"
                    className={`${
                      hr
                        ? "flex hover:bg-sky-400 hover:text-white p-2   rounded-lg"
                        : "hidden"
                    }`}
                  >
                    {notifreq && (
                      <IoMdNotifications className=" text-red-500 text-[20px] " />
                    )}{" "}
                    Request List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/UserList"
                    className={`${
                      admin
                        ? " flex hover:bg-sky-400 hover:text-white p-2   rounded-lg "
                        : "hidden"
                    }`}
                  >
                    User List
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <button
            onClick={() => setShowAcc(true)}
            className={`${
              hr || coordinator || emp || admin || applicant
                ? " flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden"
            }`}
          >
            <MdManageAccounts className="mt-1 text-[20px] flex md:hidden text-[#162388]" />
            <label className="md:flex hidden text-[#162388]">
              Account Settings
            </label>
          </button>

          {/* Coordinator */}
          <button
            className={`${
              coordinator
                ? " flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden "
            }`}
            onClick={() => setShowRequest(true)}
          >
            <MdMarkEmailUnread className="mt-1 text-[20px] flex md:hidden text-[#162388]" />{" "}
            <label className="md:flex hidden text-[#162388]">Request</label>
          </button>

          <Link
            to="/EmployeeCoord"
            className={`${
              coordinator
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden "
            }`}
          >
            <AiFillFile className="mt-1 text-[20px] flex md:hidden text-[#162388]" />
            <label className="md:flex hidden text-[#162388]">
              Employee List
            </label>
          </Link>

          <button
            onClick={() => setModalUpload(true)}
            className={`${
              emp
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden"
            }`}
          >
            <FaUpload className="mt-1 text-[20px] flex md:hidden text-[#162388]" />
            <label className="md:flex hidden text-[#162388]">Upload</label>
          </button>

          <button
            onClick={() => setShowPostJob(true)}
            className={`${
              hr
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden"
            }`}
          >
            <MdPostAdd className="mt-1 text-[20px] flex md:hidden text-[#162388]" />{" "}
            <label className="md:flex hidden text-[#162388]">Post A Job</label>
          </button>
          <button
            onClick={() => setModalProfile(true)}
            className={`${
              applicant
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden"
            }`}
          >
            {" "}
            <RiProfileLine className="mt-1 text-[20px] flex md:hidden text-[#162388]" />
            <label className="md:flex hidden text-[#162388]">Profile</label>
          </button>
          <button
            onClick={() => setmodalnotifications(true)}
            className={`${
              applicant
                ? "flex hover:border-b-4 hover:border-blue-500  p-1 rounded-md  h-fit"
                : "hidden"
            }`}
          >
            {" "}
            <IoMdNotifications className="mt-1 text-[20px] flex md:hidden text-[#162388]" />
            <label className="md:flex hidden text-[#162388]">Status</label>
          </button>
        </div>
        <div className="    rounded-md items-center flex">
          <button
            id="signIn"
            onClick={() => setModalSignin(true)}
            className="md:text-base text-sm w-[90px] h-fit  hover:border-b-4 hover:border-blue-500 p-2 md:mr-5 mr-3 text-[#162388]"
          >
            Sign In
          </button>

          <button
            id="signOut"
            onClick={() => handleSignOut()}
            className="md:text-base text-sm w-[90px] h-fit  hover:border-b-4 hover:border-blue-500 p-2 md:mr-5 mr-3 text-[#162388]"
          >
            Sign Out
          </button>
        </div>
      </div>

      <Notifications
        isOpen={modalnotifications}
        isClose={() => setmodalnotifications(false)}
        email={email}
        data={data}
      />

      <Profile
        isProfile={showmodalProfile}
        isProfileclose={() => setModalProfile(false)}
        email2={email}
        applicant={applicant}
      />

      <PostJob
        isPost={showModalPostJob}
        isPostClose={() => setShowPostJob(false)}
      />

      <Request
        isVisible5={showModalRequest}
        onClose5={() => setShowRequest(false)}
        email={email}
      />
      <AccountSetting
        isAcc={showModalAcc}
        isAccClose={() => setShowAcc(false)}
        applicant={applicant}
        coordinator={coordinator}
        hr={hr}
        admin={admin}
        email2={email}
        emp={emp}
      />

      <Signin
        isSignin={showModalSignin}
        isSignClose={() => setModalSignin(false)}
        checker={checker}
        setEmail={setEmail}
      />
      <Upload
        isUpload={showModalUpload}
        isCloseUpload={() => setModalUpload(false)}
        email={email}
      />
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

export default Navbar;

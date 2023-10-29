import React, { useState, useEffect } from "react";
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
const Navbar = ({ setEmailSend, applicant1, hrdashboard, admindashboard,setemailcoord }) => {
  const navigate = useNavigate();
  const [showModalPostJob, setShowPostJob] = useState(false);
  const [showModalRequest, setShowRequest] = useState(false);
  const [showModalAcc, setShowAcc] = useState(false);
  const [showModalSignin, setModalSignin] = useState(false);
  const [showModalUpload, setModalUpload] = useState(false);
  const [showmodalProfile, setModalProfile] = useState(false);

  const [menu, setMenu] = useState(true);

  const [notif, setNotif] = useState("");
  const [notifque, setNotifque] = useState("");
  const [notifemp, setNotifemp] = useState("");
  const [notifarch, setNotifarch] = useState("");
  const [notifreq, setNotifreq] = useState("");

  const [emp, setEmp] = useState(false);
  const [applicant, setApplicant] = useState(false);
  const [coordinator, setCoordinator] = useState(false);
  const [hr, setHR] = useState(false);
  const [admin, setAdmin] = useState(false);
  const generatedToken = uuidv4();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      HandleCheckerUser();
      document.getElementById("signIn").hidden = true;
    } else {
      setModalSignin(true);
      document.getElementById("signOut").hidden = true;
    }
    getnotif();
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
          getnotif();
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

    var data = applist.concat(user);
    if (applist && user) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].token === window.localStorage.getItem("token")) {
          checker(
            true,
            data[index].userlvl,
            data[index].Email,
            data[index].token
          );
          document.getElementById("signIn").hidden = true;
          document.getElementById("signOut").hidden = false;
          return;
        } else {
          document.getElementById("signOut").hidden = true;
        }
      }
    }
  }

  function handleSignOut() {
    navigate("/");
    setHR(false);
    setAdmin(false);
    setApplicant(false);
    setCoordinator(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
    window.location.reload();
  }

  async function checker(verify, userlvl, email, token) {
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
    } catch (error) {}

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
          setemailcoord(getterCoordinator)
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
          setemailcoord(getterCoordinator)
          
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
          const { data: getterEmp } = await supabase
            .from("UserList")
            .select()
            .eq("token", window.localStorage.getItem("token"))
            .single();
          await setEmail(getterEmp);
          setEmp(true);
          document.getElementById("signIn").hidden = true;
          document.getElementById("signOut").hidden = false;
          return;
        } else {
          const { data: getterEmp } = await supabase
            .from("UserList")
            .select()
            .eq("Email", email)
            .single();
          await setEmail(getterEmp);
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
      try {
        if (window.localStorage.getItem("token") === token) {
          const { data: getterHR } = await supabase
            .from("UserList")
            .select()
            .eq("token", window.localStorage.getItem("token"))
            .single();
          await setEmail(getterHR);
          hrdashboard(getterHR);
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
          admindashboard(getterAdmin)
          setAdmin(true);
          setHR(true);

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
          admindashboard(getterAdmin)
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
  }

  async function getnotifreq() {
    const { data: notifreq } = await supabase.from("Request").select();
    for (let index = 0; index < notifreq.length; index++) {
      if (notifreq[index].Notifications === "true") {
        setNotifreq(true);
        return;
      }
      if (notifreq[index].Notifications === "false") {
        setNotifreq(false);
        return;
      }
    }
  }

  async function getnotif() {
    const { data: notif } = await supabase.from("Applicant_List").select();
    for (let index = 0; index < notif.length; index++) {
      if (notif[index].Notifications === "true") {
        setNotif(true);
        return;
      }
      if (notif[index].Notifications === "false") {
        setNotif(false);
        return;
      }
    }
  }

  async function getnotifque() {
    const { data: notifq } = await supabase.from("Queuing_List").select();
    for (let index = 0; index < notifq.length; index++) {
      if (notifq[index].Notifications === "true") {
        setNotifque(true);
        return;
      }
      if (notifq[index].Notifications === "false") {
        setNotifque(false);
        return;
      }
    }
  }

  async function getnotifemp() {
    const { data: notifemp } = await supabase.from("Employee_List").select();
    for (let index = 0; index < notifemp.length; index++) {
      if (notifemp[index].Notifications === "true") {
        setNotifemp(true);
        return;
      }
      if (notifemp[index].Notifications === "false") {
        setNotifemp(false);
        return;
      }
    }
  }

  async function getnotiarch() {
    const { data: notifarch } = await supabase.from("Archive_List").select();
    for (let index = 0; index < notifarch.length; index++) {
      if (notifarch[index].Notifications === "true") {
        setNotifarch(true);
        return;
      }
      if (notifarch[index].Notifications === "false") {
        setNotifarch(false);
        return;
      }
    }
  }

  return (
    <div className="h-2 w-full">
      <div className="flex gap-5 bg-[#162388] text-white font-bold text-lg h-[83px] py-2 ">
        <div className="flex place-content-center justify-between ">
          <p className="ml-5 pt-3 text-[50px]">HPSMS</p>
          <img src={logo} alt="/" className="h-[50px] w-[70px] pt-3 ml-3"></img>
        </div>

        <div className="flex w-[80%] p-4 md:text-lg text-sm  ml-[10%]  rounded-lg text-white font-mono gap-4 ">
          <Link
            to="/"
            className={`${
              applicant || coordinator || hr || emp || admin
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden"
            } `}
          >
            <AiFillHome className="mt-1 text-[20px]" /> Home
          </Link>

          <div>
            <div
              onClick={() => {
                setMenu(!menu);
              }}
              onMouseLeave={() => setMenu(!menu)}
              className={`${
                hr || admin
                  ? "flex hover:bg-sky-400  hover:text-white p-2  rounded-lg  pt-2"
                  : "hidden"
              }`}
            >
              {notif !== true && (
                <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
              )}
              {notifque !== true && (
                <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
              )}
              {notifemp !== true && (
                <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
              )}
              {notifarch !== true && (
                <IoMdNotifications className="absolute text-red-500 text-[20px] -mt-3.5 -ml-3" />
              )}
              <PiBooks className="mt-1 text-[20px]" />
              Module
              <ul
                className={`${
                  menu
                    ? "hidden"
                    : "absolute bg-[#3F83F8] h-[18rem] gap-2  rounded-lg p-3 mt-9"
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
                    {notif !== true && (
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
                    {notifque !== true && (
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
                    {notifemp !== true && (
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
                    {notifarch !== true && (
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
            </div>
          </div>
          <button
            onClick={() => setShowAcc(true)}
            className={`${
              hr || coordinator || emp || admin || applicant
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden"
            }`}
          >
            <MdManageAccounts className="mt-1 text-[20px]" /> Account Managent
          </button>

          {/* Coordinator */}
          <button
            className={`${
              coordinator
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden "
            }`}
            onClick={() => setShowRequest(true)}
          >
            <MdMarkEmailUnread className="mt-1 text-[20px]" /> Request
          </button>

          <Link
            to="/EmployeeCoord"
            className={`${
              coordinator
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden "
            }`}
          >
            <AiFillFile className="mt-1 text-[20px]" /> Employee List
          </Link>

          <button
            onClick={() => setModalUpload(true)}
            className={`${
              emp
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden"
            }`}
          >
            <FaUpload className="mt-1 text-[20px]" /> Upload
          </button>

          <button
            onClick={() => setShowPostJob(true)}
            className={`${
              hr
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden"
            }`}
          >
            {" "}
            <MdPostAdd className="mt-1 text-[20px]" /> Post a Job
          </button>
          <button
            onClick={() => setModalProfile(true)}
            className={`${
              applicant
                ? "flex hover:bg-sky-400  hover:text-white p-[0.5%]  rounded-lg h-fit"
                : "hidden"
            }`}
          >
            {" "}
            <RiProfileLine className="mt-1 text-[20px]" /> Profile
          </button>
        </div>
        <div className="absolute right-10  hover:bg-blue-600 translate-x-2 p-2 rounded-md gap-5 h-fit">
          <div id="signIn">
            <button onClick={() => setModalSignin(true)}>Sign In</button>
          </div>
          <div id="signOut">
            <button onClick={() => handleSignOut()}>Sign Out</button>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Navbar;

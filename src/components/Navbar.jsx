import React, { useState, useEffect } from "react";
import logo from "./images/hotelproimage.png";
import { Link } from "react-router-dom";
import PostJob from "./PostJob";
import Request from "./Request";
import AccountSetting from "./AccountSetting";
import Signin from "./Signin";
import supabase from "./supabaseClient";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


const Navbar = ({ setEmailSend }) => {
  const navigate = useNavigate();
  const [showModalPostJob, setShowPostJob] = useState(false);
  const [showModalRequest, setShowRequest] = useState(false);
  const [showModalAcc, setShowAcc] = useState(false);
  const [showModalSignin, setModalSignin] = useState(false);
  const [showModalUpload, setModalUpload] = useState(false);

  const [menu,setMenu] = useState(true)

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
  }, []);

  async function HandleCheckerUser() {
    const { data: applist } = await supabase.from("NewUser").select();
    const { data: user } = await supabase.from("UserList").select();

    var data = applist.concat(user);
    if (applist && user) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].token === window.localStorage.getItem("token")) {
          console.log("Line 42");
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
          await setEmail(getterAdmin);
          setAdmin(true);
          setHR(true);
          setCoordinator(true);
          document.getElementById("signIn").hidden = true;
          document.getElementById("signOut").hidden = false;
          return;
        } else {
          const { data: getterAdmin } = await supabase
            .from("UserList")
            .select()
            .eq("Email", email)
            .single();
          await setEmail(getterAdmin);

          const { data: userlist } = await supabase
            .from("UserList")
            .update({ token: generatedToken })
            .eq("Email", email)
            .single();
          localStorage.setItem("token", generatedToken);
          setAdmin(true);
          setHR(true);
          setCoordinator(true);
          document.getElementById("signIn").hidden = true;
          document.getElementById("signOut").hidden = false;
          return;
        }
      } catch (error) {}
    }
  }

  return (
    <div className="h-2 w-screen">
      <div className="flex gap-5  bg-[#162388] text-white font-bold  text-lg ">
        
        <div className="flex  items-start ">
        <p className="ml-5 pt-3">HPSMS</p>
          <img src={logo} alt="/" className="h-[50px] w-[90px] pt-3 ml-3"></img>
        </div>

        <div className="flex  md:text-lg text-sm  ml-[23%] pt-2 rounded-lg text-white font-mono gap-4 ">
          <Link
            to="/"
            className={`hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg `}
          >
            Dashboard
          </Link>
          
          <div >
          <div onClick={() =>{setMenu(!menu)} } className={`${hr || coordinator || admin ?"hover:text-white p-[0.5%] hover:bg-sky-400 gap-2  pt-2" : "hidden"}`} > Module
          <ul className={`${menu ? "hidden" : "absolute bg-slate-400 gap-2  rounded-lg p-2"}`}> 
            <li> 
          <Link
            className={`${
              hr
                ? " hover:bg-sky-400 hover:text-white p-[0.5%]  rounded-lg"
                : "hidden"
            }`}
            to="/Applicant"
          >
            Applicants Lists
          </Link>
          </li>
          <li>
          <Link
            className={`${
              hr
                ? "hover:bg-sky-400  hover:text-white p-[0.5%] rounded-lg"
                : "hidden"
            }`}
            to="/Quelist"
          >
            Queuing List
          </Link>
          </li>
          <li>
          <Link
            to="/Employee"
            className={`${
              hr
                ? " hover:bg-sky-400 hover:text-white p-[0.5%]  rounded-lg"
                : "hidden"
            }`}
          >
            Employee List
          </Link>
          </li>
          <li>
          <Link
            to="/Archive"
            className={`${
              hr
                ? " hover:bg-sky-400 hover:text-white p-[0.5%] rounded-lg"
                : "hidden"
            }`}
          >
            Archive
          </Link>
          </li>
          <li>
          <Link
            to="/RequestList"
            className={`${
              hr
                ? "hover:bg-sky-400 hover:text-white p-[0.5%]  rounded-lg"
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
              hr
                ? " hover:bg-sky-400 hover:text-white p-[0.5%]  rounded-lg "
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
                ? "hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
                : "hidden"
            }`}
          >
            Account Managent
          </button>

          {/* Coordinator */}
          <button
            className={`${
              coordinator
                ? "hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
                : "hidden "
            }`}
            onClick={() => setShowRequest(true)}
          >
            Request
          </button>

          <Link
            to="/EmployeeCoord"
            className={`${
              coordinator
                ? "hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
                : "hidden "
            }`}
          >
            Employee List
          </Link>

          <button
            onClick={() => setModalUpload(true)}
            className={`${
              emp
                ? " hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg "
                : "hidden"
            }`}
          >
            Upload
          </button>

          <button
            onClick={() => setShowPostJob(true)}
            className={`${
              hr
                ? "hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
                : "hidden"
            }`}
          >
            {" "}
            Post a Job
          </button>
        </div>
        <div className="absolute right-10 top-5 hover:bg-blue-600 translate-x-2 p-2 rounded-md gap-5">
          <div id="signIn">
            <button onClick={() => setModalSignin(true)}>Sign In</button>
          </div>
          <div id="signOut">
            <button onClick={() => handleSignOut()}>Sign Out</button>
          </div>
        </div>
      </div>

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

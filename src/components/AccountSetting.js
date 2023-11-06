import React, { Fragment, useState } from "react";
import ModalCreateAcc from "./ModalCreateAcc";
import { useEffect } from "react";
import emailjs from "emailjs-com";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgArrowsExpandUpLeft } from "react-icons/cg";

const AccountSetting = ({
  isAcc,
  isAccClose,
  hr,
  admin,
  email2,
  emp,
  coordinator,
  applicant,
  accsettingemp
}) => {
  const [showModalCreateAcc, setShowCreateAcc] = useState(false);
  const [email, setEmail1] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [allow, setAllow] = useState(false);

  const [otpCode, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState(true);
  const [verCode, setVerCode] = useState();
  const [buttonChange, setbuttonChange] = useState(false);

  useEffect(() => {
    getter();
    codeGenerator();
  }, [hr, admin, emp, coordinator, applicant]);



  const getter = async () => {
    setEmail1(email2.Email);
    setPass(email2.Password);
  };

  function handleEdit() {
    document.getElementById("email").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("password1").disabled = false;
    document.getElementById("code").disabled = false;
    setAllow(true);
  }

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
  }

  const NotifyCode = () => {
    toast.success("Correct code", {
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

  const NotifyError = () => {
    toast.error("Incorrect Code", {
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
  function HandleCheckCode() {
    if (verCode === otpCode) {
      document.getElementById("saveChanges").disabled = false;
      NotifyCode();
      return;
    } else {
      NotifyError();
    }
  }

  const NotifyError2 = () => {
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
  const HandleSendCode = () => {
    if (!email) {
      NotifyError2();

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
    setbuttonChange(true);
  };

  async function saveChanges() {
    try {
      if (pass === pass1) {
        const { data: NewUserupdate } = await supabase
          .from("NewUser")
          .update({ Password: pass1 })
          .eq("Email", email)
          .single();

        const { data: UserListupdate } = await supabase
          .from("UserList")
          .update({ Password: pass1 })
          .eq("Email", email)
          .single();

        const { data: emp } = await supabase
          .from("Employee_List")
          .update({ Password: pass1 })
          .eq("Email", email)
          .single();
        alert("dsadsa");
      }
      alert("doenst match");
    } catch (error) {}
  }

  function close() {
    isAccClose();
    setAllow(false);
  }

  if (!isAcc) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex  w-screen h-screen"
      >
        <div className=" grid justify-center bg-white md:p-5  p-2 gap-3  md:h-[65%] lg:h-[70%] h-[80%] md:w-[30%] w-[100%] rounded-3xl shadow-2xl">
          <label
            className="flex p-3 px-3 text-slate-100 md:text-[30px] h-fit text-xl  text-center font-semibold
          bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            Account Settings
          </label>
          <div className="flex grid-cols-2 gap-5">
            <button
              onClick={() => handleEdit()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-lg text-sm md:p-4 p-2 w-[60px] md:w-[100px]  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
            dark:focus:ring-blue-800"
            >
              Edit
            </button>{" "}
            <button
              onClick={() => saveChanges()}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
             font-medium rounded-lg text-sm md:p-4 p-2 w-[60px] md:w-[100px] dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>
          </div>
          <label className="flex font-bold">Email</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 
          text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Email"
            type="text"
            disabled="true"
            value={email}
            id="email"
            onChange={(e) => setEmail1(e.target.value)}
          ></input>
          <label className="flex font-bold">Password</label>
          <input
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 
          text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Password"
            disabled="true"
            value={pass}
            id="password"
            onChange={(e) => setPass(e.target.value)}
            type="text"
          ></input>
          <label className="flex font-bold">Confirm Password</label>
          <input
            onChange={(e) => setPass1(e.target.value)}
            className={`${
              allow ? "bg-blue-200 " : ""
            } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
            placeholder="Confirm Password"
            disabled="true"
            id="password1"
            type="text"
          ></input>
          <div className="grid grid-cols-2">
            <input
              className={`${
                allow ? "bg-blue-200" : ""
              } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
              placeholder="Verification Code"
              disabled="true"
              id="code"
              type="text"
            ></input>
            <div className="w-[100%]">
              <button
                onClick={() => HandleSendCode()}
                className={`${
                  buttonChange
                    ? "hidden"
                    : "ml-5 px-3 py-2 w-[45%] text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
                }`}
              >
                Send Code
              </button>
              <button
                onClick={() => HandleCheckCode()}
                className={`${
                  buttonChange
                    ? "ml-5 px-3 py-2 w-[45%] text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
                    : "hidden"
                }`}
              >
                Check Code
              </button>
            </div>
          </div>
          <div className=" flex w-[100%]   justify-center items-center h-fit mt-2">
            <button
              onClick={() => setShowCreateAcc(true)}
              className={`${
                hr === "HR"
                  ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  : `${
                      admin
                        ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        : "hidden"
                    }`
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => close()}
              className=" w-fit p-2 text-sm text-red-700 hover:text-white border border-r-700 hover:bg-red-800 focus:ring-4
               focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2
               dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ModalCreateAcc
        isOpen1={showModalCreateAcc}
        isClose1={() => setShowCreateAcc(false)}
      />
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
    </>
  );
};

export default AccountSetting;

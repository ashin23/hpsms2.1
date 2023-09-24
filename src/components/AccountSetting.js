import React, { Fragment, useState } from "react";
import ModalCreateAcc from "./ModalCreateAcc";
import { useEffect } from "react";
import emailjs from "emailjs-com";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSetting = ({
  isAcc,
  isAccClose,
  hr,
  admin,
  email2,
  emp,
  coordinator,
  applicant,
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
        NotifyError2()

      return;
    }
    emailjs.send(
      "service_yj6ye3j",
      "template_aek4udy",
      {
        email2: email,
        code: otpCode,
      },
      "-qtQXoQ1iYx4JDljO"
    );
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
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex  "
    >
      <div className=" grid justify-center bg-white p-10 gap-3 rounded-3xl">
        <label className="flex font-bold">Email</label>
        <input
          className={`${
            allow ? "bg-blue-200 " : ""
          } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
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
          } pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`}
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
        <div className="flex">
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
        <div className=" grid grid-cols-2 gap-2">
          <button
            onClick={() => saveChanges()}
            id="saveChanges"
            className=" px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
          >
            Save changes
          </button>
          <button
            onClick={() => handleEdit()}
            className="px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
          >
            Edit
          </button>
        </div>
        <button
          onClick={() => close()}
          className=" px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
        >
          Cancel
        </button>

        <div className="grid grid-cols-1 mt-14">
          <button
            onClick={() => setShowCreateAcc(true)}
            className={`${
              hr === "HR"
                ? "px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
                : `${
                    admin
                      ? "px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
                      : "hidden"
                  }`
            }`}
          >
            Create Account
          </button>
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
    </div>
  );
};

export default AccountSetting;

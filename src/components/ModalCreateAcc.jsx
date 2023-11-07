import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import userlvl from "./userLvl.json";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCreateAcc = ({ isOpen1, isClose1 }) => {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");

  const [otpCode, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState(true);
  const [verCode, setVerCode] = useState();

  const [isCode, setIsCode] = useState(false);

  const Notify = () => {
    toast.success("Account create succesfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      isClose1();
    }, [2000]);
  };

  function close() {
    setIsCode(false);
    isClose1();
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

  const NotifyError1 = () => {
    toast.error("Incorrect Password", {
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
  useEffect(() => {
    codeGenerator();
  }, []);

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
    console.log(code);
  }

  const HandleSendCode = () => {
    if (!email) {
      NotifyError2();
      return;
    }
    // emailjs.send(
    //   "service_n50nfk8",
    //   "template_5jyo2vi",
    //   {
    //     email: email,
    //     code: otpCode,
    //   },
    //   "R_XlHjwitXGKhI2NS"
    // );
    setIsCode(true);
  };

  function HandleCheckCode() {
    if (verCode === otpCode) {
      setCodeStatus(false);
      NotifyCode();
      return;
    } else {
      NotifyError();
    }
  }

  const HandleCreate = async () => {
    if (!email || !position || !password) {
      NotifyError2();
      return;
    } else {
      if (password2 === password) {
        const { data, error } = await supabase.from("UserList").insert([
          {
            Email: email,
            Password: password,
            userlvl: position,
          },
        ]);
        Notify();
        if (position === "Employee") {
          const { data, error } = await supabase.from("EmployeeList").insert([
            {
              Email: email,
              Password: password,
            },
          ]);

          return;
        }
      } else if (password !== password2) {
        NotifyError1();
        return;
      }
    }
  };

  if (!isOpen1) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex w-screen h-screen"
    >
      <div className=" flex-col justify-center bg-white md:p-6 p-3 h-[52%] lg:h-[70%]  md:w-[30%] w-[100%] rounded-3xl shadow-2xl items-center">
        <label className="flex pl-9 pr-40 py-3 ml-2 my-2  text-slate-100 md:text-[30px] text-[20px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Create Account
        </label>
        <div className="grid grid-cols-2 gap-5 items-center ">
          <label className="flex font-bold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Email"
            type="text"
          ></input>

          <label className="flex font-bold">Position</label>

          <select
            onChange={(e) => setPosition(e.target.value)}
            className="w-[100%] border-2 border-gray-300 text-black  p-2  rounded-2xl  "
          >
            {userlvl.map((user) => (
              <option key={user.id} className="">
                {" "}
                {user.position}
              </option>
            ))}
          </select>

          <label className="flex font-bold">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Password"
            type="password"
          ></input>

          <label className="flex font-bold">Confirm Password</label>

          <input
            onChange={(e) => setPassword2(e.target.value)}
            className="pl-3 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Confirm Password"
            type="text"
          ></input>
        </div>

        <div className="flex gap-2 items-center  mt-3 ">
          <label className="flex font-bold w-[400px]">Verification Code</label>
          <input
            className="pl-2 pr-3 py-2 w-[95%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Verification Code"
            type="text"
            value={verCode}
            onChange={(e) => setVerCode(e.target.value)}
          ></input>
          {isCode ? (
            <button
              onClick={() => HandleCheckCode()}
              className="px-3 py-2 w-[80px] text-[10px] 
              bg-white hover:bg-green-400 hover:text-white
               rounded-lg border-2 border-green-400"
            >
              Check Code
            </button>
          ) : (
            <button
              onClick={() => HandleSendCode()}
              className="px-3 py-2 w-[80px] text-[10px] bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-blue-500"
            >
              Send Code
            </button>
          )}
        </div>
        <div className="flex w-[100%] justify-center mt-3">
          <button
            onClick={() => HandleCreate()}
            className="p-4 focus:outline-none w-[25%] ml-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
           font-medium rounded-lg text-sm  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create
          </button>
          <button
            className="p-4 focus:outline-none w-[25%] ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300
           font-medium rounded-lg text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => close()}
          >
            Cancel
          </button>
        </div>

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
    </div>
  );
};
export default ModalCreateAcc;

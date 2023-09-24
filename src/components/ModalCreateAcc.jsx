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
    justify-center items-center  flex "
    >
      <div>
        <div className="bg-white h-[100%] w-[100%] rounded-3xl ">
          <div className="grid grid-cols-2 gap-5 p-5 ">
            <label className="flex font-bold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Email"
              type="text"
            ></input>

            <label className="flex font-bold">Position</label>

            <select
              onChange={(e) => setPosition(e.target.value)}
              className="w-[100%] border-2 border-black h-8 text-black  p-1  rounded-lg  "
            >
              {userlvl.map((user) => (
                <option key={user.id}> {user.position}</option>
              ))}
            </select>

            <label className="flex font-bold">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Password"
              type="password"
            ></input>

            <label className="flex font-bold">Confirm Password</label>

            <input
              onChange={(e) => setPassword2(e.target.value)}
              className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Confirm Password"
              type="text"
            ></input>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2 ml-2 ">
            <label className="flex font-bold">Verification Code</label>
            <input
              className="pl-2 pr-3 py-2 w-[95%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Verification Code"
              type="text"
              value={verCode}
              onChange={(e) => setVerCode(e.target.value)}
            ></input>
          </div>
          <div className=" mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => HandleSendCode()}
              className="ml-10 px-3 py-2 w-[70%] text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
            >
              Send Code
            </button>
            <button
              onClick={() => HandleCheckCode()}
              className="ml-10 px-3 py-2 w-[70%] text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
            >
              Check Code
            </button>
          </div>
          <div className="grid grid-cols-1  mt-3 p-3 gap-2">
            <button
              onClick={() => HandleCreate()}
              className={`${
                codeStatus
                  ? "hidden"
                  : "visible px-3 py-2 text-sm tracking-widest bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-black"
              }`}
            >
              Create
            </button>
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

            <button
              className=" hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg border-2 border-black"
              onClick={() => isClose1()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalCreateAcc;

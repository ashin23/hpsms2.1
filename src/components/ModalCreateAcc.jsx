import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import userlvl from "./userLvl.json";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const ModalCreateAcc = ({ isOpen1, isClose1 }) => {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("Select Position");

  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const [view1, setView1] = useState(false);

  const [otpCode, setCode] = useState("");
  const [verCode, setVerCode] = useState();

  const [isCode, setIsCode] = useState(false);

  function close() {
    setIsCode(false);
    isClose1();
  }

  useEffect(() => {
    codeGenerator();
  }, []);

  function codeGenerator() {
    let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCode(code.toString());
  }

  const HandleSendCode = () => {
    if (!email) {
      toast.warning("Please fill up the blanks", {
        position: "top-center",
        autoClose: 2000,
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
    console.log(otpCode);
    toast.success("Send Code", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const HandleCreate = async () => {
    if (!email || position === "Select Position" || !password || !password2) {
      toast.warning(
        `${
          (!email &&
            position === "Select Position" &&
            !password &&
            !password2 &&
            "Fill up the blanks") ||
          (!email && "Email is required") ||
          (position === "Select Position" && "Select Position")
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
      if (
        password2 === password &&
        verCode === otpCode &&
        position === "Employee"
      ) {
        const { data, error } = await supabase.from("Employee_List").insert([
          {
            Email: email,
            Password: password,
            userlvl: "Employee",
            Notifications: "false",
          },
        ]);
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
        close();
        return;
      } else if (password2 === password && verCode === otpCode) {
        const { data, error } = await supabase.from("UserList").insert([
          {
            Email: email,
            Password: password,
            userlvl: position,
            Notifications: "false",
          },
        ]);
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
        close();
        return;
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
      } else {
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
      }
    }
  };

  if (!isOpen1) return null;
  return (
    <div
      className=" z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center  flex w-screen h-screen"
    >
      <div className=" grid justify-center bg-white md:p-5   p-2 gap-3  md:h-[65%] overflow-scroll overflow-x-hidden  h-[80%]  md:w-[40%] w-[100%] rounded-3xl shadow-2xl">
        <div className="flex  sticky top-0 h-fit justify-between  md:w-full items-center    bg-white">
          <label className="whitespace-nowrap py-3 pl-3 pr-10  md:pr-56 ml-2  my-4 text-slate-100 text-[30px] md:text-[30px] h-fit text-xl w-fit text-center font-semibold bg-gradient-to-r from-[#020024] via-[#040463] to-[#040463] rounded-2xl">
            Create Account
          </label>{" "}
          <div className=" w-fit  md:flex px-5 text-lg ">
            <button
              className=" text-white bg-blue-700 whitespace-nowrap  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm h-fit px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => HandleCreate()}
            >
              Create
            </button>
            <button
              onClick={() => close()}
              className=" text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm h-fit px-3 py-2 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1   gap-5  ">
          <div>
            <label className="flex font-bold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="pl-3 pr-3 py-2 md:w-[100%] w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Email"
              type="text"
            ></input>
          </div>
          <div>
            <label className="flex font-bold">Position</label>
            <select
              onChange={(e) => setPosition(e.target.value)}
              className="w-[100%] border-2 md:w-[100%] border-gray-300 text-black  p-2  rounded-2xl  "
            >
              {userlvl.map((user) => (
                <option key={user.id} className="">
                  {" "}
                  {user.position}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex font-bold">Password</label>
            <div className="text-md flex  gap-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="pl-3 pr-3 py-2 w-[100%] md:w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Password"
                type={view ? "text" : "password"}
              ></input>
              <button className="-ml-10" onClick={() => setView(!view)}>
                {view ? (
                  <AiFillEyeInvisible className="text-[20px] " />
                ) : (
                  <AiFillEye className="text-[20px]" />
                )}
              </button>
            </div>
          </div>

          <div className="text-md   gap-2">
            <label className="flex font-bold">Confirm Password</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              className="pl-3 pr-3 py-2 w-[100%] md:w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Confirm Password"
              type={view1 ? "text" : "password"}
            ></input>
            <button className="-ml-10" onClick={() => setView1(!view1)}>
              {view1 ? (
                <AiFillEyeInvisible className="text-[20px]" />
              ) : (
                <AiFillEye className="text-[20px]" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center  mt-3 ">
          <label className="flex font-bold w-[400px]">Verification Code</label>
          <input
            className="pl-2 pr-3 py-2 w-[95%] md:w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Verification Code"
            type="text"
            value={verCode}
            onChange={(e) => setVerCode(e.target.value)}
          ></input>

          <button
            onClick={() => HandleSendCode()}
            className="px-3 py-2 w-[80px] text-[10px] bg-white hover:bg-sky-400 hover:text-white rounded-lg border-2 border-blue-500"
          >
            Send Code
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalCreateAcc;

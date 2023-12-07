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
    emailjs.send(
      "service_yj6ye3j",
      "template_aek4udy",
      {
        email2: email,
        code: otpCode,
      },
      "-qtQXoQ1iYx4JDljO"
    );
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
            Notifications: "false"
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
        setTimeout(() => {
          isClose1();
        }, [3000]);
        return;
      } else if (password2 === password && verCode === otpCode) {
        const { data, error } = await supabase.from("UserList").insert([
          {
            Email: email,
            Password: password,
            userlvl: position,
            Notifications: "false"
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
        setTimeout(() => {
          isClose1();
        }, [3000]);
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
      <div className=" grid justify-center bg-white md:p-5   p-2 gap-3  md:h-[65%] overflow-scroll overflow-x-hidden  h-[80%]  md:w-[35%] w-[100%] rounded-3xl shadow-2xl">
        <label
          className="flex h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 md:text-[30px] text-[20px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Create Account
        </label>
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
              <button onClick={() => setView(!view)}>
                {view ? (
                  <AiFillEyeInvisible className="text-[20px]" />
                ) : (
                  <AiFillEye className="text-[20px]" />
                )}
              </button>
            </div>
          </div>

          <label className="flex font-bold">Confirm Password</label>
          <div className="text-md flex   gap-2">
            <input
              onChange={(e) => setPassword2(e.target.value)}
              className="pl-3 pr-3 py-2 w-[100%] md:w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Confirm Password"
              type={view1 ? "text" : "password"}
            ></input>
            <button onClick={() => setView1(!view1)}>
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
        <div className="flex w-[100%] justify-center mt-3">
          <button
            onClick={() => HandleCreate()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create
          </button>
          <button
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => close()}
          >
            Cancel
          </button>
        </div>

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
export default ModalCreateAcc;

import React, { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";
import { BiSolidLogIn } from "react-icons/bi";
const Signin = ({ isSignin, isSignClose, checker }) => {
  const navigate = useNavigate();
  const [showModalRegister, setModalRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const NotifyError2 = () => {
    toast.warning("Invalid Credentials", {
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
    toast.error("Fill all the blanks", {
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

  async function HandleSignIn() {
    if (!email || !pass) {
      NotifyError1();
      return;
    }
    const { data: applist } = await supabase.from("NewUser").select();
    const { data: user } = await supabase.from("UserList").select();

    var data = await applist.concat(user);
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].Email === email && data[index].Password === pass) {
          await checker(true, data[index].userlvl, data[index].Email);
          isSignClose();
          return;
        }
      }
      NotifyError2();
    }
  }

  if (!isSignin) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex "
    >
      <div>
        <div className=" justify-center items-center bg-white p-10 gap-3 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1">
            <label className="items-center font-semibold text-[30px] place-content-center justify-center flex">
              <CgProfile /> Log in
            </label>

            <div className="">
              <label className="justify-center flex font-semibold">Email</label>
              <input
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="Email"
              ></input>
            </div>
            <div className="mt-3 ">
              <label className="justify-center flex font-semibold ">
                Password
              </label>
              <input
                className="pl-4 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Enter Password"
                onChange={(e) => setPass(e.target.value)}
                type="password"
              ></input>
            </div>

            <div className="mt-4 ">
              <button
                onClick={() => HandleSignIn()}
                className="flex text-b w-[100%] text-[150%] justify-center hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <BiSolidLogIn className=" " /> Log in
              </button>
            </div>

            <div className="mt-3">
              <button
                onClick={() => setModalRegister(true)}
                className="flex text-black w-[100%] text-[150%] justify-center hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-2 00 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                {" "}
                Register as Applicant
              </button>
            </div>
          </div>
        </div>
      </div>
      <Register
        isRegister={showModalRegister}
        isRegisterClose={() => setModalRegister(false)}
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

export default Signin;

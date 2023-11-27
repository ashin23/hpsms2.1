import React, { useEffect } from "react";
import supabase from "./supabaseClient";
import { useState } from "react";
const Notifications = ({ isOpen, isClose, email, data }) => {
  function close() {
    isClose();
  }



  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center top-50 flex  w-screen h-screen"
      >
        <div className=" overflow-y-scroll bg-white h-[40%] overflow-x-hidden  w-[80%] md:h-[40%] md:w-[30%] lg:h-[40%] lg:w-[25%] rounded-3xl  pb-6 px-5 md:px-14 shadow-2xl ">
          <div className="sticky top-0 bg-white w-full h-[13%] p-5">
            <div className="flex justify-end -mr-9 md:-mr-16 -mt-2">
              <button
                onClick={close}
                className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Close
              </button>
            </div>
          </div>
          <label
            className="
        flex 
        md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:-ml-10  md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
          >
            Notifications
          </label>
          {data && (
            <div>
              <div className="grid grid-cols-2 font-bold text-2xl">
                <label>Hotel</label>
                <label>Status</label>
              </div>
              {data.map((data) => (
                <div className="grid grid-cols-2">
                  <div className="">{data.Hotel}</div>
                  <div>{data.action}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;

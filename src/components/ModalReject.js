import React from "react";
import supabase from "./supabaseClient";


const ModalReject = ({isOpen42 , isReject42, infoo}) => {

    const Reject = async () => {
        const { error } = await supabase
          .from("Applicant_List")
          .delete()
          .eq("id", infoo.id);
      };
      if(!isOpen42) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center top-50 flex "
    >
      <div className="bg-white p-5 rounded-3xl  py-6 px-5 md:px-14 shadow-2xl ">
      <h1 className="font-bold">Are you sure you want to reject?</h1>
      <h1 className="font-normal pt-2">This data wont be recovered</h1>
      <div
          className="flex
           w-[100%]  justify-center pb-2 gap-2 pt-5"
        >
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={isReject42}
          >
           Cancel
          </button>
          <button 
          onClick={() => Reject()}
          className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Reject
          </button>
        </div>
        </div>
      
    </div>
  );
};

export default ModalReject;

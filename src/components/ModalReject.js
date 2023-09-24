import React from "react";
import supabase from "./supabaseClient";


const ModalReject = ({isOpen42 , isReject42, infoo}) => {

    const Reject = async () => {
        const { error } = await supabase
          .from("ApplicantsList")
          .delete()
          .eq("id", infoo.id);
      };
      if(!isOpen42) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center top-50 flex "
    >
      <div className="bg-white p-5">
      <h1 className="font-bold">Are you sure you want to reject?</h1>
      <h1 className="font-normal pt-2">This data wont be recovered</h1>
      <div
          className="flex
           w-[100%]  justify-center pb-2 gap-2 pt-5"
        >
          <button
            className="bg-green-600 w-[100%]  px-3 py-2 text-sm   hover:bg-green-400 hover:text-black rounded-lg"
            onClick={isReject42}
          >
           Cancel
          </button>
          <button 
          onClick={() => Reject()}
          className="  px-3 py-2 text-sm t  hover:bg-red-400 hover:text-black rounded-lg bg-red-600 w-[100%]">
            Reject
          </button>
        </div>
        </div>
      
    </div>
  );
};

export default ModalReject;

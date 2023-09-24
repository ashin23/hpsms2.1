import React, {useEffect, useState}from "react";
import supabase from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";


const Upload = ({ isUpload, isCloseUpload,email }) => {
  const [requirements, setRequirements] = useState("");
  const [fileName, setFileName] = useState("");
  const [email1, setEmail1] = useState("");
  const generatedToken = uuidv4();

useEffect(() => {
getter()
},[])

const getter = async () => {
    setEmail1(email.Email);
  };


const HandleFile = (e) => {
    const files = e.target.files;
    const datafile = e.target.files[0];
    if(files.lenght > 0){
        setRequirements(files)
        setFileName(datafile.name)
    }
    
}
  

  const HandleFileSender = async () => {
    const { data: sender, error } = await supabase.storage
      .from("Files")
      .upload(email1+ "/" + generatedToken + fileName, requirements);
    isCloseUpload()
  };

  if (!isUpload) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center flex  "
    >
      <div className="  bg-white w-[40%]">
        <div className=" grid grid-rows-1 gap-3  p-5 rounded ">
          <h1 className="flex font-bold text-xl ">Requirements</h1>
          <input
            onChange={HandleFile}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Upload File"
            type="file"
          ></input>
          <div>
            <button
              className=" hover:bg-green-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
              onClick={() => HandleFileSender()}
            >
              Submit
            </button>
            <button
              className=" hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
              onClick={() => isCloseUpload()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

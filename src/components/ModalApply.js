import React, { useState } from "react";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const ModalApply = ({ isVisible, onClose, Position }) => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [requirements, setRequirements] = useState("");
  const [experience, setExperience] = useState("");
  
  const [fileName, setFileName] = useState("");
  const generatedToken = uuidv4();

  const [relocate, setRelocate] = useState();
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Yes", checked: false },
    { id: 2, label: "Yes but i need assistance", checked: false },
    { id: 3, label: "Yes but ", checked: false },
    { id: 4, label: "No", checked: false },
  ]);

  const Notify = () => {
    toast.success("Submitted succesfully!", {
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
      onClose();
    }, [2000]);
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

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      return {
        ...checkbox,
        checked: checkbox.id === id,
      };
    });

    setCheckboxes(updatedCheckboxes);
  };

  const HandleFile = (event) => {
    const files = event.target.files;
    const datafile = event.target.files[0];
    if (files.length > 0) {
      setRequirements(files);
      setFileName(datafile.name);
    }
  };
  

  const HandleFileSender = async () => {
    const { data: sender , error} = await supabase.storage
      .from("Files")
      .upload(email + "/" + generatedToken + fileName, requirements);
  
  };

  const handleSubmit = async () => {
    if (!fullname || !email || !experience || !relocate) {
      NotifyError2();
      return;
    }
    const { dataa, error } = await supabase.from("ApplicantsList").insert([
      {
        FullName: fullname,
        Email: email,
        Exp: experience,
        Relocate: relocate,
        Position: Position,
        status: false
      },
    ]);
    HandleFileSender();
    Notify();
  };

  if (!isVisible) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
      justify-center items-center flex  "
    >
      <div className="  bg-white w-[40%] rounded-3xl ">
        <div className=" grid grid-rows-1 gap-3  p-5 rounded ">
          <label className="flex font-bold text-xl">Full Name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Full Name"
            type="text"
          ></input>
          <label className="flex font-bold  text-xl">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Email"
            type="text"
          ></input>
          
          <h1 className="flex font-bold text-xl ">Requirements</h1>
          <input
            onChange={HandleFile}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Upload File"
            type="file"
          ></input>
          <label className="flex font-bold text-xl">Relevant Experience</label>
          <input
            onChange={(e) => setExperience(e.target.value)}
            className="pl-10 pr-3 py-2 w-[100%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Relevant Experience"
            type="text"
          ></input>
          <h2 className=" font-semibold text-xl">
            Questions from the employer
          </h2>
          <h3 className=" font-semibold text-xl">
            Will you be able to relocate or commute to Manila for the job
          </h3>
        </div>

        <div>
          <ul className="grid grid-cols-4 gap-5 p-2 pt-5 pb-5">
            {checkboxes.map((checkbox) => (
              <div key={checkbox.id}>
                <label>
                  <input
                    onClick={() => setRelocate(checkbox.label)}
                    type="checkbox"
                    checked={checkbox.checked}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                  />
                  {checkbox.label}
                </label>
              </div>
            ))}
          </ul>
        </div>
        <div className=" grid grid-cols-2">
          <button
            className=" hover:bg-green-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
          <button
            className=" hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-2 rounded-lg"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
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
  );
};

export default ModalApply;

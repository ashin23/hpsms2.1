import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import Filecoord from "./Filecoord";
const ModalCoordconfig = ({ isOpen, isClose, coordInfo }) => {
  const [fileview, setFileView] = useState();

  useEffect(() => {
    Handlefile();
  }, [coordInfo]);

  function handleclose() {
    isClose();
  }
  const Handlefile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(coordInfo.Email);
    setFileView(file);
  };

  if (!isOpen) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center top-50 flex ">
      <div className=" bg-white p-5">
        <div className="text-[20px]  grid grid-cols-2 justify-center gap-3">
          <div className="flex mr-1  font-semibold">
            Email: <p className="font-normal pl-1">{coordInfo.Email}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position <p className="font-normal pl-1">{coordInfo.Position}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            File:
            {fileview && (
            <div>
                {fileview.map((view) => (
                    <Filecoord key={view.id} view={view} Email={coordInfo.Email}/>
                ))}
            </div>)}
          </div>
        </div>
        <button onClick={() => handleclose()} className="bg-slate-300 w-[100%]">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalCoordconfig;

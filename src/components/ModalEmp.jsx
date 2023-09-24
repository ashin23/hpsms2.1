import React, { useEffect, useState } from "react";
import Fileviewer from "./Fileviewer";
import supabase from "./supabaseClient";

function ModalEmp({ visible, Close, Info }) {
  const [file1, setFile] = useState();

  useEffect(() => {
    Handlefetchfile();
  }, [Info]);

  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(Info.Email);
    setFile(file);
  };

  if (!visible) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center top-50 flex ">
      <div className=" bg-white p-5">
        <div className="text-[20px]  grid grid-cols-2 justify-center  gap-3">
          <div className="flex mr-1  font-semibold">
            Full Name: <p className="font-normal pl-1">{Info.FullName}</p>{" "}
          </div>
          <div className="flex mr-1  font-semibold">
            Email: <p className="font-normal pl-1">{Info.Email}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            City: <p className="font-normal pl-1">{Info.City}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{Info.Position}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Experience: <p className="font-normal pl-1">{Info.Exp}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Relocate: <p className="font-normal pl-1">{Info.Relocate}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            File:
            {file1 && (
              <div>
                {file1.map((file1) => (
                  <Fileviewer key={file1.id} file1={file1} Email={Info.Email} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* buttons */}

        <button onClick={Close} className="bg-slate-300 w-[100%]">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ModalEmp;

import React, { useState } from "react";
import ModalEmp from "./ModalEmp";


const ArchiveConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);
  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div
        onClick={() => setShowModal(true)}
        className="p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-3 w-[75%] "
      >
        <div className="text-md ">{e.FullName}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>
        
      </div>
      <div className="flex gap-2 w-[20%] p-2">
        <button
          
          className="bg-slate-400  p-2 rounded-md"
        >
          Restore{" "}
        </button>
      </div>
      <ModalEmp Info={e} visible={showmodal} Close={handleclosemodalprofile} />
    </div>
  );
};

export default ArchiveConfig;

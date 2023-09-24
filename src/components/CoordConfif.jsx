import React, { useState } from "react";
import ModalCoordconfig from "./ModalCoordconfig";
const CoordConfif = ({ CoordEmp }) => {
  const [showmodalcoord, setShowModalcoord] = useState(false);

  return (
    <div className="flex bg-[#EEEEEE]  mt-2 ">
      <div
        onClick={() => setShowModalcoord(true)}
        className="p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-4 w-[80%]"
      >
        {CoordEmp.Email}
        <div className="ml-[153%]">{CoordEmp.Position}</div>
      </div>
      <ModalCoordconfig
        isOpen={showmodalcoord}
        isClose={() => setShowModalcoord(false)}
        coordInfo={CoordEmp}
      />
    </div>
  );
};

export default CoordConfif;

import React, { useState } from "react";
import ModalCoordconfig from "./ModalCoordconfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import Displaycoordinator from "./Displaycoordinator";
const CoordConfif = ({ CoordEmp ,coordinator}) => {
  const [showmodalcoord, setShowModalcoord] = useState(false);
  const [holder, setholder] = useState([]);
  
  if (showmodalcoord) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";
  return (
    <div className="flex   mt-2 ">
      <div className="p-3 rounded-md  w-[100%] ">
        {CoordEmp  ? (
          <div className=" p-1">
            {CoordEmp.map((e,index) => (
              <>
                <Displaycoordinator
                  setShowModalcoord={setShowModalcoord}
                  showmodalcoord={showmodalcoord}
                  setholder={setholder}
                  key={index}
                  e={e}
                />
               
              </>
            ))}
          </div>
        ): "No Data"}
      </div>
      <ModalCoordconfig
        coordInfo={holder}
        CoordEmp={CoordEmp}
        coordinator={coordinator}
        isOpen={showmodalcoord}
        isClose={() => setShowModalcoord(false)}
      />
    </div>
  );
};

export default CoordConfif;

import React, { useState } from "react";
import ModalCoordconfig from "./ModalCoordconfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import Displaycoordinator from "./Displaycoordinator";
const CoordConfif = ({ CoordEmp }) => {
  const [showmodalcoord, setShowModalcoord] = useState(false);
  const [holder, setholder] = useState([]);
  
 if(showmodalcoord)document.documentElement.style.overflowY = "hidden";
 else document.documentElement.style.overflowY = "unset";
  return (
    <div className="flex bg-[#EEEEEE]  mt-2 ">
      <div className="p-3 rounded-md  w-[100%] ">
        {CoordEmp && (
          <div>
            {CoordEmp.map((e) => (
              <Displaycoordinator
                setShowModalcoord={setShowModalcoord}
                showmodalcoord={showmodalcoord}
                setholder={setholder}
                key={e.id}
                e={e}
              />
            ))}
          </div>
        )}
      </div>
      <ModalCoordconfig
        coordInfo={holder}
        CoordEmp={CoordEmp}
        isOpen={showmodalcoord}
        isClose={() => setShowModalcoord(false)}
      />
    </div>
  );
};

export default CoordConfif;

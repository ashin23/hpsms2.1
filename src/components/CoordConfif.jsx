import React, { useState } from "react";
import ModalCoordconfig from "./ModalCoordconfig";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import Displaycoordinator from "./Displaycoordinator";
const CoordConfif = ({ CoordEmp }) => {
  const [emp, setemp] = useState("");
  const [showmodalcoord, setShowModalcoord] = useState(false);
  const [holder, setholder] = useState([]);

  return (
    <div className="flex bg-[#EEEEEE]  mt-2 ">
      <div className="p-3 rounded-md  w-[100%]">
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
        isOpen={showmodalcoord}
        isClose={() => setShowModalcoord(false)}
      />
    </div>
  );
};

export default CoordConfif;

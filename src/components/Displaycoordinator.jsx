import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { Tooltip } from "react-tooltip";
const Displaycoordinator = ({
  e,
  setShowModalcoord,
  showmodalcoord,
  setholder,
}) => {
  const [empcoord, setempcoord] = useState();
  useEffect(() => {
    fetchdata();
  }, [e]);

  const fetchdata = async () => {
    const { data: emp } = await supabase
      .from("Employee_List")
      .select()
      .eq("Name", e);
    setempcoord(emp[0]);
  };

  function click() {
    setShowModalcoord(!showmodalcoord);
    setholder(empcoord);
  }

 
  return (
    <>
      {empcoord && (
        <div 
        onClick={() => click()}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
        className="p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%] h-10 grid grid-rows-2 md:grid-cols-2 md:w-[100%] bg-slate-100 ">
          {" "}
          {empcoord.Name}
          <div >{empcoord.Position}</div>
          <Tooltip id="my-tooltip" place="bottom"/>
        </div>
      )}
    </>
  );
};

export default Displaycoordinator;

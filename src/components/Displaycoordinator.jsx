import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";

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
        <div className="p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%]   grid grid-rows-3 md:grid-cols-3 md:w-[100%] bg-slate-100 ">
          {" "}
          {empcoord.Name}
          <div onClick={() => click()}>{empcoord.Position}</div>
        </div>
      )}
    </>
  );
};

export default Displaycoordinator;

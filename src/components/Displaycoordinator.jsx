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
    setholder(empcoord)
  }

  return (
    <>
      {empcoord && (
        <div className="grid grid-cols-2 hover:translate-x-2 hover:p-4 duration-500 mt-1 lg:h-10">
          {" "}
          {console.log(empcoord)}
          {empcoord.Name}
          <div onClick={() => click()}>{empcoord.Position}</div>
        </div>
      )}
    </>
  );
};

export default Displaycoordinator;

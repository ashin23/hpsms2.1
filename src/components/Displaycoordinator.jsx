import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { Tooltip } from "react-tooltip";
const Displaycoordinator = ({
  e,
  setShowModalcoord,
  showmodalcoord,
  setholder,
  
}) => {
  function click() {
    setShowModalcoord(!showmodalcoord);
    setholder(e);
  }

  return (
    <div className={`${e.status !== "Deploy"  && "hidden"}`}>
      {e   && e.status === "Deploy" ? (
        <div
          onClick={() => click()}
          className="p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%] h-10 grid grid-rows-2 md:grid-cols-2 md:w-[100%] bg-slate-100 "
        >
          {" "}
          <div data-tooltip-id="my-tooltip" data-tooltip-content="View Profile">
            {e.Name}
          </div>
          <div>{e.Position}</div>
          <Tooltip id="my-tooltip" place="bottom" />
        </div>
      ):""}
    </div>
  );
};

export default Displaycoordinator;

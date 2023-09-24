import React from "react";

const RequestConfig = ({e}) => {

  
  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div
        
        className="p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-6 w-[105%]  "
      >
        <div className="text-md ">{e.Email}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Personel}</div>
        <div className="text-md ">{e.Date}</div>
        <div className="text-md ">{e.Hotel}</div>
        <div className="text-md ">{e.Location}</div>
      </div>
    
    </div>
  );
};

export default RequestConfig;

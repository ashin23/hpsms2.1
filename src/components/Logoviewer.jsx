import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
function Logoviewer({ file1, Email }) {
  const [hide, sethide] = useState(true);
  
  return (
    <>
      {hide && (
        <img
          className=" md:w-[25%]  bg-white h-[40%] shadow-md "
          src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Logo/${Email}/${file1.name}`}
          alt=""
          onError={() => sethide(false)}
        />
       
      )}
    </>
  );
}

export default Logoviewer;

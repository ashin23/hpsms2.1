import React, { useState } from "react";

function Coverviewer({ file1, Email }) {
  const [hide, sethide] = useState(true);

 
  return (
    <>
      {hide && (
        <img
          className=" md:w-full  h-[250px] object-cover p-1 bg-slate-300 "
          src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Cover/${Email}/${file1.name}`}
          onError={() => sethide(false)}
        />
      )}
    </>
  );
}

export default Coverviewer;

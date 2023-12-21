import React from "react";

function Fileviewer({ file1, Email }) {
 
  return (
    <div>
      <img
      className="border-solid border-4 border-[#2a3695e7] md:h-[10%] md:w-[10%] h-[40%] w-[40%]" 
        src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email.Email}/${file1.name}`}
      />
    </div>
  );
}

export default Fileviewer;

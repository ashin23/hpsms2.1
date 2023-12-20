import React, { useEffect } from "react";

function Filecoord({ view, Email }) {
  return (
    <div>
      <img
        className="border-solid border-4 border-[#2a3695e7]  md:w-[200px] w-[100px] h-[100px] md:ml-0 ml-[100px] -mt-8 md:-mt-0  shadow-md shadow-black rounded-full "
        src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email.Email}/${view.name}`}
      />
    </div>
  );
}

export default Filecoord;

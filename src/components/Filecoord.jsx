import React from "react";

function Filecoord({view,Email}) {
  return (
    <div>
      
      <img
      className="border-solid border-4 border-[#2a3695e7] "
        style={{
          width: "10%",
          height: "10%",
        }}
        src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email}/${view.name}`}
      />
    </div>
  );
}

export default Filecoord;
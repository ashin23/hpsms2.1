import React from "react";

function Fileviewer({ file1, Email }) {
  return (
    <div>
      {/* <img
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          `https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email}/${file1.name}`
        )}&embedded=true`}
        title="image"
        style={{ width: "60%", height: "200px", border: "none" }}
      /> */}
      <img
      className="border-solid border-4 border-[#2a3695e7] "
        style={{
          width: "10%",
          height: "10%",
        }}
        src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email}/${file1.name}`}
      />
    </div>
  );
}

export default Fileviewer;

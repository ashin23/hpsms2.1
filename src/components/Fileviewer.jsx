import React from "react";


function Fileviewer({ file1, Email }) {

 return (
    <div>
      {file1.name}
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          `https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email}/${file1.name}`
        )}&embedded=true`}
        title="Document Viewer"
        style={{ width: "205%", height: "400px", border: "none" }}
      />
    </div>
  );
}

export default Fileviewer;

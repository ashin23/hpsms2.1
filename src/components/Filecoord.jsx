import React from "react";

function Filecoord({view,Email}) {
  return (
    <div>
      {view.name}
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          `https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${Email}/${view.name}`
        )}&embedded=true`}
        title="Document Viewer"
        style={{ width: "205%", height: "400px", border: "none" }}
      />
    </div>
  );
}

export default Filecoord;

import React, { useEffect, useState } from "react";
import ModalAccept from "./ModalAccept";
import ModalReject from "./ModalReject";
// import DocViewer , {DocViewerRenderers} from "react-doc-viewer";
import supabase from "./supabaseClient";
import Fileviewer from "./Fileviewer";
//import { CustomErrorComponent } from 'custom-error';

const ModalApplicantInfo = ({ isOpen, CloseJobInfo, Info }) => {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [file1, setFile] = useState();

  const handleReject = () => setShowAccept(false);
  const handle2ndReject = () => setShowReject(false);

  useEffect(() => {
    Handlefetchfile();
  }, [Info]);

  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(Info.Email);
    setFile(file);
  };

  if (!isOpen) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center top-50 flex overflow-auto "
    >
      {" "}
      <div onClick={() => Handlefetchfile()} className=" bg-white p-5 rounded-2xl">
        <div className="ml-[40%] font-bold pt-5 pb-10">APPLICANT INFORMATION</div>
        <div className="text-[20px]  grid grid-cols-2 justify-center  gap-3">
          <div className="flex mr-1  font-semibold">
            Full Name: <p className="font-normal pl-1">{Info.FullName}</p>{" "}
          </div>
          <div className="flex mr-1  font-semibold">
            Email: <p className="font-normal pl-1">{Info.Email}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            City: <p className="font-normal pl-1">{Info.City}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{Info.Position}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Experience: <p className="font-normal pl-1">{Info.Exp}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Relocate: <p className="font-normal pl-1">{Info.Relocate}</p>
          </div>
          <div className=" mr-1  font-semibold grid">
            File:
            {file1 && (
              <div>
                {file1.map((file1) => (
                  <Fileviewer key={file1.id} file1={file1} Email={Info.Email} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* buttons */}
        <div
          className="flex
           w-[70%]  justify-center pb-4 pt-10 gap-10 ml-[17%] "
        >
          <button
            className="bg-green-600 w-[200%]  pb-5 pt-5 px-2 py-2 text-sm text-white  hover:bg-green-400 hover:text-black rounded-2xl"
            onClick={() => setShowAccept(true)}
          >
            ACCEPT
          </button>
          <button
            onClick={() => setShowReject(true)}
            className=" pb-5 pt-5 px-3 py-2 text-sm t  hover:bg-red-400 text-white hover:text-black rounded-2xl bg-red-600 w-[200%] "
          >
            REJECT
          </button>
        </div>
        <button onClick={CloseJobInfo} className="bg-slate-300 pb-2 pt-2 w-[20%] ml-[42%]  ">
          Cancel
        </button>
      </div>
      <ModalAccept
        isAccepted={showAccept}
        isReject={handleReject}
        info={Info}
      />
      <ModalReject
        isOpen42={showReject}
        isReject42={handle2ndReject}
        infoo={Info}
      />
    </div>
  );
};

export default ModalApplicantInfo;

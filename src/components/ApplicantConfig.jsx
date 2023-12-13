import React, { useState, useEffect } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
import supabase from "./supabaseClient";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import { CgProfile } from "react-icons/cg";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
function ApplicantConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const [img, setImg] = useState();
  const [broken, isBroken] = useState(false);

  useEffect(() => {
    getAvatar(e.Email);
  }, [e]);

  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
  }, []);

  if (showJobApplicant) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

  const getAvatar = async (email1) => {
    const { data: avatar } = await supabase.storage.from("Files").list(email1, {
      limit: 1,
    });
    if (avatar.length > 0) {
      isBroken(true);
      return setImg(avatar[0].name);
    } else {
      isBroken(false);
    }
  };

  var displayColor = "";
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    displayColor = color;

    return color;
  }

  function avatarComponent(name) {
    return (
      <div
        style={{ background: stringToColor(name) }}
        className={`flex text-white items-center justify-center md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full font-thin`}
      >{`${name?.split(" ")[0][0]}`}</div>
    );
  }

  return (
    <>
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
        className={`${
          e.Notifications === "false" && "border-2 border-red-500 "
        }  md:text-base text-[10px] h-fit   mb-1 bg-slate-200  p-1  rounded-md  font-normal cursor-pointer`}
        onClick={() => setShowJobApplicant(true)}
      >
        <MdNotificationsActive className={`${e.Notifications === "false" ? "text-red-500  " : "hidden"}`}/>
        <div className="grid grid-rows-1  ">
          <div className="text-lg justify-center  flex  items-center   gap-1 ">
            {broken ? (
              <img
                onError={() => isBroken(true)}
                className="md:h-[50px] h-[30px] md:w-[50px] w-[30px] rounded-full shadow-md"
                src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
              ></img>
            ) : (
              <>{avatarComponent(e.Name)}</>
            )}

            
          </div>
          <div className="text-lg cursor-pointer flex justify-center items-center">
          <CgProfile className=""/> {e.Name}
          </div>
          <div className="text-lg cursor-pointer flex items-center justify-center">
          <IoBriefcaseSharp/>  {e.Position}
          
          </div>

          <div className="text-lg  text-blue-600 hover:underline cursor-pointer items-center  justify-center flex truncate">
           <MdEmail className="text-black "/> {e.Email}
          </div>
          <div className="text-lg   hover:underline cursor-pointer items-center  justify-center flex truncate">
           <FaBuilding className="text-black "/> {e.Hotel}
          </div>

        </div>
      </div>
      <Tooltip id="my-tooltip" place="bottom" />
      <ModalApplicantInfo
        isOpen={showJobApplicant}
        CloseJobInfo={setShowJobApplicant}
        Info={e}
        srcIMG={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
      />
      <ToastContainer />
    </>
  );
}

export default ApplicantConfig;

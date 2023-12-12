import React, { useState, useEffect } from "react";
import ModalEmp3 from "./ModalEmp3";
import supabase from "./supabaseClient";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
const ArchiveConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);

  if (showmodal) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

  

  

  const [img, setImg] = useState();
  const [broken, isBroken] = useState(false);

  useEffect(() => {
    getAvatar(e.Email);
  }, [e]);

  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
  }, []);

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
        }  md:text-base text-[10px] h-fit grid grid-cols-3 justify-center items-center mb-1 bg-slate-200 p-1 hover:p-2 rounded-md hover:duration-300 font-thin cursor-pointer`}
        onClick={() => setShowModal(true)}
      >
        <div className="text-md flex items-center gap-1 ">
          {broken ? (
            <img
              onError={() => isBroken(true)}
              className="md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full shadow-md"
              src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
            ></img>
          ) : (
            <>{avatarComponent(e.Name)}</>
          )}

          {e.Name}
        </div>
        <div className="text-md cursor-pointer flex justify-center">
          {e.Position}
        </div>
        <div className="text-md md:ml-3 text-blue-600 hover:underline cursor-pointer  justify-center flex truncate">
          {e.Email}
        </div>
       
       
      </div>

      <Tooltip id="my-tooltip" place="bottom" />
      <ModalEmp3 Info={e} visible={showmodal} Close={setShowModal} srcIMG={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}/>
      <ToastContainer />
    </>
  );
};

export default ArchiveConfig;

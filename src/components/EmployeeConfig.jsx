import supabase from "./supabaseClient";
import React, { useEffect, useState } from "react";
import ModalEmp2 from "./ModalEmp2";
import { Tooltip } from "react-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import { CgProfile } from "react-icons/cg";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
const EmployeeConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);
  const [img, setImg] = useState();
  const [broken, isBroken] = useState(false);

 

  if (showmodal) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

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
      {" "}
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
        className={`${
          e.Notifications === "false" && "border-2 border-red-500 "
        }  md:text-base text-[10px] h-fit   mb-1 bg-slate-200  p-1  rounded-md  font-normal cursor-pointer`}
        onClick={() => setShowModal(true)}
      > 
        <div className="justify-between flex">
        <MdNotificationsActive className={`${e.Notifications === "false" ? "text-red-500  " : "hidden"}`}/>
        {e.documents === "Complete" &&  <label className="text-green-600 font-semibold">{e.documents}</label>}
        {e.documents === "Incomplete" &&  <label className="text-red-600 font-semibold">{e.documents}</label>}
        </div>
       
        <div className="grid grid-rows-1">
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
        <CgProfile className="mr-1"/> {e.Name}
        </div>
        <div className="text-lg cursor-pointer flex justify-center items-center">
        <IoBriefcaseSharp className="mr-1"/>  {e.Position}
        </div>
        <div className="text-lg  items-center md:ml-3 text-blue-600 hover:underline cursor-pointer  justify-center flex truncate">
        <MdEmail className="text-black mr-1"/> {e.Email}
        </div>
        <div className="text-lg cursor-pointer flex justify-center items-center">
         <FaBuilding className="mr-1"/> {e.Hotel}
        </div>
        </div>
      </div>
      <Tooltip id="my-tooltip" place="bottom" />
      <ModalEmp2 Info={e} visible={showmodal} Close={setShowModal} srcIMG={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}/>
    </>
  );
};

export default EmployeeConfig;

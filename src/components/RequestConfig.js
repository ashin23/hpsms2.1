import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import ModalDeploy from "./ModalDeploy";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
const RequestConfig = ({ e, fetchCoordList }) => {
  const [showModalDeploy, setShowModalDeploy] = useState(false);

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

  const checkerCompletion = (status) => {
    let NumOfReq = e.Personel;

    if (NumOfReq === 0) {
      deleteData();
      return;
    }
    for (let index = 0; index < fetchCoordList.length; index++) {
      if (
        fetchCoordList[index].Hotel === e.Hotel &&
        fetchCoordList[index].Position === e.Position &&
        fetchCoordList[index].Location === e.Location
      ) {
        var numberEmp = fetchCoordList[index].Data.length;
        if (numberEmp !== e.Personel) {
          return true;
        }
      } else {
        return false;
      }
    }

    // true complete
    // false incomplete
    // return true if completo na sya
    // return false if hindi pa === sa numebr of request yung data na na send
  };

  const deleteData = async () => {
    const { error } = await supabase.from("Request").delete().eq("id", e.id);

    console.log(true);
  };
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content="View Profile"
      className={`${
        !checkerCompletion(e.Notifications) && "border-2 border-red-500 "
      }  md:text-base text-[10px] h-fit grid grid-cols-3 md:grid-cols-7 justify-center items-center mb-1 bg-slate-200 p-1 rounded-md font-thin cursor-pointer`}
    >
      <div className="text-md flex items-center gap-1 text-blue-600">
        {broken ? (
          <img
            onError={() => isBroken(true)}
            className="md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full shadow-md "
            src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
          ></img>
        ) : (
          <>{avatarComponent(e.Email)}</>
        )}

        {e.Email}
      </div>
      <div className="text-md cursor-pointer flex justify-center">
        {e.Position}
      </div>
      <div className="text-md cursor-pointer flex justify-center">
        {e.Personel}
      </div>
      <div className="text-md cursor-pointer flex justify-center">{e.Date}</div>
      <div className="text-md md:ml-3  hover:underline cursor-pointer  justify-center flex truncate">
        {e.Hotel}
      </div>
      <div className="text-md md:ml-3  hover:underline cursor-pointer  justify-center flex truncate">
        {e.Location}
      </div>
      <div className="text-md  cursor-pointer flex justify-center gap-2 ml-14 md:ml-0">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm md:px-3 text-xs px-1 py-1 md:y-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          onClick={() => setShowModalDeploy(true)}
        >
          DEPLOY
        </button>
      </div>

      <ModalDeploy
        isOpenDeploy={showModalDeploy}
        isCloseDeploy={() => setShowModalDeploy(false)}
        Position={e.Position}
        Email={e.Email}
        Hotel={e.Hotel}
        Location={e.Location}
        Personel={e.Personel}
        id={e.id}
        checkerCompletion={checkerCompletion}
      />
      <ToastContainer />
    </div>
  );
};

export default RequestConfig;

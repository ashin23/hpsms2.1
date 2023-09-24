import supabase from "./supabaseClient";
import React, { useEffect, useState } from "react";
import ModalEmp from "./ModalEmp";

const EmployeeConfig = ({
  empData,
  HandleChangePass,
  uncheck,
  selectedData,
  setUncheck,
}) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);

  const [selected, setSelected] = useState([]);

  // function addemparray(){
  //   const activedata =
  // }

  const HandleChange = (e, index) => {
    HandleChangePass(e, empData.id, empData);
  };

  useEffect(() => {
    for (let index = 0; index < selectedData.length; index++) {
      if (selectedData[index].empData.id === empData.id) {
        document.getElementById(empData.id).checked = true;
      } else {
        document.getElementById(empData.id).checked = false;
      }
    }
  }, [uncheck]);

  const HandleArchive = async () => {
    const { data: employee } = await supabase.from("Archive").insert({
      FullName: empData.FullName,
      Email: empData.Email,
      City: empData.City,
      Exp: empData.Exp,
      Relocate: empData.Relocate,
      Position: empData.Position,
    });
    const { error } = await supabase
      .from("EmployeeList")
      .delete()
      .eq("id", empData.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div className="p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-3 w-[100%] ">
        <div className=" flex text-md ">
          <input
            type="checkbox"
            id={empData.id}
            onChange={(e) => HandleChange(e, empData.id)}
            value={empData.FullName}
            className="mr-1"
          ></input>
          <div >{empData.FullName}</div>
        </div>
        <div className="text-md  ml-[20%]">{empData.Position}</div>
        <div
          onClick={() => setShowModal(true)}
          className="hover:underline cursor-pointer text-md ml-[39%]"
        >
          {empData.Email}
        </div>
        
      </div>
      <div className="flex gap-2 w-[20%] p-2">
        <button
          onClick={() => HandleArchive()}
          className="bg-slate-400  p-2 rounded-md"
        >
          Archive
        </button>
      </div>
      <ModalEmp
        Info={empData}
        visible={showmodal}
        Close={handleclosemodalprofile}
      />
    </div>
  );
};

export default EmployeeConfig;

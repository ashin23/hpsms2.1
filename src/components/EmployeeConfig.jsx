import supabase from "./supabaseClient";
import React, { useEffect, useState } from "react";
import ModalEmp2 from "./ModalEmp2";

const EmployeeConfig = ({
  empData,
  handleChange,
  selectedData,
  setempdetailed,
}) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);

  useEffect(() => {
   
  }, [selectedData, empData]);

  const handleshowApplicant =  (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Employee_List")
      .update({ Notifications: "true" })
      .eq("id", empData.id);
  };

  return (
    <div className="flex bg-slate-200 w-[100%] mt-2" onClick={() => updateNotif()}>
      <div className="grid  grid-rows-3 md:grid-cols-3 w-[100%] lg:h-10 bg-slate-100 md:gap-5">
        <div className=" md:grid md:mr-[80%] md:grid-cols-2 ">
          <input
            type="checkbox"
            onChange={handleChange}
            value={empData.Name}
            className="md:mt-2"
          />
          <div className="">{empData.Name}</div>
        </div>
        <div className="text-md  md:ml-[20%]">{empData.Position}</div>
        <div
          onClick={handleshowApplicant}
          className={`${
            empData.Notifications === "false" && "border-2 border-red-500"
          } md:p-3 md:hover:translate-x-2  md:hover:p-4 duration-500  md:mt-1 md:rounded-md`}
        >
          {empData.Email}
        </div>
        
      </div>

      <ModalEmp2
        Info={empData}
        visible={showmodal}
        Close={handleclosemodalprofile}
      />
    </div>
  );
};

export default EmployeeConfig;

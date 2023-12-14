import React, { useEffect } from "react";

function Deploy({ pos, setemployee, employee, setemp1 }) {
  useEffect(() => {
    updateStatus();
  }, [pos]);
  const updateStatus = (index, newStatus) => {
    for (let index = 0; index < employee.length; index++) {
      if(employee[index].status === "Undeploy"){
        const updatedData = [...employee]; // Create a copy of the original array
        updatedData[index] = { ...updatedData[index], status: "Deploy" }; // Update the status at the specified index
        setemployee(updatedData); // Update the state with the modified array
      }
    }
   
  };
  const removeItem = (itemToRemove) => {
    // Filter out the itemToRemove from the array
    const updatedArray = employee.filter((item) => item.uuid !== itemToRemove);
    // Update the state with the new array
    setemployee(updatedArray);
  };

  return (
    <>
      {pos.status === "Deploy"}
      <div className=" mt-2 p-1 bg-slate-300 rounded-md  flex justify-between">
        {pos.Email}
        <button
          className="p-1 bg-red-700 rounded-md px-2"
          onClick={() => removeItem(pos.uuid)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default Deploy;

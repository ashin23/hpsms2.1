import React from 'react'

const ModalSalary = ({ isSalary, notOpen}) => {
    if (!isSalary) return null;
    return (
      <div
        className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
      justify-center items-center top-50 flex ">
          
        <div className="w-[50%] grid grid-cols-1  mt-7 rounded bg-white group-focus:block">
          <div className="text-left border rounded">
          <h1 className="ml-5 font-bold">Salary</h1>
            <div className="px-4 py-2  border-b text-black">
              <input className="mr-2 hover:bg-sky-700 h-5 w-5 " type= "checkbox"></input>
               0 - 10k PHP  
            </div>
            <div className="px-4 py-2  border-b text-black">
            <input className="mr-2 hover:bg-sky-700 h-5 w-5 " type= "checkbox"></input>
               11 - 20k PHP
            </div>
            <div className="px-4 py-2  border-b text-black">
            <input className="mr-2 hover:bg-sky-700 h-5 w-5 " type= "checkbox"></input>
               20 - 25k PHP
            </div>
            <div className="px-4 py-2  border-b text-black">
            <input className="mr-2 hover:bg-sky-700 h-5 w-5 " type= "checkbox"></input>
               26 - 35k PHP
            </div>
          </div>
          <div className="grid grid-cols-2">
            <button className=" hover:bg-green-400  hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg">Apply</button>
            <button className=" hover:bg-sky-400  hover:text-white p-[0.5%] hover:-translate-y-1 rounded-lg" onClick={() => notOpen()}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default ModalSalary
import React from "react";
import logo from "./images/hotelproimage.png";
const Layoutdoc = ({ componentRef, Info, srcIMG }) => {
  return (
    <>
      <div ref={componentRef}>
        <div className="items-center p-5 ">
          <div className="flex h-fit w-[100%] items-center justify-between    gap-32">
            <div className="grid grid-rows-1 gap-2 font-medium ml-[10%]">
              <img
                src={logo}
                className="md:w-[100px] h-[100px] w-[130px] flex gap-1 items-center md:font-bold  text-sm"
              ></img>
              <label>Unit 3203 Robinson Equitable Tower</label>
              <label>ADB Avenue cor Proveda Street, Ortigas Center</label>
              <label>Pasig City Tel. No: 8674206</label>
              <label>
                Email: <label>hotelproservices@gmail.com</label>
              </label>
            </div>
            <img
              src={srcIMG}
              className="md:h-[200px] md:w-[200px] w-[100px] h-[100px]  mr-[10%] -mt-8 md:-mt-0  shadow-md shadow-black rounded-md"
            ></img>
          </div>
          <label className="flex pl-2 w-full mt-5 justify-start bg-black text-white mb-1  font-semibold">
            EMPLOYEE INFORMATION
          </label>
          <div className=" grid  grid-cols-2 border-4  justify-between border-slate-400 p-1 gap-1">
            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Name:
              </span>
              <em className="   ml-3 font-medium">{Info.Name}</em>
            </label>

            <label className=" w-full  border-4 flex items-center  ">
              {" "}
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Provincial Address:
              </span>
              <em className=" ml-2 font-medium">{`${Info.Provincial_Address}`}</em>
            </label>

            <label className=" w-full border-4 flex  items-center">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Position Desired:
              </span>
              <em className=" ml-2 font-medium">{`${Info.Position}`}</em>
            </label>

            <label className="w-full border-4 flex  items-center">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Date:
              </span>
              <em className=" ml-2 font-medium"> {`${Info.created_at}`}</em>
            </label>

            <lable className=" w-full border-4 flex  items-center ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                {" "}
                Mobile No:{" "}
              </span>
              <em className=" ml-2 font-medium">{Info.Mobile_No}</em>
            </lable>

            <lable className=" w-full border-4 flex  items-center">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Email:
              </span>
              <em className=" ml-2 font-medium">{Info.Email}</em>{" "}
            </lable>

            <label className=" w-full border-4 flex  items-center ">
              {" "}
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Date of Birth:
              </span>
              <em className=" ml-2 font-medium">{Info.Date_of_Birth}</em>
            </label>

            <label className=" w-full border-4 flex  items-center">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                {" "}
                Age:
              </span>
              <em className=" ml-2 font-medium">{Info.Age}</em>
            </label>

            <label className=" w-full border-4 flex  items-center">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Sex:
              </span>
              <em className=" ml-2 font-medium">{Info.Sex}</em>
            </label>

            <label className=" w-full border-4 flex  items-center ">
              {" "}
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Civil Status:
              </span>
              <em className=" ml-2 font-medium">{Info.CivilStatus}</em>
            </label>

            <label className=" w-[100%] font-bold border-4 ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Religion:
              </span>
              <em className=" ml-2 font-medium">{Info.Religion}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Address:
              </span>
              <em className=" ml-2 font-medium">{Info.City_Address}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Name of Mother:
              </span>{" "}
              <em className=" ml-2 font-medium">{Info.Name_of_Mother}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Occupation:
              </span>{" "}
              <em className=" ml-2 font-medium">{Info.Occupation_Mother}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                {" "}
                Name of Father:{" "}
              </span>
              <em className=" ml-2 font-medium">{Info.Name_of_Father}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                {" "}
                Occupation:
              </span>
              <em className=" ml-2 font-medium">{Info.Occupation_Father}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Person to Notify Incase of Emergency:
              </span>
              <em className=" ml-2 font-medium">{Info.Notify_Emergency}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Relationship:
              </span>{" "}
              <em className=" ml-2 font-medium">{Info.Relationship}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                his/her Address:{" "}
              </span>{" "}
              <em className=" ml-2 font-medium">{Info.Emergency_Address}</em>
            </label>

            <label className="w-[100%] font-bold border-4">
              {" "}
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold">
                Contact No:
              </span>{" "}
              <em className=" ml-2 font-medium">{Info.Contact_Number}</em>
            </label>
          </div>

          <label className="flex pl-2 w-full mt-1 justify-start bg-black text-white mb-1  font-semibold">
            EDUCATIONAL BACKGROUND
          </label>
          <div className=" grid  grid-cols-2 border-4  justify-between border-slate-400 p-1 gap-1">
            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                College:
              </span>
              <em className="ml-3 font-medium">{Info.College}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Year Graduated:
              </span>
              <em className="ml-3 font-medium">{Info.College_Graduated}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Course:
              </span>
              <em className="ml-3 font-medium">{Info.Course}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Special Course & Training:
              </span>
              <em className="ml-3 font-medium">{Info.Special_Course}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Vocational:
              </span>
              <em className="ml-3 font-medium">{Info.Vocational}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Year Graduated:
              </span>
              <em className="ml-3 font-medium">{Info.Vocational_Graduated}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                High School:
              </span>
              <em className="ml-3 font-medium">{Info.HighSchool}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Year Graduated:
              </span>
              <em className="ml-3 font-medium">{Info.HighSchool_Graduated}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Elementary School:
              </span>
              <em className="ml-3 font-medium">{Info.Elementary}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Year Graduated:
              </span>
              <em className="ml-3 font-medium">{Info.Elementary_Graduated}</em>
            </label>
          </div>

          <label className="flex pl-2 w-full mt-24 justify-start bg-black text-white mb-1  font-semibold">
            EMPLOYEMENT HISTORY
          </label>
          <div className=" grid  grid-cols-3 border-4  justify-between border-slate-400 p-1 gap-1">
            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Inclusive Dates
              </span>
              <em className="ml-3 font-medium">{Info.Inclusive_Dates}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Company History:
              </span>
              <em className="ml-3 font-medium">{Info.Company_History}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Position History:
              </span>
              <em className="ml-3 font-medium">{Info.Position_History}</em>
            </label>
          </div>
          <label className="flex pl-2 w-full mt-1 justify-start bg-black text-white mb-1  font-semibold">
            CHARACTER REFERENCES
          </label>
          <div className="grid  grid-cols-3 border-4  justify-between border-slate-400 p-1 gap-1">
            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Names
              </span>
              <em className="ml-3 font-medium">{Info.Name_References}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Company
              </span>
              <em className="ml-3 font-medium">{Info.Company_Referencess}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Position
              </span>
              <em className="ml-3 font-medium">{Info.Position}</em>
            </label>
          </div>

          <div className="grid  grid-cols-1 border-4  justify-between border-slate-400 p-1 gap-1">
            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                SSS No:
              </span>
              <em className="ml-3 font-medium">{Info.SSS_Number}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                Phil Health No:
              </span>
              <em className="ml-3 font-medium">{Info.Phil_Health_No}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                PAG-IBIG No:
              </span>
              <em className="ml-3 font-medium">{Info.Pag_Ibig_Nos}</em>
            </label>

            <label className="  w-full border-4 flex items-center   ">
              <span className="bg-gray-300 whitespace-nowrap border-4 text-black px-1 font-semibold  ">
                TIN No:
              </span>
              <em className="ml-3 font-medium">{Info.Tin_Number}</em>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layoutdoc;

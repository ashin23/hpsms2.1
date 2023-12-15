import React from "react";
import logo from "./images/hotelproimage.png";
const Layoutdoc = ({ componentRef, Info, srcIMG }) => {
  return (
    <>
      <div ref={componentRef}>
        <div className="items-center p-5 ">
          <div className="flex h-fit w-[100%] items-center justify-between    gap-32">
            <div className="grid grid-rows-1 ml-[5%]">
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
              className="md:h-[200px] md:w-[200px] w-[100px] h-[100px]  mr-[5%] -mt-8 md:-mt-0  shadow-md shadow-black rounded-md"
            ></img>
          </div>
          <label className="flex h-16 w-full justify-center mt-5 text-2xl font-semibold">
            EMPLOYEE INFORMATION 
          </label>

          <div className=" flex  grid-cols-2 justify-between ">
            <label className="ml-[5%]">Position Desired:{Info.Position}</label>
            <label className="mr-[5%]">Date:{Info.created_at}</label>
          </div>
          <div className="grid grid-cols-1">
            <label className="ml-[5%]">Name:{Info.Name}</label>
            <label className="ml-[5%]">
              Provincial Address:{Info.Provincial_Address}
            </label>
          </div>
          <div className=" grid-cols-2 flex justify-between ">
            <lable className="ml-[5%]">Mobile No:{Info.Mobile_No} </lable>
            <lable className="mr-[5%]">Email:{Info.Email} </lable>
          </div>
          <div className=" grid-cols-3 flex justify-between">
            <label className="ml-[5%]">
              Date of Birth: {Info.Date_of_Birth}
            </label>
            <label>Age: {Info.Age}</label>
            <label className="mr-[5%]">Sex: {Info.Sex}</label>
          </div>
          <div className=" grid-cols-2 flex justify-between">
            <label className="ml-[5%]">Civil Status: {Info.CivilStatus}</label>
            <label className="mr-[5%]">Religion: {Info.Religion}</label>
          </div>
          <label className="ml-[5%]">Address: {Info.City_Address}</label>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              Name of Mother: {Info.Name_of_Mother}
            </label>
            <label className="mr-[5%]">
              Occupation: {Info.Occupation_Mother}
            </label>
          </div>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              Name of Father: {Info.Name_of_Father}
            </label>
            <label className="mr-[5%]">
              Occupation: {Info.Occupation_Father}
            </label>
          </div>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              Person to Notify Incase of Emergency: {Info.Notify_Emergency}
            </label>
            <label className="mr-[5%]">Relationship: {Info.Relationship}</label>
          </div>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              his/her Address: {Info.Emergency_Address}
            </label>
            <label className="mr-[5%]">Contact No: {Info.Contact_Number}</label>
          </div>
          <label className="ml-[5%]">EDUCATIONAL BACKGROUND</label>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">College:{Info.College}</label>
            <label className="mr-[5%]">
              Year Graduated:{Info.College_Graduated}
            </label>
          </div>
          <label className="ml-[5%]">Course:{Info.Course}</label>
          <label className="ml-[5%]">
            Special Course & Training:{Info.Special_Course}
          </label>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              Vocational/Senior High:{Info.Vocational}
            </label>
            <label className="mr-[5%]">
              Year Graduated:{Info.Vocational_Graduated}
            </label>
          </div>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">High School:{Info.HighSchool}</label>
            <label className="mr-[5%]">
              Year Graduated:{Info.HighSchool_Graduated}
            </label>
          </div>
          <div className="grid-cols-2 flex justify-between">
            <label className="ml-[5%]">
              Elementary School:{Info.Elementary}
            </label>
            <label className="mr-[5%]">
              Year Graduated:{Info.Elementary_Graduated}
            </label>
          </div>
          <label className="ml-[5%]">EMPLOYEMENT HISTORY</label>
          <div className="grid-cols-3 flex justify-between">
            <label className="ml-[5%]">
              Inclusive Dates:{Info.Inclusive_Dates}
            </label>
            <label>Company History:{Info.Company_History}</label>
            <label className="mr-[5%]">
              Position History:{Info.Position_History}
            </label>
          </div>
          <label className="ml-[5%]">CHARACTER REFERENCES</label>
          <div className="grid-cols-3 flex justify-between">
            <label className="ml-[5%]">Names:{Info.Name_References}</label>
            <label>Company:{Info.Company_References}</label>
            <label className="mr-[5%]">Position:{Info.Position}</label>
          </div>
          <div className="grid grid-cols-1 ml-[5%]">
            <label>SSS No:{Info.SSS_Number}</label>
            <label>Phil Health No:{Info.Phil_Health_No}</label>
            <label>PAG-IBIG No:{Info.Pag_Ibig_No}</label>
            <label>TIN No:{Info.Tin_Number}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layoutdoc;

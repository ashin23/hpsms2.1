import React, { useState } from "react";
import { useEffect } from "react";
import supabase from "./supabaseClient";
import Logoviewer from "./Logoviewer";
import { GoClock } from "react-icons/go";
import { FaBriefcase, FaBuilding } from "react-icons/fa";
import { FaLocationDot, FaCalendarDay, FaPesoSign } from "react-icons/fa6";
import "ldrs/ring";
import { lineSpinner } from "ldrs";
function PostConfig({
  postInfo,
  Pposition,
  Plocation,
  Page,
  Pheight,
  Psalary,
  Photel,
  Pdob,
  PjobDescrip,
  Pcareer,
  Pexperience,
  Pspecializations,
  Pqualification,
  Pjobtype,
  setInfo,
  email,
  setjobtitle,
  setFile1,
  setFile21,
  mobile,
  setdisableButton,
}) {
  const [file1, setFile] = useState();
  const [file12, setFile12] = useState();
  const [hide, setHide] = useState(false);

  function HandleClick() {
    Pposition(postInfo.position);
    Plocation(postInfo.location);
    Page(postInfo.age);
    Pheight(postInfo.height);
    Psalary(postInfo.salary);
    Photel(postInfo.hotel);
    Pdob(postInfo.created_at);
    PjobDescrip(postInfo.jobdescrip);
    Pcareer(postInfo.carrier);
    Pexperience(postInfo.experience);
    Pspecializations(postInfo.specializations);
    Pqualification(postInfo.qualification);
    Pjobtype(postInfo.jobtype);
    setjobtitle(postInfo.jobtitle);
    setInfo(postInfo);
    setFile1(file1);
    setFile21(file12);
    mobile();
    setdisableButton(null);
    applychecker();
  }

  const applychecker = async () => {
    const { data: applicant } = await supabase.from("Applicant_List").select();

    for (let index = 0; index < applicant.length; index++) {
      if (
        applicant[index].Hotel === postInfo.hotel &&
        applicant[index].Email === email?.Email
      ) {
        setdisableButton(true);
        return;
      } else {
        setdisableButton(false);
       
      }
    }
  };
  // fether images
  useEffect(() => {
    Handlefetchfile();
    Handlefetchfile1();
  }, []);
  // cover photo
  const Handlefetchfile1 = async () => {
    const { data: cover } = await supabase.storage
      .from("Cover")
      .list(postInfo.hoteluuid + "/");
    setFile12(await cover);
  };
  // logo
  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Logo")
      .list(postInfo.hoteluuid + "/");
    setFile(await file);
  };

  return (
    <>
      <button
        className="hover:bg-[#78C1F3]  focus:outline-none focus:border-[#020024] shadow-lg focus:shadow-none focus:ring  rounded-xl  border-2 bg-[#FBF8FF] md:p-3 md:my-4 p-2 my-5 w-[90%] -ml-5  h-auto"
        onClick={() => HandleClick()}
      >
        <div className="flex w-fit ">
          <div className="text-left ml-3 ">
            {!file1 ? (
              <l-line-spinner
                size="20"
                stroke="3"
                speed="1"
                color="black"
              ></l-line-spinner>
            ) : (
              <>
                <div className="flex">
                  {file1.map((file1) => (
                    <Logoviewer
                      key={file1.id}
                      file1={file1}
                      Email={postInfo.hoteluuid}
                    />
                  ))}
                </div>
              </>
            )}

            <h1 className="font-medium text-[#162388] text-2xl flex items-center gap-2 mb-5">
              {postInfo.jobtitle}{" "}
              <label
                className={`${
                  (postInfo.jobtype === "Full time" && "bg-green-500") ||
                  (postInfo.jobtype === "Part-time" && "bg-blue-500") ||
                  (postInfo.jobtype === "Temporary" && "bg-slate-500")
                } rounded-md text-xs p-1 m-2 text-slate-200 `}
              >
                {postInfo.jobtype}
              </label>
            </h1>
            <p className="font-normal flex ">
              <FaBriefcase className="text-xl mr-1 text-slate-400" />
              {postInfo.position}
            </p>
            <p className="font-normal flex">
              <FaBuilding className="text-xl  mr-1 text-slate-400" />
              {postInfo.hotel}
            </p>
            <p className="font-normal flex">
              {" "}
              <FaLocationDot className="text-xl mr-1 text-slate-400" />{" "}
              {postInfo.location}
            </p>
            <p className="font-normal  flex">
              <FaPesoSign className="text-xl mr-1 text-slate-400" />{" "}
              {postInfo.salary} per day
            </p>
            <p className="font-normal flex">
              <FaCalendarDay className="text-lg mr-1 text-slate-400" />{" "}
              {postInfo.created_at}
            </p>
          </div>
        </div>
      </button>
    </>
  );
}

export default PostConfig;

import React, { useState } from "react";

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
  
}) {
  function HandleClick() {
    Pposition(postInfo.position);
    Plocation(postInfo.location);
    Page(postInfo.age);
    Pheight(postInfo.height);
    Psalary(postInfo.salary);
    Photel(postInfo.hotel);
    Pdob(postInfo.dob);
    PjobDescrip(postInfo.jobdescrip);
    Pcareer(postInfo.carrier);
    Pexperience(postInfo.experience);
    Pspecializations(postInfo.specializations);
    Pqualification(postInfo.qualification);
    Pjobtype(postInfo.jobtype);
    setInfo(postInfo);
  }
  

  return (
    <>
      <button
        className="hover:bg-[#78C1F3] focus:outline-none focus:border-red-500 focus:ring   border-2 bg-[#FBF8FF] md:p-3 md:my-4 p-2 my-5 w-[90%] "
        onClick={() => HandleClick()}
      >
        <h1>Position: {postInfo.position}</h1>
        <p>Location: {postInfo.location}</p>
        <p>Salary: {postInfo.salary}</p>
      </button>
    </>
  );
}

export default PostConfig;

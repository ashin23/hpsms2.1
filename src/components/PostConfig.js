import React from "react";

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
}) {

function HandleClick(){
    Pposition(postInfo.position)
    Plocation(postInfo.location)
    Page(postInfo.age)
    Pheight(postInfo.height)
    Psalary(postInfo.salary)
    Photel(postInfo.hotel)
    Pdob(postInfo.dob)
    PjobDescrip(postInfo.jobdescrip)
    Pcareer(postInfo.carrier)
    Pexperience(postInfo.experience)
    Pspecializations(postInfo.specializations)
    Pqualification(postInfo.qualification)
    Pjobtype(postInfo.jobtype)

}
    
  return (
    
      <div className="hover:bg-[#78C1F3] bg-[#FBF8FF] p-1 my-8 w-[90%]" onClick={()=> HandleClick()} >
        <h1>Position: {postInfo.position}</h1>
        <p>Location: {postInfo.location}</p>
        <p>Salary: {postInfo.salary}</p>
        
      </div>
    
  );
  }

export default PostConfig;

import { useState } from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import UserListConfig from "./UserListConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCreateAcc from "./ModalCreateAcc";

import ReactPaginate from "react-paginate";
import { IoPersonAdd } from "react-icons/io5";

const UserList = () => {
  const [search1, setSearch1] = useState("");
  const [userList, setUserList] = useState([]);

  const [showModalCreateAcc, setShowCreateAcc] = useState(false);

  const [usertotalemp, setusertotalemp] = useState([]);
  const [usertotalapp, setusertotalapp] = useState([]);
  const [usertotalcoord, setusertotalcoord] = useState([]);
  const [usertotalhr, setusertotalhr] = useState([]);
  const [usertotalrestricted, setuserrestricted] = useState([]);

  const [restricted, setrestricted] = useState("Restricted");
  const [coord, setcoord] = useState("Coordinator");
  const [hr, sethr] = useState("HR");

  const userRestricted = async () => {
    const { data: request } = await supabase
      .from("UserList")
      .select()
      .eq("userlvl", restricted);
    setuserrestricted(request);
  };

  const userHR = async () => {
    const { data: hr1 } = await supabase
      .from("UserList")
      .select()
      .eq("userlvl", hr);
    setusertotalhr(hr1);
  };

  const userCoord = async () => {
    const { data: coordi } = await supabase
      .from("UserList")
      .select()
      .eq("userlvl", coord);
    setusertotalcoord(coordi);
  };

  const userApplicant = async () => {
    const { data: app } = await supabase.from("NewUser").select();
    setusertotalapp(app);
  };

  const userEmployee = async () => {
    const { data: request } = await supabase.from("Employee_List").select();
    setusertotalemp(request);
  };

  const NotifyCode = () => {
    toast.success("Password has been succesfully updated!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  //Realtime
  useEffect(() => {
    FetchUserList();
    userEmployee();
    userApplicant();
    userCoord();
    userHR();
    userRestricted();
    const Request = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "UserList",
        },
        (payload) => {
          FetchUserList();
          userCoord();
          userHR();
          userRestricted();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Employee_List",
        },
        (payload) => {
          FetchUserList();
          userEmployee();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "NewUser",
        },
        (payload) => {
          FetchUserList();
          userApplicant();
        }
      )
      .subscribe();
  }, []);

  const FetchUserList = async () => {
    const { data: request } = await supabase.from("UserList").select();
    const { data: requestEmp } = await supabase.from("Employee_List").select();
    const { data: newUser } = await supabase.from("NewUser").select();
    setUserList(request.concat(requestEmp, newUser));
  };

  const [currentitems, setcurrentitems] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [itemsOffset, setItemOffset] = useState(0);
  const perpage = 7;

  const endoffsett = itemsOffset + perpage;
  
  useEffect(() => {
    setcurrentitems(userList);
   
    setpagecount(Math.ceil(userList.length / perpage));
  }, [itemsOffset, perpage, userList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % userList.length;

    setItemOffset(newOffset);
  };
  if (showModalCreateAcc) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "unset";
  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col bg-black items-center justify-center place-content-center ">
      <div className="h-[100%] bg-white w-[100%] flex flex-col  ">
        <h1 className="mt-20 font-semibold flex justify-center   text-3xl bg-[#040463] text-white p-5 w-full">
          User List
        </h1>

        {/* table */}
        <div className=" p-3 w-[100%] h-[69%] ">
          <div className="w-[100%] bg-slate-200 h-[100%] rounded-md items-center justify-start flex-col flex p-1 ">
            <div className="md:flex grid justify-between w-full">
              <div className="flex  gap-2 font-normal text-xs  md:text-base p-3 w-full md:justify-start justify-center">
                <label className="">
                  Total Applicants(<em> {usertotalapp.length} </em>)
                </label>

                <label className="">
                  Total Employee(<em> {usertotalemp.length} </em>)
                </label>
                <label className="">
                  Total Coordinators(<em> {usertotalcoord.length} </em>)
                </label>
                <label className="">
                  Total HR(<em> {usertotalhr.length} </em>)
                </label>
                <label className="">
                  Total Restricted Accounts(
                  <em> {usertotalrestricted.length} </em>)
                </label>
              </div>
              <div className="flex items-center  h-[100%] w-[100%] mr-1 gap-2 mb-5">
                <input
                  className=" h-[30px] w-[90%]  pl-1 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                  placeholder="Search name"
                  type="search"
                  onChange={(e) => setSearch1(e.target.value)}
                />
                <button
                  className="whitespace-nowrap flex bg-[#040463] p-1 rounded-md text-white"
                  onClick={() => setShowCreateAcc(true)}
                >
                  {" "}
                  <IoPersonAdd className="mt-1" />
                  Create Account
                </button>
              </div>
            </div>

            <div className="bg-white w-[100%] h-[100%]">
              {userList && (
                <div className="md:h-[100%] h-[70%] overflow-y-auto overflow-x-hidden p-1">
                  <div className=" grid grid-cols-3 bg-slate-200 p-2 mb-1 rounded-md font-bold">
                    <label className="justify-start flex">NAME</label>
                    <label className="justify-center flex">POSITION</label>
                    
                    <label className="justify-center flex">ACTION</label>
                  </div>
                  {userList
                    .filter((val) => {
                      try {
                        if (search1 === "") {
                          return val;
                        } else if (
                          val.Name.toLowerCase().includes(search1.toLowerCase())
                        ) {
                          return val;
                        }
                      } catch (error) {}
                    })
                    .sort((a, b) => (b.id > a.id ? 1 : -1))
                    .slice(itemsOffset, endoffsett)
                    .map((e) => (
                      <UserListConfig key={e.id} e={e} />
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end -mt-3 md:mt-2">
            <ReactPaginate
              previousLabel="Prev"
              nextLabel="Next"
              breakLabel=""
              pageCount={pagecount}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
              pageRangeDisplayed={3}
              containerClassName="flex items-center text-white gap-2"
              previousClassName="bg-[#040463] p-1 rounded-md text-white "
              nextClassName="bg-[#040463] p-1 rounded-md text-white"
              pageClassName="bg-[#040463] p-1 rounded-md text-white px-2"
            />
          </div>
        </div>
      </div>
      <ModalCreateAcc
        isOpen1={showModalCreateAcc}
        isClose1={setShowCreateAcc}
      />
      <ToastContainer />
    </div>
  );
};

export default UserList;

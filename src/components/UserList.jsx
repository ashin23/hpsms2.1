import { useState } from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import UserListConfig from "./UserListConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCreateAcc from "./ModalCreateAcc";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
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
  const perpage = 5;

  const endoffsett = itemsOffset + perpage;
  useEffect(() => {
    setcurrentitems(userList);
    setpagecount(Math.ceil(userList.length / perpage));
  }, [itemsOffset, perpage, userList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % userList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="">
      <div className="h-screen overflow-y-hidden">
        <div className="sticky top-5 flex justify-center  pt-32 item-center h-[45%]  overflow-y-auto md:overflow-y-hidden pb-8 bg-gradient-to-r from-[#708ef9] via-blue-300 to-blue-500">
          {/* Filter */}
          <div className="grid grid-cols-2 md:-mb-5  -mt-10 -mb-5 gap-2 p-2 md:-mt-14 md:gap-5">
            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">
                Total Applicants
              </label>
              <label className="font-bold text-lg md:text-4xl">
                {usertotalapp.length}
              </label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">
                Total Employee
              </label>
              <label className="font-bold text-lg md:text-4xl">
                {usertotalemp.length}
              </label>
            </div>

            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">
                Total Coordinators
              </label>
              <label className="font-bold text-lg md:text-4xl">
                {usertotalcoord.length}
              </label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">
                Total Applicants
              </label>
              <label className="font-bold text-lg md:text-4xl">
                {usertotalhr.length}
              </label>
            </div>
            <div className="bg-white flex flex-col w-full text-center rounded-md  ">
              <label className="font-bold text-lg md:text-xl">
                Total Restricted Account
              </label>
              <label className="font-bold text-lg md:text-4xl">
                {usertotalrestricted.length}
              </label>
            </div>

            <div>
              <label className=" md:ml-2  text-xl font-semibold text-white">
                Search name
              </label>
              <input
                className="-mt-6 md:-mt-0 top-96 w-[100%] md:w-[100%] z-50 mb-10 h-[30%]   py-1 px-6 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                placeholder="Search name"
                type="search"
                onChange={(e) => setSearch1(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <h1 className=" -mb-5 mt-4 z-50 font-bold flex flex-col md:mb-6 text-[25px] items-center">
          User List
        </h1>
        <div className="w-full   md:-mt-7 justify-between flex items-center">
          <ReactPaginate
            previousLabel={
              <span className="mt-2 w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 mr-4">
                <BsChevronCompactLeft />
              </span>
            }
            nextLabel={
              <span className="mt-2 w-10 h-10 flex items-center justify-center mr-4 rounded-md bg-gray-200">
                <BsChevronCompactRight />
              </span>
            }
            pageCount={pagecount}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            pageRangeDisplayed={5}
            containerClassName="flex mt-2   "
            pageClassName="block mt-2 border border-2  focus:outline-none focus:border-gray-400 focus:ring focus:bg-gray-500 bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center roundend-md mr-4 "
          />
          <button
            onClick={() => setShowCreateAcc(true)}
            className="-mb-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
        </div>
        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)]  h-[590px] md:rounded-[60px] md:rounded-e-none ">
          <div className="grid grid-cols-4 w-[100%] bg-slate-300">
            <label className="text-md p-3 w-[92%]">Email</label>
            <label className="text-md p-3 w-[92%]">Password</label>
            <label className="text-md p-3 w-[100%]">Position</label>
            <label className="text-md p-3 w-[10%] ">Action</label>
          </div>
          {userList && (
            <div className="md:h-[40%] h-[10rem] overflow-y-auto overflow-x-hidden">
              {userList
                .filter((val) => {
                  try {
                    if (search1 === "") {
                      return val;
                    } else if (
                      val.Email.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.Position.toLowerCase().includes(search1.toLowerCase())
                    ) {
                      return val;
                    }
                  } catch (error) {}
                })
                .sort((a, b) => (b.id > a.id ? 1 : -1))
                .slice(itemsOffset, endoffsett)
                .map((e) => (
                  <UserListConfig key={e.id} e={e} notify={NotifyCode} />
                ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <ModalCreateAcc
        isOpen1={showModalCreateAcc}
        isClose1={() => setShowCreateAcc(false)}
      />
    </div>
  );
};

export default UserList;

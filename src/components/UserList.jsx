import { useState } from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import UserListConfig from "./UserListConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [search1, setSearch1] = useState("");
  const [userList, setUserList] = useState([]);

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

  useEffect(() => {
    FetchUserList();
    const Request = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "UserList",
          table: "EmployeeList",
        },
        (payload) => {
          FetchUserList();
        }
      )
      .subscribe();
  }, []);

  const FetchUserList = async () => {
    const { data: request } = await supabase.from("UserList").select();
    const { data: requestEmp } = await supabase.from("EmployeeList").select();
    setUserList(request.concat(requestEmp));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);

  const lastPostIndex = currentPage * postperpage;
  const firstPostIndex = lastPostIndex - postperpage;
  const currentpost = userList.slice(firstPostIndex, lastPostIndex);

  let pages = [];

  for (
    let index = 1;
    index <= Math.ceil(userList.length / postperpage);
    index++
  ) {
    pages.push(index);
  }

  return (
    <div className="">
      <div className="h-screen">
        <div className="sticky top-5 flex justify-center  py-28 pb-0 bg-gradient-to-t from-white via-blue-400 to-blue-500">
          <input
            className="top-96 w-[90%] md:w-[40%] z-50 mb-10 h-[30%] lg:h-10 md:h-10  pl-10 pr-3 py-2 px-24 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Search name"
            type="search"
            onChange={(e) => setSearch1(e.target.value)}
          ></input>
        </div>
        <h1 className="mt-10 font-bold flex flex-col mb-6 text-[25px] items-center">
          User List
        </h1>
        <div className="grid ml-2 mb-2 grid-cols-5 md:ml-[5%] md:mb-1 gap-16 w-[20%] md:flex mt-2 md:gap-2">
          {" "}
          {pages.map((page, index) => {
            return (
              <button
                key={index}
                className="hover:bg-blue-300  focus:outline-none focus:border-blue-400 focus:ring focus:bg-blue-500  border-2 h-10 px-5  transition-colors duration-150 bg-white text-black  border-blue-600 focus:shadow-outline"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <div className=" p-3  w-[100%] z-10  md:pl-16 justify-center bg-white shadow-[0_1px_60px_-15px_rgba(0,0,0,0.3)] overflow-scroll overflow-x-hidden h-[590px] md:rounded-[60px] md:rounded-e-none ">
          <div className="flex w-[100%] bg-slate-300">
            <label className="text-md p-3 w-[92%]">Email</label>
            <label className="text-md p-3 w-[92%]">Password</label>
            <label className="text-md p-3 w-[100%]">Position</label>
            <label className="text-md p-3 w-[10%]"></label>
          </div>
          {currentpost && (
            <div className="h-[520px]  overflow-x-hidden ">
              {currentpost
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
                .sort((a, b) => (b.id <= a.id ? 1 : -1))
                .map((e) => (
                  <UserListConfig key={e.id} e={e} notify={NotifyCode} />
                ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserList;

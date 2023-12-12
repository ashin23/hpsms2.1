import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Applicant from "./components/Applicant";
import Quelist from "./components/Quelist";
import Employee from "./components/Employee";
import AccountSetting from "./components/AccountSetting";
import RequestList from "./components/RequestList";
import UserList from "./components/UserList";
import Archive from "./components/Archive";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import EmployeeCoord from "./components/EmployeeCoord";

function App() {
  const [email, setEmail] = useState();
  const [applicant, setApplicant] = useState();
  const [Hrdashboard, setHrdasboard] = useState();
  const [admindashboard, setadmindasboard] = useState();
  const [emailcoord, setemailcoord] = useState();
  const [accsettingemp, setaccettingemp] = useState();
  const [accsettinglist, setaccsettinglist] = useState();

  const nav = useNavigate();
  const navigate = () => nav("/");
  const [userauth, setuserauth] = useState();

 

  useEffect(() => {
  }, [userauth]);
  return (
    <>
      <div className="App ">
        {/* h-fit pinalitan */}
        <header className=" z-40  fixed w-screen top-0 h-fit">
          <Navbar
            // HandleCheckerUser={HandleCheckerUser}
            // checker={checker}
            setuserauth={setuserauth}
            setEmailSend={setEmail}
            applicant1={setApplicant}
            hrdashboard={setHrdasboard}
            admindashboard={setadmindasboard}
            setemailcoord={setemailcoord}
            setaccettingemp={setaccettingemp}
            setaccsettinglist={setaccsettinglist}
          />
        </header>

        <main className="flex-grow  z-10 bg-white  ">
          <Routes>
            <Route
              path="/*"
              element={
                <Dashboard
                  email={email}
                  applicant={applicant}
                  Hrdashboard={Hrdashboard}
                  admindashboard={admindashboard}
                />
              }
            />
            {userauth && (
              <>
                {(userauth=== "admin" || userauth === "HR") && (
                    <>
                      <Route path="/Applicant" element={<Applicant />} />
                      <Route path="/Quelist" element={<Quelist />} />
                      <Route path="/Employee" element={<Employee />} />
                      <Route path="/Archive" element={<Archive />} />
                      <Route path="/RequestList" element={<RequestList />} />
                      <Route path="/UserList" element={<UserList />} />
                    </>
                  )}
                {userauth === "Coordinator" && (
                  <>
                    <Route
                      path="/EmployeeCoord"
                      element={<EmployeeCoord email={emailcoord} />}
                    />
                  </>
                )}
                {userauth === "applicant" && (
                  <>
                    <Route path="/Profile" element={<Profile />} />{" "}
                  </>
                )}

                <Route
                  path="/AccountSetting"
                  element={<AccountSetting accsettingemp={accsettingemp} />}
                />
              </>
            )}
          </Routes>
        </main>

        {/* absolute remove footer */}
        <footer className="  fixed w-full bottom-0 h-fit">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;

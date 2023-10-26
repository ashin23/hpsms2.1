import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
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

  return (
    <div className="App ">
      <header className=" z-50 fixed w-screen top-0 h-fit">
        <Navbar
          setEmailSend={setEmail}
          applicant1={setApplicant}
          hrdashboard={setHrdasboard}
          admindashboard={setadmindasboard}
        />
      </header>

      <main className="flex-grow z-10 bg-white w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                email={email}
                applicant={applicant}
                Hrdashboard={Hrdashboard}
                admindashboard={admindashboard}
              />
            }
          />
          <Route path="/Applicant" element={<Applicant />} />
          <Route path="/Quelist" element={<Quelist />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/EmployeeCoord" element={<EmployeeCoord />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Archive" element={<Archive />} />
          <Route path="/AccountSetting" element={<AccountSetting />} />
          <Route path="/RequestList" element={<RequestList />} />
          <Route path="/UserList" element={<UserList />} />
        </Routes>
      </main>

      {/* absolute remove footer */}
      <footer className=" fixed w-full bottom-0 h-fit">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

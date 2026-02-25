import SidebarRow from "./SidebarRow";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBook, FaClipboardList, FaUser, FaExclamationTriangle, FaChartLine } from "react-icons/fa";

const Sidebar = ({isAdmin = false}) => {
  const [userName, setUserName] = useState("");
  const location = useLocation();

  console.log(isAdmin);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  return (
    <div className="flex flex-col min-h-screen shadow-2xl w-64 bg-gradient-to-b from-[#2274A5] to-[#1a5b82] sticky top-0 box-border z-50">
      <div className="flex flex-col items-center justify-center flex-grow-0 py-8 border-b border-white/20">
        <Profile height="64px" width="64px" />
        <div className="text-white/80 text-sm font-light mt-2">Welcome back,</div>
        <div className="text-white text-xl font-bold tracking-wide">{userName}</div>
      </div>
        

      <div className="flex flex-col flex-grow mt-6 px-2 space-y-1">
        <SidebarRow
          redirectUrl="dashboard"
          row_content="Dashboard"
          isActive={location.pathname === "/dashboard" || location.pathname === "/adminDashboard"}
          icon={<FaChartLine />}
        />
        <SidebarRow
          redirectUrl="inventory"
          row_content="Book Inventory"
          isActive={location.pathname === "/inventory"}
          icon={<FaBook />}
        />
        <SidebarRow
          redirectUrl="issued"
          row_content="Books Issued"
          isActive={location.pathname === "/issued"}
          icon={<FaClipboardList />}
        />
          
          {!isAdmin && <SidebarRow
          redirectUrl="profile"
          row_content="Account Info"
          isActive={location.pathname === "/profile"}
          icon={<FaUser />}
        />}

          {isAdmin && <SidebarRow 
            redirectUrl="defaulters" 
            row_content="Defaulters" 
            isActive={location.pathname === "/defaulters"}
            icon={<FaExclamationTriangle />}
          />}
      </div>
      
      <div className="p-4 text-center text-white/40 text-xs">
        Library System v1.0
      </div>
    </div>
  );
};

export default Sidebar;
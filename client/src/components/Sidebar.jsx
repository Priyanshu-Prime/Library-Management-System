import SidebarRow from "./SidebarRow";
import Profile from "./Profile";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);
  return (
    <div className="flex flex-col min-h-screen shadow-xl shadow-black/100 w-1/4 bg-[#2274A5] sticky top-0 box-border">
      <div className="flex flex-col items-center justify-center flex-grow-0 py-4">
        <Profile height="48px" width="48px" />
        <div className="text-white text-2xl font-normal p-1">Welcome</div>
        <div className="text-white text-2xl font-bold">{userName}</div>
      </div>
      <div className="flex flex-col flex-grow">
        <SidebarRow redirectUrl="inventory" row_content="Book Inventory" />
        <SidebarRow redirectUrl="issued" row_content="Books Issued" />
        <SidebarRow redirectUrl="requests" row_content="Book Requests" />
        <SidebarRow redirectUrl="profile" row_content="Account Info" />
      </div>
    </div>
  );
};

export default Sidebar;

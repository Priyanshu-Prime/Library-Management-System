import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarRow = ({ redirectUrl, row_content, isActive, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`mx-4 my-2 py-3 px-4 cursor-pointer flex items-center rounded-lg transition-all duration-200 ease-in-out ${
        isActive 
          ? "bg-white text-[#2274A5] shadow-md font-semibold" 
          : "text-white hover:bg-[#3B90C2] hover:text-white hover:shadow-sm"
      }`}
      onClick={() => navigate(`/${redirectUrl}`)}
    >
      {icon && <span className="text-xl mr-4">{icon}</span>}
      <span className="text-md tracking-wide">{row_content}</span>
    </div>
  );
};

export default SidebarRow;
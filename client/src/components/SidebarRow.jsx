import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarRow = ({ redirectUrl, row_content, isActive }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`py-4 px-6 cursor-pointer ${
        isActive ? "bg-[#3B90C2] text-black" : "bg-[#2274A5] text-white"
      } hover:bg-[#3B90C2] hover:text-black`}
      onClick={() => navigate(`/${redirectUrl}`)}
    >
      {row_content}
    </div>
  );
};

export default SidebarRow;
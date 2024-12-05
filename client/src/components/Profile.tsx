import React from "react";
import img from "../assets/Profile.png";

interface ProfileProps {
  height: string;
  width: string;
}

const Profile = ({ height, width }: ProfileProps) => {
  return (
    <div className="flex justify-center pt-20">
      <img src={img} className="content-center h-3/4" />
    </div>
  );
};

export default Profile;

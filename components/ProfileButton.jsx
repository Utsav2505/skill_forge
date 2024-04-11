import React from "react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const ProfileButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleProfile = (e) => {
    e.stopPropagation(); // Prevent event propagation to parent elements
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div onClick={toggleProfile} className="profileIcon">
        <Image src="./Logo.svg" width="50" height="50"></Image>
      </div>
      <div
        className={isClicked ? "profileIconLinks" : "hidden"}
        onClick={() => setIsClicked(false)}
      >
        <div style={{ padding: "0.5vw" }}>Profile</div>
        <div onClick={signOut}>Log out</div>
      </div>
    </>
  );
};

export default ProfileButton;

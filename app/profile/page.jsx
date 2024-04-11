"use client";
import Nav from "@components/nav.jsx";
import React from "react";
import "@styles/globals.css";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <>
      {/* banner */}
      <div className="banner"></div>
      <div className="profileBox">
        <div className="switch">
          <div className="section">Profile</div>
          <div className="section">Edit Profile</div>
          <div className="section">Resume/CV</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* common profile */}
          <div className="commonProfile">
            <div className="profilePic">
              <Image src={session?.user.image} width="180" height="180"></Image>
            </div>
            <div className="fixed_details">{session.user.name}</div>
            <div>
              <p
                className="fixed_details"
                style={{
                  fontFamily: "Sarabun",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                {session?.user.email}
              </p>
            </div>
            {/* show location */}
            <div></div>
          </div>
          {/* show profile details */}
          <div className="detailsTable">
            <table>
              <tr>
                <td>Name</td>
                <td>{session.user.name}</td>
              </tr>
              <tr>
                <td>Employment Status</td>
                <td></td>
              </tr>
              <tr>
                <td>Designation</td>
                <td></td>
              </tr>
              <tr>
                <td>Phone No.</td>
                <td></td>
              </tr>
              <tr>
                <td>Email Verification</td>
                <td></td>
              </tr>
              <tr>
                <td>Bio</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div></div>
        </div>
      </div>
      <Nav page={0} />
    </>
  );
};

export default Profile;

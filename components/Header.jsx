"use client";
import "@styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import ProfileButton from "./ProfileButton";
const Header = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const [isRed, setIsRed] = useState(false);

  return (
    <div className="headerPanel">
      <header style={{ display: "flex", flexDirection: "row" }}>
        {/* <Image src="./public/Logo.svg" alt="logo" width="100" height="100" /> */}
        <div>
          <img
            src="/logo2.svg"
            alt="logo"
            width="200"
            // height="100"
            className="logo"
          />
        </div>
        <div
          style={{
            position: "fixed",
            right: "1vw",
            top: "1vw",
          }}
        >
          {session?.user ? (
            <ProfileButton />
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    className="sign-in"
                    onClick={() => signIn(provider.id)}
                    onMouseOver={() => {
                      setIsRed(true);
                    }}
                    onMouseOut={() => {
                      setIsRed(false);
                    }}
                  >
                    <span>SIGN IN</span>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 74 74"
                      fill={isRed ? "#DF5757" : "none"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="37"
                        cy="37"
                        r="35.5"
                        stroke={isRed ? "#none" : "black"}
                        stroke-width="3"
                      ></circle>
                      <path
                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                        fill={isRed ? "white" : "black"}
                      ></path>
                    </svg>
                  </button>
                ))}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
//onClick={() => signIn(provider.id)}

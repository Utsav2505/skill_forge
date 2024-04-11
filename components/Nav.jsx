"use client";
import Link from "next/link";
import Links from "./Links";

const Nav = ({ page }) => {
  function showLinks() {
    document.querySelector(".links").style.display = "block";
  }
  return (
    <>
      <Links className="links" style={{ display: "none" }} />
      <div className="nav">
        <div
          className="navButton"
          style={{
            borderColor: page === 1 ? "white" : "#434343",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </div>
        <div
          className="navButton"
          style={{
            borderColor: page === 2 ? "white" : "#434343",
            width: "19vw",
          }}
          onClick={showLinks}
        >
          <div style={{ marginRight: "1vw" }}>Features</div>
          <div
            style={{
              transform: "translateY(0.2vw)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
        </div>
        <div
          className="navButton"
          style={{
            borderColor: page === 3 ? "white" : "#434343",
          }}
        >
          Github
        </div>
        <div
          className="navButton"
          style={{
            borderColor: page === 4 ? "white" : "#434343",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            About
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;

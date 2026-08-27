/* eslint-disable @next/next/no-img-element */
// This file is not in-use.
// We use RepsonsiveHeaderDNS.js, but you are free to change it via Layout.js

import Link from "next/link";
import { useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { Icon } from "semantic-ui-react";

const Header = () => {
  useEffect(() => {
    const menuBtn = document.querySelector(".menu-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    menuBtn.onclick = () => {
      items.classList.add("active");
      menuBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    };
    cancelBtn.onclick = () => {
      items.classList.remove("active");
      menuBtn.classList.remove("hide");
      cancelBtn.classList.remove("show");
      cancelBtn.style.color = "#ff3d00";
    };
  });

  const { user, signOut, isReady } = useContext(UserContext);

  return (
    <nav>
      <div className="menu-icon">
        <Icon name="sidebar" />
      </div>
      <div className="logo">
        <Link href="/">
          <>
            <img src="/images/dna-computer.png" alt="DENIAPPS" />
            <span>{process.env.NEXT_PUBLIC_SITE_NAME}</span>
          </>
        </Link>
      </div>
      <div className="nav-items scroll">
        {/* Blog navigation is temporarily disabled. */}
        <li key="about-menu">
          <Link href="/about">About Us</Link>
        </li>
        <li key="playground-menu">
          <Link href="/playground">Playground</Link>
        </li>

        {isReady &&
          user && [
            <li key="userMenu-1">
              <Link href="/dashboard">Dashboard</Link>
            </li>,
            <li key="userMenu-2">
              <Icon disabled name="user" />
              {user}
              <button
                type="button"
                className="link-button"
                style={{ paddingLeft: "10px", color: "#fff" }}
                onClick={signOut}
              >
                <Icon disabled name="sign out" />
              </button>
            </li>,
          ]}
        {isReady && !user && (
          <li>
            <Icon disabled name="user" key="userMenu-3" />
            <Link href="/signin">Login</Link>
          </li>
        )}
      </div>
      <div className="cancel-icon">
        <Icon name="close" />
      </div>
    </nav>
  );
};

export default Header;

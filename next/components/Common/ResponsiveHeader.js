// This file is not in-use.
// We use RepsonsiveHeaderDNS.js, but you are free to change it via Layout.js

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { Input, Icon } from "semantic-ui-react";

const Header = () => {
  const [kw, setKW] = useState("");
  const router = useRouter();

  useEffect(() => {
    const menuBtn = document.querySelector(".menu-icon");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const form = document.querySelector("form");
    menuBtn.onclick = () => {
      items.classList.add("active");
      menuBtn.classList.add("hide");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    };
    cancelBtn.onclick = () => {
      items.classList.remove("active");
      menuBtn.classList.remove("hide");
      searchBtn.classList.remove("hide");
      cancelBtn.classList.remove("show");
      form.classList.remove("active");
      cancelBtn.style.color = "#ff3d00";
    };
    searchBtn.onclick = () => {
      form.classList.add("active");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    };
  });

  const handleChange = (e) => {
    e.preventDefault();
    setKW(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    router.push("/search?kw=" + encodeURIComponent(kw));
  };

  const { user, signOut, isReady } = useContext(UserContext);

  return (
    <nav>
      <div className="menu-icon">
        <Icon name="sidebar" />
      </div>
      <div className="logo">
        <Link href="/">
          <a>{process.env.NEXT_PUBLIC_SITE_NAME}</a>
        </Link>
      </div>
      <div className="nav-items scroll">
        <li key="blog-menu">
          {" "}
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li key="about-menu">
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
        <li key="playground-menu">
          <Link href="/playground">
            <a>Playground</a>
          </Link>
        </li>

        <li key="mistake-menu">
          <Link href="/mistakes">
            <a>Mistakes</a>
          </Link>
        </li>

        {isReady &&
          user && [
            <li key="userMenu-1">
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
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
            <Link href="/signin">
              <a>Login</a>
            </Link>
          </li>
        )}
      </div>
      <div className="search-icon">
        <Icon name="search" />
      </div>
      <div className="cancel-icon">
        <Icon name="close" />
      </div>
      <form onSubmit={handleFormSubmit}>
        <Input
          icon={<Icon name="search" link onClick={handleFormSubmit} />}
          className="search-data"
          required
          placeholder="Search..."
          onChange={handleChange}
          value={kw}
        />
      </form>
    </nav>
  );
};

export default Header;

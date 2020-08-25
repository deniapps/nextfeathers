import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Icon } from "semantic-ui-react";
import ResponsiveHeader from "dna-responsive-nav";

const Header = () => {
  const router = useRouter();

  const handleSearch = (kw) => {
    router.push("/search?kw=" + encodeURIComponent(kw));
  };

  const { user, signOut, isReady } = useContext(UserContext);

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const links = (
    <ul>
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
          <li key="userMenu-2" className="right">
            <Icon disabled name="user" />
            {user.replace(/@.*$/, "")}
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
    </ul>
  );

  return (
    <ResponsiveHeader
      siteName={siteName}
      links={links}
      handleSearch={handleSearch}
    />
  );
};

export default Header;

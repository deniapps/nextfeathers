import Link from "next/link";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Container, Menu, Icon } from "semantic-ui-react";

const Header = () => {
  const { user, signOut, isReady } = useContext(UserContext);

  return (
    <Menu fixed="top" inverted borderless size="huge" className="scroll">
      <Container>
        <Menu.Item header key="menu-0">
          <Link href="/">
            <a>
              <Icon name="world" /> {process.env.NEXT_PUBLIC_SITE_NAME}
            </a>
          </Link>
        </Menu.Item>

        <Menu.Item key="menu-1a">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="menu-1b">
          <Link href="/playground">
            <a>Playground</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="menu-1d">
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </Menu.Item>

        {isReady &&
          user && [
            <Menu.Item key="menu-2">
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>,
            <Menu.Item position="right" key="menu-3">
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
            </Menu.Item>,
          ]}
        {isReady && !user && (
          <Menu.Item position="right" key="menu-3">
            <Icon disabled name="user" />
            <Link href="/signin">
              <a>Login</a>
            </Link>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Header;

import PropTypes from "prop-types";
import Head from "next/head";
import { Container, Loader } from "semantic-ui-react";
import Header from "./Common/Header";
import Footer from "./Common/MiniFooter";
import { useContext } from "react";
import UserContext from "./Context/UserContext";
import jwtDecode from "jwt-decode";
import { isExpired } from "../helpers/common";

// import redirect from "../lib/redirect";

// const isExpired = (expiresAt) => {
//   return new Date() > new Date(expiresAt * 1000);
// };

const Layout = (props) => {
  const { user, accessToken, signOut, isReady } = useContext(UserContext);
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (isExpired(decodedToken.exp)) {
      signOut();
      return null;
    }
  }

  const pageClass =
    props.pageType === "home" || props.pageType === "login"
      ? "coverPage"
      : "deniPage";

  return (
    <div id="deniApps" className={props.pageType}>
      <Container>
        <Head>
          <title>{props.pageTitle ? props.pageTitle : "DeNi Apps"}</title>
          <meta
            name="decription"
            content={
              props.pageDescription
                ? props.pageDescription
                : `We build websites & apps`
            }
          />
        </Head>
        <Header />
      </Container>
      <Container className={pageClass}>
        {props.authPage && !isReady && <Loader active></Loader>}
        {props.authPage && !user && isReady && <p>Please Login</p>}
        {(!props.authPage || !!user) && props.children}
      </Container>
      <Footer />
    </div>
  );
};

// Specifies the default values for props:
Layout.propTypes = {
  pageType: PropTypes.string,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  authPage: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;

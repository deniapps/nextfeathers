import PropTypes from "prop-types";
import Footer from "./Common/AEMiniFooter";
import { useContext } from "react";
import UserContext from "./Context/UserContext";
import { isExpired } from "../helpers/common";
import Head from "next/head";

// import redirect from "../lib/redirect";

// const isExpired = (expiresAt) => {
//   return new Date() > new Date(expiresAt * 1000);
// };

const Layout = props => {
  const { accessToken, signOut } = useContext(UserContext);
  if (accessToken) {
    if (isExpired(accessToken)) {
      signOut();
      return null;
    }
  }

  return (
    <div id="deniApps" className={props.pageType}>
      <Head>
        <title>{props.pageTitle ? props.pageTitle : "Analytical Expert"}</title>
        <meta
          name="decription"
          content={
            props.pageDescription
              ? props.pageDescription
              : `An Industry Leader in Analytical Service - Practical Solutions for Biopharmaceutical Analytical Sciences that Accelerate Drug Product Development`
          }
        />
      </Head>
      {props.children}
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
  children: PropTypes.node
};

export default Layout;

import PropTypes from "prop-types";
import { Container, Loader } from "semantic-ui-react";
import Header from "./Common/ResponsiveHeader";
import Footer from "./Common/MiniFooter";
import { useContext } from "react";
import UserContext from "./Context/UserContext";

const Layout = (props) => {
  const { user, isReady } = useContext(UserContext);
  const { pageType, authPage, children } = props;

  const pageWrapperClass = pageType ? pageType + "Wrapper" : "dnaWrapper";

  const pageClass =
    pageType === "home" || pageType === "login" ? "coverPage" : "deniPage";

  return (
    <div id="deniApps" className={pageWrapperClass}>
      <Header />

      <Container className={pageClass}>
        {authPage && !isReady && <Loader inline active></Loader>}
        {authPage && !user && isReady && <p>Please Login</p>}
        {(!authPage || !!user) && children}
      </Container>
      <Footer />
    </div>
  );
};

// Specifies the default values for props:
Layout.propTypes = {
  pageType: PropTypes.string,
  authPage: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;

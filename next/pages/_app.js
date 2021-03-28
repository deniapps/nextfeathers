import React from "react";
import App from "next/app";
import Router from "next/router";
import * as gtag from "../lib/gtag";

import UserContext from "../components/Context/UserContext";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
// import "./navi.css";
import "prismjs/themes/prism.css";
import "dna-responsive-nav/dist/dna-rn.css";
import "./photo.css";

import { getCurrentUser } from "helpers/common";
// import MobileDetect from "mobile-detect";

const NEXT_PUBLIC_USER_LC_KEY = process.env.NEXT_PUBLIC_USER_LC_KEY;

export default class deniApp extends App {
  state = {
    user: null,
    accessToken: null,
    isReady: false,
  };

  handleRouteChange = (url) => {
    gtag.pageview(url);
  };

  componentDidMount = async () => {
    const deniUser = getCurrentUser();

    // const deniUser = localStorage.getItem(NEXT_PUBLIC_USER_LC_KEY);

    // console.log("deniUser", deniUser);

    // if (deniUser && deniUser !== "undefined") {
    //   //TO-DO: allow to use proxy
    //   // const userStatus = await axios
    //   //   .get("/api/check-login")
    //   //   .then((response) => response.data);
    //   // if (userStatus.loggedIn) {
    //   //   const deniUserObj = JSON.parse(deniUser);
    //   //   this.setState({
    //   //     user: deniUserObj.firstName ? deniUserObj.firstName : "Unnamed",
    //   //   });
    //   // }

    //   const deniUserObj = JSON.parse(deniUser);
    //   // if not accessToken or the token is expired, then remove localStorage
    //   if (!deniUserObj.accessToken || isExpired(deniUserObj.accessToken)) {
    //     localStorage.removeItem(NEXT_PUBLIC_USER_LC_KEY);
    //   } else {
    //     this.setState({
    //       user: deniUserObj.firstName ? deniUserObj.firstName : "Unnamed",
    //       accessToken: deniUserObj.accessToken,
    //     });
    //   }
    // }
    let user = deniUser ? deniUser.user : null;
    let accessToken = deniUser ? deniUser.accessToken : null;

    this.setState({
      isReady: true,
      user,
      accessToken,
    });

    Router.events.on("routeChangeComplete", this.handleRouteChange);
  };

  componentWillUnmount = () => {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  };

  // if autoRevew = true, which means login with JWT token, then only need to refresh accessToken
  // should not redirect

  signIn = (userInfo, accessToken, autoRenew = false) => {
    let deniUser = userInfo;
    deniUser.accessToken = accessToken;
    localStorage.setItem(NEXT_PUBLIC_USER_LC_KEY, JSON.stringify(deniUser));

    gtag.event({
      action: "sign_in",
      category: "User",
    });

    this.setState(
      {
        user: deniUser.firstName ? deniUser.firstName : "Unnamed",
        accessToken,
      },
      () => {
        if (!autoRenew) Router.push("/");
      }
    );
  };

  signOut = () => {
    localStorage.removeItem(NEXT_PUBLIC_USER_LC_KEY);
    gtag.event({
      action: "sign_out",
      category: "User",
    });
    this.setState({
      user: null,
    });
    Router.push("/");
  };

  render() {
    const { Component, pageProps, isMobileFromSSR } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut,
          isReady: this.state.isReady,
          isMobileFromSSR,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}

// NOTE: If you need responsive navigation, then you can do mobile detection here to get isMobileFromSSR to avoid checking this on every single page.

// deniApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   // const appProps = await App.getInitialProps(appContext);
//   const agent = appContext.ctx.req
//     ? appContext.ctx.req.headers["user-agent"]
//     : "";
//   const md = new MobileDetect(agent);
//   const isMobileFromSSR = !!md.mobile();
//   // const agent = appContext.req.headers["user-agent"];
//   // console.log(agent);
//   // console.log("req1", appContext.ctx.req ? appContext.ctx.req.headers : "");
//   return { isMobileFromSSR };
// };

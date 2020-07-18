import React from "react";
import App from "next/app";
import Router from "next/router";
import UserContext from "../components/Context/UserContext";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
import "highlight.js/styles/nord.css";
import "prismjs/themes/prism.css";
// import MobileDetect from "mobile-detect";

const USER_LC_KEY = process.env.USER_LC_KEY;

export default class deniApp extends App {
  state = {
    user: null,
    accessToken: null,
    isReady: false,
  };

  componentDidMount = () => {
    const deniUser = localStorage.getItem(USER_LC_KEY);
    if (deniUser) {
      const deniUserObj = JSON.parse(deniUser);
      this.setState({
        user: deniUserObj.username,
        accessToken: deniUserObj.accessToken,
      });
    }
    this.setState({
      isReady: true,
    });
  };

  signIn = (username, accessToken) => {
    const deniUser = { username, accessToken };
    localStorage.setItem(USER_LC_KEY, JSON.stringify(deniUser));

    this.setState(
      {
        user: username,
        accessToken,
      },
      () => {
        Router.push("/");
      }
    );
  };

  signOut = () => {
    localStorage.removeItem(USER_LC_KEY);
    this.setState({
      user: null,
      accessToken: null,
    });
    Router.push("/");
  };

  render() {
    const { Component, pageProps, isMobileFromSSR } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          accessToken: this.state.accessToken,
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

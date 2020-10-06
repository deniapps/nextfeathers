/**
 * pages/api/me.js
 *
 * A demo API endpoint for getting the currently authenticated user.
 */

import { isExpired } from "helpers/common";

export default (req, res) => {
  const Cookies = require("cookies");
  const cookies = new Cookies(req, res);
  const authToken = cookies.get("auth-token") || "";

  const loggedIn = !isExpired(authToken);

  res.status(200).json({
    loggedIn,
  });

  // if (authToken === "123") {
  //   res.status(200).json({ email: "admin@example.com" });
  // } else if (!req.headers.authToken) {
  //   res.status(401).json({ error: "Authentication required" });
  // } else {
  //   res.status(403).json({ error: "Not permitted" });
  // }
};

/**
 * pages/api/check-login.js
 *
 * A API endpoint for checking if the user is logged in.
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
};

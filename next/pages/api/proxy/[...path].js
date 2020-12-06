import httpProxy from "http-proxy";
import Cookies from "cookies";
import url from "url";

const API_URL = process.env.API_HOST;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default (req, res) => {
  return new Promise((resolve, reject) => {
    const pathname = url.parse(req.url).pathname;
    const isLogin = pathname === "/api/proxy/authentication";

    const cookies = new Cookies(req, res);
    const authToken = cookies.get("auth-token");

    // Rewrite URL, strip out leading '/api'
    // '/api/proxy/*' becomes '${API_URL}/*'
    req.url = req.url.replace(/^\/api\/proxy/, "");

    // Don't forward cookies to API
    req.headers.cookie = "";

    // Set auth-token header from cookie
    if (authToken) {
      req.headers["Authorization"] = authToken;
    }

    proxy
      .once("proxyRes", (proxyRes, req, res) => {
        if (isLogin) {
          let responseBody = "";
          proxyRes.on("data", (chunk) => {
            responseBody += chunk;
          });

          proxyRes.on("end", () => {
            try {
              // console.log(JSON.parse(responseBody));
              const { accessToken, user } = JSON.parse(responseBody);
              const cookies = new Cookies(req, res);
              cookies.set("auth-token", accessToken, {
                httpOnly: true,
                sameSite: "lax", // CSRF protection
              });

              res.status(200).json({ user });
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        } else {
          resolve();
        }
      })
      .once("error", reject)
      .web(req, res, {
        target: API_URL,
        autoRewrite: false,
        selfHandleResponse: isLogin,
      });
  });
};

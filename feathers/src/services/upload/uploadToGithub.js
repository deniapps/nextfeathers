const axios = require("axios");

const owner = "deniapps";
const repo = "files";
const token = "YOURTOKEN";

const uploadToGithub = (fileName, fileContent) => {
  const url =
    "https://api.github.com/repos/" +
    owner +
    "/" +
    repo +
    "/contents/" +
    fileName;

  console.log(url);
  return axios
    .put(
      url,
      {
        message: "new file",
        committer: {
          name: "adambot",
          email: "adam@deniapps.com",
        },
        content: new Buffer(fileContent, "binary").toString("base64"),
      },
      {
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: basicAuth,
        // },
        auth: {
          username: "deniapps",
          password: token,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

module.exports = uploadToGithub;

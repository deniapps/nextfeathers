import axios from "axios";

const getTags = (accessToken) => {
  return axios
    .get(process.env.API_HOST + "/tags?$sort[name]", {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

export { getTags };

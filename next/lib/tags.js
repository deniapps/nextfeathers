import axios from "axios";

const getTags = () => {
  return axios
    .get("/api/proxy/tags?$sort[name]", {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

const getTagBySlug = (tagSlug) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_HOST + "/tags?slug=" + tagSlug, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

export { getTags, getTagBySlug };

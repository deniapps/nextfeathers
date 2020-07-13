import axios from "axios";

export const getPublicPosts = () => {
  return axios
    .get(process.env.API_HOST + "/posts?$sort[createdAt]=-1&_isPublic=1")
    .then((res) => {
      // console.log(res);
      return res;
    });
};

export const getPublicPost = (slug) => {
  return axios
    .get(process.env.API_HOST + "/posts/?slug=" + slug + "?_isPublic=1")
    .then((res) => {
      // console.log(res);
      return res;
    });
};

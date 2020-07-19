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
    .get(process.env.API_HOST + "/posts/?slug=" + slug + "&_isPublic=1")
    .then((res) => {
      return res;
    });
};

export const getPublicPostsByTag = (tag) => {
  return axios
    .get(process.env.API_HOST + "/posts/?tags[$in]=" + tag + "&_isPublic=1")
    .then((res) => {
      return res;
    });
};

export const getPublicTags = () => {
  return axios
    .get(process.env.API_HOST + "/tags?$sort[createdAt]=-1")
    .then((res) => {
      return res;
    });
};

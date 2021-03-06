// import axios from "axios";
import agent from "./agent";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
  ? process.env.NEXT_PUBLIC_PAGE_SIZE
  : 20;

// $select: [ 'text', 'userId' ]

export const getAllPublicPosts = (pageId = 0) => {
  const bigPageSize = 50;
  const skip = pageId * bigPageSize;
  return agent({
    method: "get",
    url:
      "/posts?$sort[createdAt]=-1&_isPublic=1" +
      "$select=[ 'slug', 'updatedAt' ]" +
      "&$limit=" +
      bigPageSize +
      "&$skip=" +
      skip,
  });
  // .then((res) => {
  //   // console.log(res);
  //   return res;
  // });
};

export const getPublicPosts = (pageId = 0) => {
  const skip = pageId * pageSize;
  return agent({
    method: "get",
    url:
      "/posts?$sort[createdAt]=-1&_isPublic=1" +
      "&$limit=" +
      pageSize +
      "&$skip=" +
      skip,
  });
  // return axios
  //   .get(
  //     process.env.NEXT_PUBLIC_API_HOST +
  //       "/posts?$sort[createdAt]=-1&_isPublic=1" +
  //       "&$limit=" +
  //       pageSize +
  //       "&$skip=" +
  //       skip
  //   )
  //   .then((res) => {
  //     // console.log(res);
  //     return res;
  //   });
};

export const searchPublicPosts = (kw, pageId = 0) => {
  const skip = pageId * pageSize;
  return agent({
    method: "get",
    url:
      "/posts/?$search=" +
      encodeURIComponent(kw) +
      "&_isPublic=1" +
      "&$limit=" +
      pageSize +
      "&$skip=" +
      skip,
  });
  // return axios
  //   .get(
  //     process.env.NEXT_PUBLIC_API_HOST +
  //       "/posts/?$search=" +
  //       encodeURIComponent(kw) +
  //       "&_isPublic=1" +
  //       "&$limit=" +
  //       pageSize +
  //       "&$skip=" +
  //       skip
  //   )
  //   .then((res) => {
  //     return res;
  //   });
};

export const getPublicPost = (slug) => {
  return agent({
    method: "get",
    url: "/posts/?slug=" + slug + "&_isPublic=1",
  });

  // return axios
  //   .get(
  //     process.env.NEXT_PUBLIC_API_HOST + "/posts/?slug=" + slug + "&_isPublic=1"
  //   )
  //   .then((res) => {
  //     return res;
  //   });
};

export const getPublicPostsByTag = (tag, pageId = 0) => {
  const skip = pageId * pageSize;

  return agent({
    method: "get",
    url:
      "/posts/?tags[$in]=" +
      tag +
      "&_isPublic=1" +
      "&$limit=" +
      pageSize +
      "&$skip=" +
      skip,
  });

  // return axios
  //   .get(
  //     process.env.NEXT_PUBLIC_API_HOST +
  //       "/posts/?tags[$in]=" +
  //       tag +
  //       "&_isPublic=1" +
  //       "&$limit=" +
  //       pageSize +
  //       "&$skip=" +
  //       skip
  //   )
  //   .then((res) => {
  //     return res;
  //   });
};

export const getPublicTags = () => {
  return agent({
    method: "get",
    url: "/tags?$sort[createdAt]=-1",
  });
  // return axios
  //   .get(process.env.NEXT_PUBLIC_API_HOST + "/tags?$sort[createdAt]=-1")
  //   .then((res) => {
  //     return res;
  //   });
};

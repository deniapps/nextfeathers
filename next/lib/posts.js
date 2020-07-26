import axios from "axios";

const createPost = (accessToken, data) => {
  return axios
    .post(process.env.API_HOST + "/posts", data, {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      return res;
    });
};

// use patch to update certain filed, and get createdBy automatically updated.
const updatePost = (accessToken, id, data) => {
  return axios
    .patch(process.env.API_HOST + "/posts/" + id, data, {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      return res;
    });
};

const getPosts = (accessToken, pageId) => {
  const pageSize = process.env.PAGE_SIZE ? process.env.PAGE_SIZE : 20;
  const skip = pageId * pageSize;
  return axios
    .get(
      process.env.API_HOST +
        "/posts?$sort[createdAt]=-1" +
        "&$limit=" +
        pageSize +
        "&$skip=" +
        skip,
      {
        headers: {
          "content-type": "application/json",
          Authorization: accessToken,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

const getDraft = (accessToken, originalId) => {
  return axios
    .get(
      process.env.API_HOST + "/posts/?isDeleted=0&originalId=" + originalId,
      {
        headers: {
          "content-type": "application/json",
          Authorization: accessToken,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

const getPost = (accessToken, id) => {
  return axios
    .get(process.env.API_HOST + "/posts/" + id, {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    });
};

// soft delete
const deletePost = (accessToken, id) => {
  return axios
    .patch(
      process.env.API_HOST + "/posts/" + id,
      {
        isDeleted: true,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: accessToken,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

//undelete
const undeletePost = (accessToken, id) => {
  return axios
    .patch(
      process.env.API_HOST + "/posts/" + id,
      {
        isDeleted: false,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: accessToken,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

// permanently delete
const permanentlyDeletePost = (accessToken, id) => {
  return axios
    .delete(process.env.API_HOST + "/posts/" + id, {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    });
};

/**
 *
 * @param {*} slug
 * @param {*} accessToken
 * @returns Boolean
 * check if slug is taken by published post, i.e. isDeleted=0&isDraft=0
 * True means exists
 */
const checkSlug = (accessToken, slug) => {
  return axios
    .get(process.env.API_HOST + "/posts/?isDeleted=0&isDraft=0&slug=" + slug, {
      headers: {
        "content-type": "application/json",
        Authorization: accessToken,
      },
    })
    .then((res) => {
      if (res.status === 200) return res.data.total !== 0;
      return false;
    });
};

export {
  createPost,
  getPosts,
  updatePost,
  getPost,
  getDraft,
  deletePost,
  checkSlug,
  undeletePost,
  permanentlyDeletePost,
};

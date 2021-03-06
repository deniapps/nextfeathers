import axios from "axios";

const createPost = (data) => {
  return axios
    .post(process.env.NEXT_PUBLIC_API_HOST + "/posts", data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res;
    });
};

// use patch to update certain filed, and get updatedBy automatically updated.
const updatePost = (id, data) => {
  return axios
    .patch(process.env.NEXT_PUBLIC_API_HOST + "/posts", +id, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res;
    });
};

//use put to publish post at the first, so we can control the createdAt.
const publishPost = (id, data) => {
  return axios
    .put(process.env.NEXT_PUBLIC_API_HOST + "/posts/", +id, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res;
    });
};

const getPosts = (pageId) => {
  const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
    ? process.env.NEXT_PUBLIC_PAGE_SIZE
    : 20;
  const skip = pageId * pageSize;
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts?$sort[createdAt]=-1" +
        "&$limit=" +
        pageSize +
        "&$skip=" +
        skip,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

const getDraft = (originalId) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts/?isDeleted=0&originalId=" +
        originalId,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    });
};

const getPost = (id) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_HOST + "/posts/" + id, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    });
};

// soft delete
const deletePost = (id) => {
  return axios
    .patch(
      process.env.NEXT_PUBLIC_API_HOST + "/posts/" + id,
      {
        isDeleted: true,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

//undelete
const undeletePost = (id) => {
  return axios
    .patch(
      process.env.NEXT_PUBLIC_API_HOST + "/posts/" + id,
      {
        isDeleted: false,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

// permanently delete
const permanentlyDeletePost = (id) => {
  return axios
    .delete(process.env.NEXT_PUBLIC_API_HOST + "/posts/" + id, {
      headers: {
        "content-type": "application/json",
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
 * @returns Boolean
 * check if slug is taken by published post, i.e. isDeleted=0&isDraft=0
 * True means exists
 */
const checkSlug = (slug) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts/?isDeleted=0&isDraft=0&slug=" +
        slug,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
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
  publishPost,
};

import agent from "./agent";

const createPost = (data) => {
  return agent({
    method: "post",
    url: "/posts",
    data,
  });
};

// use patch to update certain filed, and get updatedBy automatically updated.
const updatePost = (id, data) => {
  return agent({
    method: "patch",
    url: "/posts/" + id,
    data,
  });
};

//use put to publish post at the first, so we can control the createdAt.
const publishPost = (id, data) => {
  return agent({
    method: "put",
    url: "/posts/" + id,
    data,
  });
};

const getPosts = (pageId) => {
  const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
    ? process.env.NEXT_PUBLIC_PAGE_SIZE
    : 20;
  const skip = pageId * pageSize;

  return agent({
    method: "get",
    url:
      "/posts?$sort[createdAt]=-1" + "&$limit=" + pageSize + "&$skip=" + skip,
  });
};

const getDraft = (originalId) => {
  return agent({
    method: "get",
    url: "/posts/?isDeleted=0&originalId=" + originalId,
  });
};

const getPost = (id) => {
  return agent({
    method: "get",
    url: "/posts/" + id,
  });
};

// soft delete
const deletePost = (id) => {
  return agent({
    method: "patch",
    url: "/posts" + id,
    data: {
      isDeleted: true,
    },
  });
};

//undelete
const undeletePost = (id) => {
  return agent({
    method: "patch",
    url: "/posts" + id,
    data: {
      isDeleted: false,
    },
  });
};

// permanently delete
const permanentlyDeletePost = (id) => {
  return agent({
    method: "delete",
    url: "/posts" + id,
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
  return agent({
    method: "get",
    url: "/posts/?isDeleted=0&isDraft=0&slug=" + slug,
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

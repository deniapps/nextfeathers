import agent from "./agent";

const getTags = () => {
  return agent({
    method: "get",
    url: "/tags?$sort[name]&$limit=500",
  });
};

const searchTags = (kw) => {
  return agent({
    method: "get",
    url: "/tags/?$search=" + encodeURIComponent(kw),
  });
};

const getTagBySlug = (tagSlug) => {
  return agent({
    method: "get",
    url: "/tags?slug=" + tagSlug,
  });
};

export { getTags, getTagBySlug, searchTags };

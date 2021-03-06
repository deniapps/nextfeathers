import agent from "./agent";

const getTags = () => {
  return agent({
    method: "get",
    url: "/tags?$sort[name]",
  });
};

const getTagBySlug = (tagSlug) => {
  return agent({
    method: "get",
    url: "/tags?slug=" + tagSlug,
  });
};

export { getTags, getTagBySlug };

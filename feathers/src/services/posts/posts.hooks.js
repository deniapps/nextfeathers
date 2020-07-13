const { authenticate } = require("@feathersjs/authentication").hooks;

const insertTags = require("../../hooks/insert-tags");

//the hook to allow public access
const publicPost = require("../../hooks/public-post");

module.exports = {
  before: {
    all: [],
    find: [publicPost()],
    get: [publicPost()],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [insertTags()],
    update: [insertTags()],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

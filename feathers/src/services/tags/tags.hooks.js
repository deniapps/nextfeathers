const { authenticate } = require("@feathersjs/authentication").hooks;
const search = require("feathers-mongodb-fuzzy-search");

module.exports = {
  before: {
    all: [],
    find: [search({ fields: ["name", "slug"] })],
    get: [],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
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

const { Service } = require("feathers-mongoose");

exports.posts = class posts extends Service {
  async find(params) {
    params.query.$populate = { path: "author", select: "-password" };
    return super.find(params);
  }

  async get(id, params) {
    params.query.$populate = { path: "author", select: "-password" };
    return super.get(id, params);
  }
};

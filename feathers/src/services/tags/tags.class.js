const { Service } = require("feathers-mongoose");

exports.Tags = class Tags extends Service {
  async find(params) {
    // console.log(params);
    if (params.query.$regex) {
      params.query = {
        name: params.query,
      };
    }
    return super.find(params);
  }
};

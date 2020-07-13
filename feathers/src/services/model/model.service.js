// Initializes the `Model` service on path `/model`
const createService = require("./model.class.js");
const hooks = require("./model.hooks");

module.exports = function (app) {
  app.use("/model", createService());

  // Get our initialized service so that we can register hooks
  const service = app.service("model");

  service.hooks(hooks);
};

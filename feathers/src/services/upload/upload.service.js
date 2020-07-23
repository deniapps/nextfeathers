// Initializes the `upload` service on path `/upload`
const createService = require("./upload.class.js");
const hooks = require("./upload.hooks");

const multer = require("multer");
const multipartMiddleware = multer();

module.exports = function (app) {
  // const paginate = app.get('paginate');

  const options = {
    fileServer: app.get("fileServer"),
    filePath: app.get("filePath"),
    imageMaxWidth: app.get("imageMaxWidth"),
    imageMinWidth: app.get("imageMinWidth"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/upload",

    multipartMiddleware.single("file"),

    // another middleware, this time to
    // transfer the received file to feathers
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    createService(options)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("upload");

  service.hooks(hooks);
};

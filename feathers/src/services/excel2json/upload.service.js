// Initializes the `upload` service on path `/upload`
const createService = require('./upload.class.js');
const hooks = require('./upload.hooks');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/excel2json',

    multipartMiddleware.single('file'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    createService(options)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('excel2json');

  service.hooks(hooks);
};

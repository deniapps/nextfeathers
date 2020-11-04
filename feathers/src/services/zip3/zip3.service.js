// Initializes the `zip3` service on path `/zip3`
const { Zip3 } = require('./zip3.class');
const createModel = require('../../models/zip3.model');
const hooks = require('./zip3.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/zip3', new Zip3(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('zip3');

  service.hooks(hooks);
};

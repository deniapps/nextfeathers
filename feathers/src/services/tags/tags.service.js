// Initializes the `tags` service on path `/tags`
const { Tags } = require('./tags.class');
const createModel = require('../../models/tags.model');
const hooks = require('./tags.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tags', new Tags(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags');

  service.hooks(hooks);
};

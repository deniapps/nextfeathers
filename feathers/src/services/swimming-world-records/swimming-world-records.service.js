// Initializes the `swimming world records` service on path `/swimming-world-records`
const { SwimmingWorldRecords } = require('./swimming-world-records.class');
const createModel = require('../../models/swimming-world-records.model');
const hooks = require('./swimming-world-records.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/swimming-world-records', new SwimmingWorldRecords(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('swimming-world-records');

  service.hooks(hooks);
};

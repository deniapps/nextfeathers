// Initializes the `email templates` service on path `/email-templates`
const { EmailTemplates } = require('./email-templates.class');
const createModel = require('../../models/email-templates.model');
const hooks = require('./email-templates.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/email-templates', new EmailTemplates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('email-templates');

  service.hooks(hooks);
};

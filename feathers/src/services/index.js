const users = require("./users/users.service.js");
const model = require("./model/model.service.js");
const upload = require("./upload/upload.service.js");
const excel2json = require("./excel2json/upload.service.js");

const emailTemplates = require("./email-templates/email-templates.service.js");

const posts = require("./posts/posts.service.js");

const tags = require("./tags/tags.service.js");

const swimmingWorldRecords = require('./swimming-world-records/swimming-world-records.service.js');

const zip3 = require('./zip3/zip3.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(model);
  app.configure(upload);
  app.configure(excel2json);
  app.configure(emailTemplates);
  app.configure(posts);
  app.configure(tags);
  app.configure(swimmingWorldRecords);
  app.configure(zip3);
};

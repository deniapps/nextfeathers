const mongoose = require("mongoose");

module.exports = function (app) {
  if (app.get("mongoUser")) {
    mongoose.connect(app.get("mongodb"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: app.get("mongoUser"),
      pass: app.get("mongoPass"),
    });
  } else {
    mongoose.connect(app.get("mongodb"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  // mongoose.set("useCreateIndex", true);
  // mongoose.set("useFindAndModify", false);
  mongoose.Promise = global.Promise;
  // mongoose.set("debug", true);

  app.set("mongooseClient", mongoose);
};

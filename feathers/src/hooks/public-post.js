const { authenticate } = require("@feathersjs/authentication").hooks;
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    if (context.params.query._isPublic) {
      delete context.params.query["_isPublic"];
      context.params.query.isDeleted = false;
      context.params.query.isDraft = false;
      return context;
    } else {
      // console.log("admin only");
      return authenticate("jwt")(context);
    }
  };
};

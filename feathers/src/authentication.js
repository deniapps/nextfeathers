const { AuthenticationService } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const CustomJWTStrategy = require("./dna/CustomJWTStrategy");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new CustomJWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};

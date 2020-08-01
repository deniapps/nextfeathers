// REF: https://www.kn8.lt/blog/dynamic-session-length-in-feathers-for-optimal-ux/
const { AuthenticationService } = require("@feathersjs/authentication");

module.exports = class CustomAuthenticationService extends AuthenticationService {
  async getPayload(authResult) {
    const { authentication } = authResult;

    // oat – the original issuing timestamp
    // reuse oat if we're authenticating with an existing jwt
    // generate a new timestamp if we're creating a brand new jwt
    let oat;

    // authentication.payload is the payload of succesfully decoded existing jwt token
    if (
      authentication.strategy === "jwt" &&
      authentication.payload &&
      authentication.payload.oat
    ) {
      oat = authentication.payload.oat;
    } else {
      oat = Math.round(Date.now() / 1000);
    }

    return { ...super.payload(), oat };
  }
};

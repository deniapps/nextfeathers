const assert = require("assert");
const app = require("../../src/app");

describe("'Model' service", () => {
  it("registered the service", () => {
    const service = app.service("model");

    assert.ok(service, "Registered the service");
  });
});

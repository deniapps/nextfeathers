const assert = require("assert");
const app = require("../../src/app");

describe("'upload' service", () => {
  it("registered the service", () => {
    const service = app.service("upload");

    assert.ok(service, "Registered the service");
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'swimming world records\' service', () => {
  it('registered the service', () => {
    const service = app.service('swimming-world-records');

    assert.ok(service, 'Registered the service');
  });
});

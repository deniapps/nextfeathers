const assert = require('assert');
const app = require('../../src/app');

describe('\'zip3\' service', () => {
  it('registered the service', () => {
    const service = app.service('zip3');

    assert.ok(service, 'Registered the service');
  });
});

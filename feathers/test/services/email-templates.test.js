const assert = require('assert');
const app = require('../../src/app');

describe('\'email templates\' service', () => {
  it('registered the service', () => {
    const service = app.service('email-templates');

    assert.ok(service, 'Registered the service');
  });
});

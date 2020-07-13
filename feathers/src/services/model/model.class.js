const { PythonShell } = require("python-shell");

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    const input = data.input;
    // console.log(input);
    const options = {
      args: [input],
    };

    const promise1 = new Promise(function (resolve, reject) {
      PythonShell.run("./py/hello.py", options, function (err, result) {
        if (err) {
          reject({
            error: err,
          });
        } else {
          resolve({ result: result });
        }
      });
    });

    return promise1;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

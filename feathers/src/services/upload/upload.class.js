/* eslint-disable no-unused-vars */
const XLSX = require("xlsx");

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
    const workbook = XLSX.read(data.file.buffer);
    // console.log(wb);
    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const newData = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    // console.log(newData);
    const inputData = {};
    newData.forEach((arr) => {
      let key = "";
      if (arr.length === 2) {
        key = arr[0];
      }
      if (key) {
        inputData[key] = arr[1];
      }
    });

    // console.log(inputData);
    return Promise.resolve({ inputData });
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

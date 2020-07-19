/* eslint-disable no-unused-vars */
const XLSX = require("xlsx");
const fs = require("fs");

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
    const header = newData.shift();

    // return Promise.resolve({newData});

    const companies = [];
    const companyLookups = {};
    const companyData = newData.reduce((arr, member) => {
      if (
        typeof companies.find((com) => com.value === member[1]) === "undefined"
      ) {
        // console.log('yes');
        companies.push({ text: member[1] + "-" + member[0], value: member[1] });
        companyLookups[member[1]] = member[0];
      }
      const newMember = member.reduce((memberObj, item, key) => {
        if (key > 1) {
          const newKey = header[key];
          memberObj[newKey] = item;
        }
        return memberObj;
      }, {});
      arr[member[1]]
        ? arr[member[1]].push(newMember)
        : (arr[member[1]] = [newMember]);
      return arr;
    }, {});

    fs.writeFile("trackers.json", JSON.stringify(companyData), function (err) {
      if (err) {
        console.log(err);
      }
    });

    fs.writeFile("companies.json", JSON.stringify(companies), function (err) {
      if (err) {
        console.log(err);
      }
    });

    fs.writeFile(
      "companyLookups.json",
      JSON.stringify(companyLookups),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );

    // console.log('hhhh', companyData);
    return Promise.resolve("done");
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

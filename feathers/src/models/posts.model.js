// posts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "posts";
  const mongooseClient = app.get("mongooseClient");
  const mongoose = require("mongoose");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      summary: String,
      slug: {
        type: String, //can be auto-generated or customized
      },
      tags: [String],
      image: String,
      isDraft: Boolean,
      isDeleted: Boolean,
      originalId: mongoose.ObjectId,
      author: { type: mongoose.ObjectId, ref: "users" },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};

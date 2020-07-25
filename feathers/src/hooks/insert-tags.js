// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    if (context.data) {
      const tagOptions = context.data.tagOptions;
      //soft delete will call this hook as well, in that case, the context data does not have tagOptions.
      if (tagOptions) {
        const Tag = context.app.service("tags").Model;
        const insertData = tagOptions.map((tag) => ({
          name: tag.text,
          slug: tag.value,
        }));

        const insertionPromises = insertData.map((tag) => {
          return Tag.findOneAndUpdate(tag, tag, { upsert: true });
        });

        await Promise.all(insertionPromises);
      }
    }

    return context;
  };
};

//List of common functions

/**
 *
 * @param {*} expiresAt - timestamp from jwt = seconds
 */
const isExpired = (expiresAt) => {
  //new Date (milliseconds)
  return new Date() > new Date(expiresAt * 1000);
};

const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export { isExpired, titleCase, slugify };

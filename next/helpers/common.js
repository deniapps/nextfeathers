//List of common functions

import jwtDecode from "jwt-decode";

/**
 *
 * @param accessToken - jwt
 * @param offset - isExpired in (offset) mins
 * - timestamp from jwt = seconds
 */
const isExpired = (accessToken, offset = 0) => {
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  if (decodedToken && decodedToken.exp) {
    //new Date (milliseconds)
    return new Date() > new Date(decodedToken.exp * 1000 - offset * 60 * 1000);
  }
  return true;
};

const getCurrentUser = () => {
  const deniUser = localStorage.getItem(process.env.NEXT_PUBLIC_USER_LC_KEY);
  console.log("deniUser", deniUser);

  let currentUser = null;

  if (deniUser && deniUser !== "undefined") {
    const deniUserObj = JSON.parse(deniUser);
    // if not accessToken or the token is expired, then remove localStorage
    if (!deniUserObj.accessToken || isExpired(deniUserObj.accessToken)) {
      localStorage.removeItem(process.env.NEXT_PUBLIC_USER_LC_KEY);
    } else {
      currentUser = {
        user: deniUserObj.firstName ? deniUserObj.firstName : "Unnamed",
        accessToken: deniUserObj.accessToken,
      };
    }
  }

  return currentUser;
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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = (func, wait, immediate) => {
  // console.log(func);
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const dnaParser = (htmlCode) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlCode,
      }}
    ></div>
  );
};

export { isExpired, titleCase, slugify, debounce, dnaParser, getCurrentUser };

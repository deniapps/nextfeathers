// import axios from "axios";
import agent from "./agent";

const upload = (file) => {
  return agent({
    method: "post",
    url: "/upload",
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// const getToken = () => {
//   const deniUser =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem(process.env.NEXT_PUBLIC_USER_LC_KEY)
//       : "";

//   if (deniUser && deniUser !== "undefined") {
//     const deniUserObj = JSON.parse(deniUser);
//     return deniUserObj.accessToken ? deniUserObj.accessToken : "";
//   }
//   return "";
// };

// const upload = (file) => {
//   return axios
//     .post(process.env.NEXT_PUBLIC_API_HOST + "/upload", file, {
//       headers: {
//         Authorization: getToken(),
//       },
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

export default upload;

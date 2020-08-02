import axios from "axios";

const upload = (accessToken, file) => {
  return axios
    .post(process.env.NEXT_PUBLIC_API_HOST + "/upload", file, {
      headers: {
        Authorization: accessToken
      }
    })
    .then(res => {
      return res.data;
    });
};

export default upload;

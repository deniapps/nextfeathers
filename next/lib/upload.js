import axios from "axios";

const upload = (file) => {
  return axios
    .post(process.env.NEXT_PUBLIC_API_HOST + "/upload", file, {})
    .then((res) => {
      return res.data;
    });
};

export default upload;

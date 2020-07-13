import axios from "axios";

const upload = (file) => {
  return axios.post(process.env.API_HOST + "/upload", file, {}).then((res) => {
    return res.data;
  });
};

export default upload;

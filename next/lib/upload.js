import axios from "axios";

const upload = (file) => {
  return axios.post("/api/proxy/upload", file, {}).then((res) => {
    return res.data;
  });
};

export default upload;

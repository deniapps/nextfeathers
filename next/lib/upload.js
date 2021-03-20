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

export default upload;

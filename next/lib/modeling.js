import axios from "axios";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

const modeling = inputData => {
  const rawData = {
    input: JSON.stringify(inputData)
  };
  return axios
    .post(process.env.NEXT_PUBLIC_API_HOST + "/model", rawData, {
      headers: {
        "content-type": "application/json"
      }
    })
    .then(res => {
      return res.data;
    });
};

export default modeling;

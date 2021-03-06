import agent from "./agent";

const modeling = (inputData) => {
  const rawData = {
    input: JSON.stringify(inputData),
  };
  return agent({
    method: "post",
    url: "/model",
    data: rawData,
  });
};

export default modeling;

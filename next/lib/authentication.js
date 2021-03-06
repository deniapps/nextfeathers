import axios from "axios";

export const getToken = async (username, password) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_HOST + "/authentication",
    {
      strategy: "local",
      email: username,
      password: password,
    }
  );
  console.log(res);
  return res;
};

export const renewJWT = async (accessToken) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_HOST + "/authentication",
    {
      strategy: "jwt",
      accessToken: accessToken,
    }
  );
  return res;
};

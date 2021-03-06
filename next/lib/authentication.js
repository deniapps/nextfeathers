import agent from "./agent";

export const getToken = async (username, password) => {
  return agent({
    method: "post",
    url: "/authentication",
    data: {
      strategy: "local",
      email: username,
      password: password,
    },
  });
};

export const renewJWT = async (accessToken) => {
  return agent({
    method: "post",
    url: "/authentication",
    data: {
      strategy: "jwt",
      accessToken: accessToken,
    },
  });
};

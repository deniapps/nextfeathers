import usTZs from "../data/usTZGrouped.json";

export const allUSTZ = () => {
  return usTZs.map((item) => ({
    key: item.name,
    text: item.name,
    value: item.name,
  }));
};

export const mainUSTZ = () => {
  return [
    {
      key: "us-pacific",
      text: "Pacific Time - US & Canada",
      value: "US/Pacific",
    },
    {
      key: "us-mountain",
      text: "Mountain Time - US & Canada",
      value: "US/Mountain",
    },
    {
      key: "us-central",
      text: "Central Time - US & Canada",
      value: "US/Central",
    },
    {
      key: "us-eastern",
      text: "Eastern Time - US & Canada",
      value: "US/Eastern",
    },
    {
      key: "us-hawaii",
      text: "Hawaii Time - US",
      value: "US/Hawaii",
    },
    {
      key: "us-alaska",
      text: "Alaska Time - US",
      value: "US/Alaska",
    },
  ];
};

export const getMyTZ = () => {
  return new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
};

export const getMyIANATZ = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getTZGroup = (ianatz = null) => {
  const localTZ = ianatz ? ianatz : getMyIANATZ();
  // fallback
  let currentTZGroup = "US/Pacific";

  usTZs.forEach((item) => {
    if (item.name === localTZ) {
      currentTZGroup = item.group;
    }
  });
  return currentTZGroup;
};

export const getDT = (timezone = null) => {
  if (!timezone) {
    timezone = getMyIANATZ();
  }
  const currentDate = new Date();
  return currentDate.toLocaleString("en-US", { timeZone: timezone });
};

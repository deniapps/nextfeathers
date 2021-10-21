import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";

import {
  mainUSTZ,
  getMyTZ,
  allUSTZ,
  getMyIANATZ,
  getTZGroup,
  getDT,
} from "../../helpers/usTimeZones";

import { Header, Segment, Dropdown, Loader } from "semantic-ui-react";

const USTimezone = () => {
  const [yourDT, setYourDT] = useState("");

  const [currentDT, setCurrentDT] = useState("");
  const [currentTZ, setCurrentTZ] = useState(getMyIANATZ());

  useEffect(
    () => {
      let getYourDTTimer = setInterval(() => {
        setYourDT(getDT(currentTZ));
      }, 1000);
      return () => {
        clearTimeout(getYourDTTimer);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // then clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );

  useEffect(
    () => {
      let getDTTimer = setInterval(() => {
        setCurrentDT(getDT(currentTZ));
      }, 1000);
      return () => {
        clearInterval(getDTTimer);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // then clearTimeout will run every time
    // this value changes (useEffect re-run)
    [currentTZ]
  );

  const handleTZChange = (event, { value }) => {
    setCurrentDT("");
    setCurrentTZ(value);
  };

  const yourTZ = useMemo(() => getMyTZ(), []);

  const mainUSTZOpts = useMemo(() => mainUSTZ(), []);
  const groupTZValue = useMemo(() => getTZGroup(currentTZ), [currentTZ]);

  const allUSTZOpts = useMemo(() => allUSTZ(), []);

  return (
    <Layout>
      <h1>United States Timezones</h1>
      <Header as="h3" icon="time" content="Your Local Date Time" />
      <Segment inverted secondary>
        {yourDT || <Loader active inline />} {!!yourDT && ` - ${yourTZ}`}
      </Segment>
      <Header as="h3" icon="plane" content="Current Date Time in:" />
      <Dropdown
        search
        selection
        wrapSelection={false}
        options={mainUSTZOpts}
        value={groupTZValue}
        onChange={handleTZChange}
      />{" "}
      <Dropdown
        search
        selection
        wrapSelection={false}
        options={allUSTZOpts}
        value={currentTZ}
        onChange={handleTZChange}
      />
      <Segment raised>
        {currentDT || <Loader active inline size="small" />}
      </Segment>
    </Layout>
  );
};

export default USTimezone;

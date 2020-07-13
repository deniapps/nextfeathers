import React from "react";
import { Segment } from "semantic-ui-react";

import { CounterContextProvider } from "components/Context/CounterContext";
import CounterDisplay from "components/Counter/CounterDisplay";
import CounterButtons from "components/Counter/CounterButtons";

export default function CounterView() {
  return (
    <CounterContextProvider>
      <h3>Counter</h3>
      <Segment textAlign="center">
        <CounterDisplay />
        <CounterButtons />
      </Segment>
    </CounterContextProvider>
  );
}

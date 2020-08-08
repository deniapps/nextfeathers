import { useRef } from "react";
import PropTypes from "prop-types";
import Layout from "../../../components/Layout";

import { Header, Form, Button } from "semantic-ui-react";

const ChildInput = (props) => {
  return <input ref={props.forwardedRef} />;
};

ChildInput.propTypes = {
  forwardedRef: PropTypes.object,
};

const FunctionalForwardRef = () => {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();
  };

  const incremenetChildInput = () => {
    childRef.current.value++;
  };

  return (
    <Layout>
      <Header as="h3">Ref Forward Demo</Header>

      <Form>
        <ChildInput type="text" forwardedRef={childRef} />
      </Form>
      <br />
      <Button onClick={handleClick}>Focus Child Input</Button>

      <Button onClick={incremenetChildInput}>Increment Child Input</Button>
    </Layout>
  );
};

export default FunctionalForwardRef;

import { useRef } from "react";
import PropTypes from "prop-types";
import Layout from "../../../components/Layout";
import Codepen from "react-codepen-embed";

import { Header, Form, Button, Message } from "semantic-ui-react";

const ChildInput = (props) => {
  return (
    <input
      placeholder="Click the buttons below to control me"
      ref={props.forwardedRef}
    />
  );
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
      <Header as="h3">Ref Demo - Forwarding Ref with Custom Props</Header>

      <Message info>
        <Message.Header>How this works</Message.Header>
        <p>
          {`We create a ref in the parent component, and then pass it using
    a custom props, 'forwardedRef' And then we use props.forwardedRef to point to the child
    component. After that, we can control child component's DOM element
    from the parent component.`}
        </p>
      </Message>

      <Form>
        <ChildInput type="text" forwardedRef={childRef} />
      </Form>
      <br />
      <Button onClick={handleClick}>Focus Child Input</Button>

      <Button onClick={incremenetChildInput}>Increment Child Input</Button>

      <Header as="h3">Codepen Demo</Header>
      <Codepen hash="QWNbbBy" user="deniapps" defaultTab="js,result" />
    </Layout>
  );
};

export default FunctionalForwardRef;

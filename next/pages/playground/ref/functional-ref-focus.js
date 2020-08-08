import { useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import { Form, Message, Header, Checkbox, Button } from "semantic-ui-react";

const UseRef = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  useEffect(() => {
    firstNameRef.current.focus();
    // document.getElementById("dnx-input").focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      lastNameRef.current.focus();
    }
  };

  return (
    <Layout>
      <Header as="h3">Ref Demo - Focus</Header>
      <Message info>
        <Message.Header>How this works</Message.Header>
        <p>
          When the page loads, we use <code>firstNameRef.current.focus()</code>{" "}
          to set focus on the First Name input.
          <br />
          When we press {`'Enter'`} in the First Name input, we use{" "}
          <code>lastNameRef.current.focus();</code> to set focus on the Last
          Name input.
        </p>
      </Message>

      <Form>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            ref={firstNameRef}
            onKeyDown={handleKeyDown}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" ref={lastNameRef} />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Layout>
  );
};

export default UseRef;

import React from "react";
import Layout from "../../../components/Layout";
import Codepen from "react-codepen-embed";

import { Header, Form, Button, Checkbox, Message } from "semantic-ui-react";

class Ref extends React.Component {
  constructor(props) {
    super(props);
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
  }

  componentDidMount() {
    this.firstNameRef.current.focus();
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.lastNameRef.current.focus();
    }
  };

  render() {
    return (
      <Layout>
        <Header as="h3">Ref Demo - Focus</Header>

        <Message info>
          <Message.Header>How this works</Message.Header>
          <p>
            When the page loads, we use{" "}
            <code>this.firstNameRef.current.focus()</code> to set focus on the
            First Name input.
            <br />
            When we press {`'Enter'`} in the First Name input, we use{" "}
            <code>this.lastNameRef.current.focus();</code> to set focus on the
            Last Name input.
          </p>
        </Message>

        <Form>
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              ref={this.firstNameRef}
              onKeyDown={this.handleKeyDown}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" ref={this.lastNameRef} />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>

        <Header as="h3">Codepen Demo</Header>
        <Codepen hash="xxVGxNv" user="deniapps" defaultTab="js,result" />
      </Layout>
    );
  }
}

export default Ref;

import Layout from "../../../components/Layout";
import Codepen from "react-codepen-embed";

import { Header, Form, Button, Message } from "semantic-ui-react";

class Ref extends React.Component {
  constructor(props) {
    super(props);
    this.yourRef = React.createRef();
    // this.lastNameRef = React.createRef();
  }

  componentDidMount() {
    this.yourRef.current.focus();
  }

  incremenetInput = () => {
    this.yourRef.current.value++;
  };

  render() {
    return (
      <Layout>
        <Header as="h3">Ref Demo - Update Value</Header>

        <Message info>
          <Message.Header>How this works</Message.Header>
          <p>
            When the page loads, we use{" "}
            <code>this.yourRef.current.focus()</code> to set focus on the input.
            <br />
            {`When we click on 'Increase Value' button, we use `}
            <code>this.yourRef.current</code> to read and increase the input
            value.
          </p>
        </Message>

        <Message warning>
          <Message.Header>{`Don't Overuse Refs`}</Message.Header>
          <p>
            Although we could use Refs to update the element, we should avoid
            using refs for anything that can be done declaratively.
          </p>
        </Message>

        <Form>
          <Form.Field>
            <label>Just a number</label>
            <input
              placeholder="Enter Value"
              ref={this.yourRef}
              onKeyDown={this.handleKeyDown}
            />
          </Form.Field>
          <Button onClick={this.incremenetInput}>Increase Value</Button>

          <Header as="h3">Codepen Demo</Header>
          <Codepen hash="dyMooJK" user="deniapps" defaultTab="js,result" />
        </Form>
      </Layout>
    );
  }
}

export default Ref;

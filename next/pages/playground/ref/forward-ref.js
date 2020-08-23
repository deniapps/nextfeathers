import Layout from "../../../components/Layout";
import Codepen from "react-codepen-embed";
import { Header, Form, Button, Message } from "semantic-ui-react";

// eslint-disable-next-line react/display-name
const ChildInput = React.forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

class ForwardRef extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  handleClick = () => {
    this.childRef.current.focus();
  };

  incremenetChildInput = () => {
    this.childRef.current.value++;
  };

  render() {
    return (
      <Layout>
        <Header as="h3">Ref Demo - Forwarding Ref with React.forwardRef</Header>

        <Message info>
          <Message.Header>How this works</Message.Header>
          <p>
            {` We create a ref in the parent component, and then pass it using
            'ref' (a special attribute, but not a 'props', mostly like the 'key'). And then
            we use React.forwardRef to pass 'ref' along with 'props' to the child
            component. After that, we can control the child component's DOM element
            from the parent component.`}
          </p>
        </Message>

        <Form>
          <ChildInput
            type="text"
            placeholder="Click the buttons below to control me"
            ref={this.childRef}
          />
        </Form>
        <br />
        <Button onClick={this.handleClick}>Focus Child Input</Button>

        <Button onClick={this.incremenetChildInput}>
          Increment Child Input
        </Button>

        <Header as="h3">Codepen Demo</Header>
        <Codepen hash="ZEWGGRe" user="deniapps" defaultTab="js,result" />
      </Layout>
    );
  }
}

export default ForwardRef;

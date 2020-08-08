import Layout from "../../../components/Layout";

import { Header, Form, Button } from "semantic-ui-react";

// eslint-disable-next-line react/display-name
// const ChildInput = React.forwardRef((props, ref) => {
//   return <input {...props} ref={ref} />;
// });

const ChildInput = () => {
  return <input />;
};

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
        <Header as="h3">Ref Forward Demo</Header>

        <Form>
          <ChildInput type="text" ref={this.childRef} />
        </Form>
        <br />
        <Button onClick={this.handleClick}>Focus Child Input</Button>

        <Button onClick={this.incremenetChildInput}>
          Increment Child Input
        </Button>
      </Layout>
    );
  }
}

export default ForwardRef;

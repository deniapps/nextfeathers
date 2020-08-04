import PropTypes from "prop-types";
import Layout from "../../components/Layout";

import { Header, Input, Button } from "semantic-ui-react";

class Ref extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.yourRef = React.createRef();
  }

  state = {
    yourValue: ""
  };

  handleClick = () => {
    this.myRef.current.focus();
    this.yourRef.current.value = "10";
    // this.myRef.current.props.value = "wft";
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      console.log("do validate");
      this.yourRef.current.focus();
    }
  };

  onChange = evt => {
    console.log(evt.target.value);
    const value = evt.target.value;
    this.setState({ yourValue: value });
    //below not working
    this.yourRef.current.value = "12";
    // console.log(this.yourRef.current);
  };

  incremenetInput = () => {
    this.yourRef.current.value = "hello world";
  };

  render() {
    return (
      <Layout>
        <Header as="h3">Ref Demo</Header>
        <Button onClick={this.handleClick}>Focus Email Input</Button>
        <Input
          name="email"
          onChange={this.onChange}
          ref={this.myRef}
          type="text"
          onKeyDown={this.handleKeyDown}
        />

        {/* <Input name="email-copy" ref={this.yourRef} type="text" value="0" /> */}

        <input type="text" ref={this.yourRef} value="0" />
        <button onClick={this.incremenetInput}>Increment Input Value</button>
      </Layout>
    );
  }
}

export default Ref;

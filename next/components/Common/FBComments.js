import React, { Component } from "react";
import { FacebookProvider, Comments } from "react-facebook";

export default class FBComments extends Component {
  render() {
    return (
      <FacebookProvider appId="1380073982198547">
        <Comments href={this.props.url} />
      </FacebookProvider>
    );
  }
}

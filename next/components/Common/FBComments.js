import React, { Component } from "react";
import PropTypes from "prop-types";
import { FacebookProvider, Comments } from "react-facebook";

export default class FBComments extends Component {
  render() {
    return (
      <FacebookProvider appId="1380073982198547">
        <Comments href={this.props.url} width="100%" />
      </FacebookProvider>
    );
  }
}

FBComments.propTypes = {
  url: PropTypes.string
};

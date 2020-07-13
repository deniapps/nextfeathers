import PropTypes from "prop-types";
import React from "react";
import { Message, Icon } from "semantic-ui-react";

const DNAMessage = ({ message, type }) => {
  console.log(type);
  if (type === "loading") {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are trying very hard!
        </Message.Content>
      </Message>
    );
  }
  return (
    <Message negative={type === "error"} positive={type === "success"}>
      <Message.Content>{message}</Message.Content>
    </Message>
  );
};

export default DNAMessage;

DNAMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

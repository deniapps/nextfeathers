import React, { memo } from "react";
import { List } from "semantic-ui-react";
import Highlight from "react-highlight";
import PropTypes from "prop-types";

const CKDemoCode = (props) => {
  return (
    <List>
      <List.Item>
        <List.Header as="h2">Download NPM Package</List.Header>
        <a href="https://www.npmjs.com/package/ckeditor5-build-classic-dna">
          ckeditor5-build-classic-dna
        </a>
      </List.Item>
      {
        <List.Item>
          <List.Header as="h2">CKEditor Component</List.Header>
          <Highlight className="javascript">{props.source1}</Highlight>
        </List.Item>
      }
      {
        <List.Item>
          <List.Header as="h2">How to Call in SSR</List.Header>
          <Highlight className="javascript">{props.source2}</Highlight>
        </List.Item>
      }
    </List>
  );
};

CKDemoCode.propTypes = {
  source1: PropTypes.string,
  source2: PropTypes.string,
};

export default memo(CKDemoCode);

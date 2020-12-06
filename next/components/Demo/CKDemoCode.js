import React, { memo } from "react";
import { List } from "semantic-ui-react";

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
          <pre>
            <code className="language-js">{props.source1}</code>
          </pre>
        </List.Item>
      }
      {
        <List.Item>
          <List.Header as="h2">How to Call in SSR</List.Header>

          <pre>
            <code className="language-js">{props.source1}</code>
          </pre>
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

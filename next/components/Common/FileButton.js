import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { v1 as uuidv1 } from "uuid";

export class FileButton extends Component {
  constructor(props) {
    super(props);

    this.id = uuidv1();
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  onChangeFile(e) {
    const fileAdded = e.target.files;
    const file = fileAdded ? fileAdded[0] : null;
    const data = new FormData();
    data.append("file", file);
    if (this.props.onSelect && file) {
      this.props.onSelect(data, file.name);
    }
  }

  render() {
    return (
      <div>
        <Button {...this.props} as="label" htmlFor={this.id} />
        <input
          hidden
          id={this.id}
          multiple
          type="file"
          onChange={this.onChangeFile}
        />
      </div>
    );
  }
}

FileButton.propTypes = {
  onSelect: PropTypes.func,
};

export default FileButton;

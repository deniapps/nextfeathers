import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { FileButton } from "./FileButton";

const UploadForm = props => (
  <Form>
    <Form.Group width={10}>
      <FileButton
        icon="file"
        content="Click to upload (.csv file)"
        onSelect={props.onSelect}
      />
      {props.fileName && (
        <span style={{ padding: "8px 0 0 5px" }}>{props.fileName} Added!</span>
      )}
    </Form.Group>
  </Form>
);

UploadForm.propTypes = {
  fileName: PropTypes.string,
  onSelect: PropTypes.func
};

export default UploadForm;

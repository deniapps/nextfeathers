import Link from "next/link";
import PropTypes from "prop-types";
import _ from "lodash";
import { Form, Button } from "semantic-ui-react";
import { inputs as postInputs } from "../../data/postInputs";
import FormField from "../Common/FormField";
import DNAMessage from "../Common/Message";

const PostInputForm = (props) => {
  let type = "success";
  if (props.isLoading) {
    type = "loading";
  } else if (props.isError) {
    type = "error";
  }
  return (
    <Form>
      {_.map(postInputs, (item, key) => (
        <FormField
          key={key}
          label={item.label}
          type={item.type}
          name={item.name}
          options={
            props.allOptions[item.name]
              ? props.allOptions[item.name]
              : item.options
          }
          value={props.inputData[item.name] ? props.inputData[item.name] : ""}
          updateInput={props.updateInput}
          handleAddition={props.handleAddition}
          handleFocus={
            props.handleAllFocus[item.name]
              ? props.handleAllFocus[item.name]
              : null
          }
        />
      ))}
      <Button onClick={props.onSaveDraft}>Save Draft</Button>
      <Button floated="right" primary onClick={props.onPublish}>
        Publish
      </Button>
      <Link href="/dashboard/posts">
        <Button color="red">Cancel</Button>
      </Link>
      {(props.message || props.isLoading) && (
        <DNAMessage message={props.message} type={type} />
      )}
    </Form>
  );
};

PostInputForm.propTypes = {
  onPublish: PropTypes.func,
  onSaveDraft: PropTypes.func,
  inputData: PropTypes.object,
  updateInput: PropTypes.func,
  handleChange: PropTypes.func,
  handleAddition: PropTypes.func,
  allOptions: PropTypes.object,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  handleAllFocus: PropTypes.object,
};

export default PostInputForm;

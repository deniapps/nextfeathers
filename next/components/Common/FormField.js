import PropTypes from "prop-types";
import { Form, Radio, Input, Dropdown, TextArea } from "semantic-ui-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./CKEditor"), { ssr: false });

const FormField = (props) => {
  // console.log("PROPS", props);
  const handleRadioClick = (event) => {
    const name = event.target.name;
    const value = props.value === "Y" ? "N" : "Y";
    props.updateInput(null, name, value);
  };

  const handleAddition = (event, { value, name }) => {
    if (props.handleAddition) {
      props.handleAddition(value, name);
    }
  };

  const handleFocus = () => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  const handleDropdownChange = (event, data) => {
    const name = data.name;
    const value = data.value;
    props.updateInput(null, name, value);
  };

  const handleEditorChange = (value) => {
    const name = props.name;
    const valueget = value;
    props.updateInput(null, name, valueget);
  };

  return (
    <Form.Field>
      <label>{props.label}</label>
      {props.type === "text" && (
        <Input
          name={props.name}
          value={props.value}
          style={{ maxWidth: "100%" }}
          onChange={props.updateInput}
          onFocus={handleFocus}
        />
      )}
      {props.type === "textarea" && (
        <TextArea
          name={props.name}
          value={props.value}
          style={{ maxWidth: "100%", innerHeight: "300%" }}
          onChange={props.updateInput}
        />
      )}
      {props.type === "radio" && (
        <Radio
          toggle
          name={props.name}
          checked={props.value === "Y"}
          onClick={handleRadioClick}
        />
      )}
      {props.type === "dropdown" && (
        <Dropdown
          placeholder={props.placeholder || "Please choose"}
          name={props.name}
          selection
          options={props.options}
          onChange={props.updateInput}
        />
      )}
      {props.type === "dropdownMulti" && (
        <Dropdown
          placeholder={props.placeholder || "Please choose"}
          name={props.name}
          selection
          search
          options={props.options}
          multiple
          value={props.value ? props.value : []}
          allowAdditions
          onChange={handleDropdownChange}
          onAddItem={handleAddition}
        />
      )}
      {props.type === "editor" && (
        <RichTextEditor value={props.value} onChange={handleEditorChange} />
      )}
    </Form.Field>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  type: PropTypes.string,
  label: PropTypes.string,
  updateInput: PropTypes.func,
  handleAddition: PropTypes.func,
  handleFocus: PropTypes.func,
  isInline: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default FormField;

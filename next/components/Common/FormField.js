import PropTypes from "prop-types";
import { Form, Radio, Input, Dropdown, TextArea } from "semantic-ui-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./CKEditor"), { ssr: false });

const FormField = (props) => {
  // console.log("PROPS", props);

  const handleChange = (event, { name, value }) => {
    if (props.updateInput) {
      props.updateInput(name, value);
    }
  };

  const handleRadioClick = (event) => {
    const name = event.target.name;
    const value = props.value === "Y" ? "N" : "Y";
    props.updateInput(name, value);
  };

  const handleAddition = (event, { value, name }) => {
    if (props.handleAddition) {
      props.handleAddition(value, name);
    }
  };

  const handleSearchChange = (event, search) => {
    // console.log("DOSEARCH", search);

    if (props.handleSearchChange) {
      props.handleSearchChange(search.searchQuery);
    }
  };

  const handleFocus = () => {
    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  const handleBlur = () => {
    if (props.handleBlur) {
      props.handleBlur();
    }
  };

  const handleDropdownChange = (event, data) => {
    const name = data.name;
    const value = data.value;
    props.updateInput(name, value);
  };

  const handleEditorChange = (value) => {
    const name = props.name;
    const valueget = value;
    props.updateInput(name, valueget);
  };

  const handleUpload = (url) => {
    if (props.autoGenerateFeatureImage) {
      props.autoGenerateFeatureImage(url);
    }
  };

  return (
    <Form.Field>
      <label>{props.label}</label>
      {props.type === "text" && (
        <Input
          name={props.name}
          value={props.value}
          style={{ maxWidth: "100%" }}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
      {props.type === "textarea" && (
        <TextArea
          name={props.name}
          value={props.value}
          style={{ maxWidth: "100%", innerHeight: "300%" }}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onSearchChange={handleSearchChange}
          onAddItem={handleAddition}
        />
      )}
      {props.type === "editor" && (
        <RichTextEditor
          key={props.postKey}
          value={props.value}
          onChange={handleEditorChange}
          onUpload={handleUpload}
        />
      )}
    </Form.Field>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  postKey: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  type: PropTypes.string,
  label: PropTypes.string,
  updateInput: PropTypes.func,
  handleAddition: PropTypes.func,
  autoGenerateFeatureImage: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  isInline: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default FormField;

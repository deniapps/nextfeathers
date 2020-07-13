import PropTypes from "prop-types";
import FormField from "./FormField";
import { Header, Divider } from "semantic-ui-react";
import _ from "lodash";

const FormGroup = (props) => (
  <div style={{ marginBottom: "30px" }}>
    <Header as="h4" content={props.title} />
    <Divider />
    <div style={{ marginLeft: "15px" }}>
      {_.map(props.inputs, (item, key) => (
        <FormField
          key={key}
          label={item.label}
          type={item.type}
          id={item.id}
          options={item.options}
          isInline={props.isInline}
          value={props.inputData[item.id] ? props.inputData[item.id] : ""}
          updateInput={props.updateInput}
        />
      ))}
    </div>
  </div>
);

FormGroup.propTypes = {
  inputs: PropTypes.array,
  title: PropTypes.string,
  isInline: PropTypes.bool,
  inputData: PropTypes.object,
  updateInput: PropTypes.func,
};

export default FormGroup;

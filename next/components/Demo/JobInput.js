import PropTypes from "prop-types";
import { Container, Form, Radio, Button } from "semantic-ui-react";
import _ from "lodash";

import { inputs as formInputs } from "../../data/formInputs";
import UploadForm from "../Common/UploadForm";
import FormGroup from "../Common/FormGroup";
import Output from "./Output";
import upload from "../../lib/upload";
import modeling from "../../lib/modeling";

const JobInputForm = (props) => (
  <div>
    {props.hideInput && (
      <div className="ui message">
        <div className="header">
          <a href="#" onClick={props.toggleInput}>
            Update data?
          </a>
        </div>
      </div>
    )}
    {!props.hideInput && (
      <div>
        <h3>Upload Job Description</h3>
        <UploadForm
          onSelect={props.onSelect}
          onSubmit={props.onSubmit}
          fileName={props.fileName}
        />
        <h3> Or fill the form below:</h3>
        <Form>
          <Radio
            label="Use inline field?"
            toggle
            onChange={props.handleChange}
            defaultChecked={props.isInline}
            style={{ float: "right" }}
          />
          {_.map(formInputs, (items, name) => (
            <FormGroup
              key={name}
              title={name}
              inputs={items}
              inputData={props.inputData}
              isInline={props.isInline}
              updateInput={props.updateInput}
            />
          ))}
          <Button onClick={props.onSubmit}>Submit</Button>
        </Form>
      </div>
    )}
  </div>
);

JobInputForm.propTypes = {
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  fileName: PropTypes.string,
  inputData: PropTypes.object,
  updateInput: PropTypes.func,
  handleChange: PropTypes.func,
  isInline: PropTypes.bool,
  toggleInput: PropTypes.func,
  hideInput: PropTypes.bool,
};

export default class JobInput extends React.Component {
  state = {
    inlineField: false,
    hideInput: false,
    fileName: null,
    inputData: {},
    outputData: {},
  };

  toggleInput = () => {
    this.setState({ hideInput: !this.state.hideInput });
  };

  onSelect = async (file, fileName) => {
    this.setState({ fileName });
    const uploadedData = await upload(file);
    this.setState({ inputData: uploadedData.inputData });
  };

  updateInput = (event, key, value) => {
    let name = key;
    let val = value;
    if (event) {
      name = event.target.name;
      val = event.target.value;
    }
    const newInputs = {
      ...this.state.inputData,
      [name]: val,
    };

    this.setState({ inputData: newInputs });
  };

  onSubmit = async () => {
    const outputData = await modeling(this.state.inputData);
    this.setState({ outputData, hideInput: true });
  };

  handleChange = () => {
    const isInline = this.state.inlineField;

    this.setState({
      inlineField: !isInline,
    });
  };

  render() {
    return (
      <Container>
        <div>
          <JobInputForm
            isInline={this.state.inlineField}
            handleChange={this.handleChange}
            onSubmit={this.onSubmit}
            onSelect={this.onSelect}
            fileName={this.state.fileName}
            inputData={this.state.inputData}
            updateInput={this.updateInput}
            hideInput={this.state.hideInput}
            toggleInput={this.toggleInput}
          />
          {!_.isEmpty(this.state.outputData) && (
            <Output data={this.state.outputData} />
          )}
        </div>
      </Container>
    );
  }
}

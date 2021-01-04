import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import { ContactContext } from "../Context/ContactContext";

export default function ContactForm() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(ContactContext);

  let defaultName = "";
  let defaultEmail = "";
  let doCreate = true;

  if (state.selectedId) {
    const defaultContact = state.contacts.filter(
      (item) => item.id === state.selectedId
    );
    defaultName = defaultContact[0].name;
    defaultEmail = defaultContact[0].email;
    doCreate = false;
  }

  let name = useFormInput(defaultName);
  let email = useFormInput(defaultEmail);

  useEffect(() => {
    name._setVal(defaultName);
    email._setVal(defaultEmail);
  }, [state.selectedId]);

  // eslint-disable-next-line no-unused-vars
  const { _setVal: setN, ...validName } = name;
  // eslint-disable-next-line no-unused-vars
  const { _setVal: setE, ...validEmail } = email;

  const onSubmit = () => {
    let actionType = "ADD_CONTACT";
    if (!doCreate) {
      actionType = "UPDATE_CONTACT";
    }
    const id = state.selectedId ? state.selectedId : _.uniqueId(10);
    dispatch({
      type: actionType,
      payload: { id, name: name.value, email: email.value },
    });
    // Reset Form
    name.onReset();
    email.onReset();
  };

  return (
    <Segment basic>
      <Form onSubmit={onSubmit}>
        <Form.Group widths="3">
          <Form.Field width={6}>
            <Input placeholder="Enter Name" {...validName} required />
          </Form.Field>
          <Form.Field width={6}>
            <Input
              placeholder="Enter Email"
              {...validEmail}
              type="email"
              required
            />
          </Form.Field>
          <Form.Field width={4}>
            <Button fluid primary>
              {state.selectedId ? "Update Contact" : "New Contact"}
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue("");
  };

  const _setVal = (val) => {
    setValue(val);
  };

  return {
    value,
    onChange: handleChange,
    onReset: handleReset,
    _setVal,
  };
}

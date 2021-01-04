import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";

export const ContactContext = createContext();

const initialState = {
  contacts: [
    {
      id: "098",
      name: "Diana Prince",
      email: "diana@us.army.mil",
    },
    {
      id: "099",
      name: "Bruce Wayne",
      email: "bruce@batmail.com",
    },
    {
      id: "100",
      name: "Clark Kent",
      email: "clark@metropolitan.com",
    },
  ],
  selectedId: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "UPDATE_CONTACT": {
      const newContact = state.contacts.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        contacts: newContact,
        selectedId: null,
      };
    }
    case "DEL_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        selectedId: null,
      };
    case "START":
      return {
        ...state,
        loading: true,
      };
    case "COMPLETE":
      return {
        ...state,
        loading: false,
      };
    case "SEL_CONTACT":
      return {
        ...state,
        selectedId: action.payload,
      };
    default:
      throw new Error();
  }
};

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContactContext.Provider value={[state, dispatch]}>
      {props.children}
    </ContactContext.Provider>
  );
};

ContactContextProvider.propTypes = {
  children: PropTypes.node,
};

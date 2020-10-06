import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../Context/UserContext";

const APIError = (props) => {
  const { signOut } = useContext(UserContext);
  const error = props.error;
  if (error && error.response && error.response.status === 401) {
    signOut();
  }
  return null;
};

// Specifies the default values for props:
APIError.propTypes = {
  error: PropTypes.object,
};

export default APIError;

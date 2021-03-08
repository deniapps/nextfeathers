// Fatal Error Handler
// 1. API call returns 4xx or 5xx
// 2. Session Expired - i.e. error = "401"
// Here we only hnadle 401, so the popup shown and then logout the user
// Other API Error should be written into the console by lib/agent.js
import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../Context/UserContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

const FatalError = (props) => {
  const { signOut } = useContext(UserContext);
  const error = props.error;
  if (error && (error === "401" || error.status === 401)) {
    let timerInterval;
    ReactSwal.fire({
      title: "Session is Expired!",
      html: "You will be logged out in <b></b> seconds.",
      timer: 5000,
      timerProgressBar: true,
      willOpen: () => {
        ReactSwal.showLoading();
        timerInterval = setInterval(() => {
          const content = ReactSwal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Math.ceil(ReactSwal.getTimerLeft() / 1000);
            }
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === ReactSwal.DismissReason.timer) {
        signOut();
      }
    });
  }
  return null;
};

// Specifies the default values for props:
FatalError.propTypes = {
  error: PropTypes.object,
};

export default FatalError;

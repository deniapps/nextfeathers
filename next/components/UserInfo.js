import { useContext } from "react";

import UserContext from "../components/Context/UserContext";

const UserInfo = () => {
  // console.log(useContext(UserContext));
  const { user, signOut } = useContext(UserContext);

  return (
    <div className="user-info">
      <p>
        Hello, <strong>{user}</strong>
      </p>
      <p>Welcome to our app</p>
      <button className="btn" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;

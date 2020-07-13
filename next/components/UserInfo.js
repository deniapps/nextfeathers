import { useContext } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "../components/Context/UserContext";

const UserInfo = () => {
  console.log(useContext(UserContext));
  const { user, accessToken, signOut } = useContext(UserContext);
  let decodedToken = null;
  if (accessToken) {
    decodedToken = jwtDecode(accessToken);
  }

  return (
    <div className="user-info">
      <p>
        Hello, <strong>{user}</strong>
      </p>
      <p>Welcome to our app</p>
      <pre>{JSON.stringify(decodedToken, null, 1)}</pre>
      <button className="btn" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;

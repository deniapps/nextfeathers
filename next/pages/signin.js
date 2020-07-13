import PropTypes from "prop-types";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../components/Context/UserContext";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import Layout from "../components/Layout";

// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

const LoginForm = (props) => (
  <div className="login-form">
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log in to your account
        </Header>
        {props.error && <p className="ui negative message">{props.error}</p>}
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="email"
              onChange={(ev) => props.setUsername(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(ev) => props.setPassword(ev.target.value)}
            />

            <Button fluid size="large" onClick={(ev) => props.login(ev)}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <a
            href="#signUp"
            className="asLink"
            onClick={() => props.setMessage("Sign up is not available!")}
          >
            Sign Up
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

LoginForm.propTypes = {
  error: PropTypes.string,
  setPassword: PropTypes.func,
  setUsername: PropTypes.func,
  setMessage: PropTypes.func,
  login: PropTypes.func,
};

const Login = () => {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const authenticate = (e) => {
    e.preventDefault();
    if (username != "" && password != "") {
      axios
        .post(process.env.API_HOST + "/authentication", {
          strategy: "local",
          email: username,
          password: password,
        })
        .then((ret) => {
          // console.log(ret.data);
          signIn(username, ret.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
          setMessage("Invalid Login");
        });
    } else {
      setMessage("Please enter your username and password");
    }
  };

  return (
    <Layout pageType="login">
      <LoginForm
        error={message}
        setUsername={setUsername}
        setPassword={setPassword}
        setMessage={setMessage}
        login={authenticate}
      />
    </Layout>
  );
};

export default Login;

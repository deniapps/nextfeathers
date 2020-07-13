import Layout from "../components/Layout";
import { Grid, Header } from "semantic-ui-react";

export default function About() {
  return (
    <Layout>
      <Grid>
        <Grid.Column>
          <Header as="h1">About Us</Header>
          <p>
            Please come back for the detailed intro, for now, email me at
            adam@deniapps.com if you like.
          </p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

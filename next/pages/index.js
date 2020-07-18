import { Grid } from "semantic-ui-react";
import Layout from "components/Layout";

export default function Index() {
  return (
    <Layout pageType="home">
      <Grid>
        <Grid.Column>
          <h1 className="hp-header">DeNi Apps</h1>
          <p className="hp-slogan">We Build Websites & Apps</p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

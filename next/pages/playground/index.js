import { Grid, Header } from "semantic-ui-react";
import Layout from "components/Layout";
import ItemView from "components/Common/ItemView";
import demos from "data/demo.json";

export default function Index() {
  return (
    <Layout>
      <Grid>
        <Grid.Column>
          <Header as="h1">Playground</Header>
        </Grid.Column>
        <ItemView items={demos} />
      </Grid>
    </Layout>
  );
}

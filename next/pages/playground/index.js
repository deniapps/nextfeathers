import { Grid } from "semantic-ui-react";
import Layout from "components/Layout";
import ItemView from "components/Common/ItemView";
import demos from "data/demo.json";

export default function Index() {
  console.log(process.env.NODE_ENV);

  return (
    <Layout>
      <Grid>
        <Grid.Column>
          <h1 className="hp-header">Playground</h1>
        </Grid.Column>
        <ItemView items={demos} />
      </Grid>
    </Layout>
  );
}

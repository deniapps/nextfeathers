import { Header } from "semantic-ui-react";
import Layout from "components/Layout";
import ItemView from "components/Common/ItemView";
import demos from "data/demo.json";

export default function Index() {
  return (
    <Layout>
      <Header as="h1" icon textAlign="center">
        <Header.Content>Playground</Header.Content>
      </Header>
      <ItemView items={demos} />
    </Layout>
  );
}

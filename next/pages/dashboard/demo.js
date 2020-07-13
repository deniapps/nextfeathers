import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import JobInput from "../../components/Demo/JobInput";

export default function Demo() {
  return (
    <Layout authPage>
      <Header as="h2" icon textAlign="center" style={{ marginBottom: "40px" }}>
        <Header.Content>Talent Finder</Header.Content>
      </Header>
      <JobInput />
    </Layout>
  );
}

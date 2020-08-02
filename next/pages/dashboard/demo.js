import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import JobInput from "../../components/Demo/JobInput";

export default function Demo() {
  return (
    <Layout authPage>
      <Header as="h1" icon textAlign="center">
        <Header.Content>Talent Finder</Header.Content>
      </Header>
      <JobInput />
    </Layout>
  );
}

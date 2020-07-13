import Link from "next/link";

import Layout from "../../components/Layout";
import { Header, Container, List } from "semantic-ui-react";

const Index = () => {
  // const { accessToken } = useContext(UserContext);
  return (
    <Layout authPage>
      <Header as="h2" icon textAlign="center" style={{ marginBottom: "40px" }}>
        <Header.Content>Comming Soon!</Header.Content>
      </Header>
      <Container>
        <List>
          <List.Item>
            <Link href="/dashboard/posts">DNX Blog</Link>
          </List.Item>
          <List.Item>
            {" "}
            <Link href="/dashboard/demo">Form Demo</Link>
          </List.Item>
        </List>
      </Container>
    </Layout>
  );
};

export default Index;

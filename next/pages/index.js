import { Grid } from "semantic-ui-react";
import Layout from "components/Layout";
import Meta from "components/Common/Meta";

export default function Index() {
  const title = "Deni Apps";
  const desc =
    "Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in USA, Chinese/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...";

  const summary =
    "DiNiApps - A software engineer's online notebook recording everything related to React,js, Node.js, GraphQL, Javascript, and more.";
  const canonical = "https://deniapps.com";
  const image = "https://deniapps.com/images/dna.png";

  return (
    <>
      <Meta
        title={title}
        desc={desc}
        summary={summary}
        canonical={canonical}
        image={image}
      />
      <Layout pageType="home">
        <Grid>
          <Grid.Column>
            <h1 className="hp-header">Deni Apps</h1>
            <p className="hp-slogan">We Build Websites & Apps</p>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  );
}

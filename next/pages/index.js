import { Grid } from "semantic-ui-react";
import Layout from "components/Layout";

export default function Index() {
  const title = "DeNiApps";
  const desc =
    "Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in USA, Chinese/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...";

  const summary =
    "DiNiApps - A software engineer's online notebook recording everything related to React,js, Node.js, GraphQL, Javascript, and more.";
  const canonical = "https://deniapps.com";
  const image = "https://deniapps.com/images/dna.png";

  const seoData = {
    title,
    desc,
    summary,
    canonical,
    image,
  };

  return (
    <Layout pageType="home" seoData={seoData}>
      <Grid>
        <Grid.Column>
          <h1 className="hp-header">DeNi Apps</h1>
          <p className="hp-slogan">We Build Websites & Apps</p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

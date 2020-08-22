import Layout from "../components/Layout";
import { Grid, Header } from "semantic-ui-react";

export default function About() {
  return (
    <Layout>
      <Header as="h1" icon>
        <Header.Content>About Us</Header.Content>
      </Header>
      <Grid>
        <Grid.Column>
          <p>
            We Build Websites & Apps! <br />
          </p>
          <p>
            We are a small group of Software Engineers specialized in Node.js,
            React.js, GraphQL, MySQL, and MongoDB. We are also experienced in
            following programming languages: PHP, Perl, Java, JavaScript,
            jQuery, XHTML, HTML5, cascading style sheets (CSS), and CSS3, and
            with strong experience in CakePHP, Drupal, WordPress, Solr, and
            Sphinx open-source technologies.
          </p>
          <p>
            We provide Consulting/Freelancing for Web Development projects, such
            as Code Audits/Reviews, Workshops, Training, and Implementation etc.
          </p>
          <p>Contact us at contact@deniapps.com</p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

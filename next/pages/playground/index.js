import { Header } from "semantic-ui-react";
import Layout from "components/Layout";
import ItemView from "components/Common/ItemView";
import demos from "data/demo.json";

const title = "Playground - DeNiApps";
const desc = `Playground for code snippets and demo pages in the web development including NextJS, Semantic-UI, Feathers.js, 
  React.js, Node.js, GraphQL, JavaScript, HTML, CSS, etc.`;

const summary = `Big colletion of code snippets and demo pages for web technologies covering NextJS, Semantic-UI, Feathers.js, 
React.js, Node.js, GraphQL, JavaScript, HTML, CSS and more`;
const canonical = "https://deniapps.com/playground";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

export default function Index() {
  return (
    <Layout seoData={seoData}>
      <Header as="h1">
        <Header.Content>Playground</Header.Content>
        <Header.Subheader>
          {`Code snippets and demo pages in the web development including NextJS, Semantic-UI, Feathers.js, 
  React.js, Node.js, GraphQL, JavaScript, HTML, CSS, etc.`}
        </Header.Subheader>
      </Header>
      <ItemView items={demos} />
    </Layout>
  );
}

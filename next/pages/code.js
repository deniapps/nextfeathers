import Layout from "../components/Layout";
import Meta from "components/Common/Meta";
import { Grid, Header } from "semantic-ui-react";
import { dnaParser } from "helpers/common";

const title = "Javascript Playground - Deni Apps";
const desc = `Playground for Vanilla Javascript. Deadly simple - Just test`;

const summary = desc;

const canonical = "https://deniapps.com/code";
const image = "https://deniapps.com/images/dna.png";

const css = "/css/sb.min.css";
const js = "/js/sb.min.js";

const defaultContent = `<pre className="snippet cm-s-default" data-language="javascript"><code id="dnx-code" className="javascript">//click to start</code></pre>`;

export default function Code() {
  return (
    <>
      <Meta
        title={title}
        desc={desc}
        summary={summary}
        canonical={canonical}
        image={image}
      />
      <Layout>
        <Header as="h1" icon>
          <Header.Content>Javascript Playground</Header.Content>
        </Header>
        <Grid>
          <Grid.Column>
            <article>{dnaParser(defaultContent)}</article>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  );
}

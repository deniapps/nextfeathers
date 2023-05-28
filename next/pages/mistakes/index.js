import { Header } from "semantic-ui-react";
import Meta from "components/Common/Meta";
import Layout from "components/Layout";
import ItemView from "components/Common/ItemView";
import demos from "data/mistakes.json";

const title = "Mistakes in Development - Deni Apps";
const desc = `We all make mistakes in the web development, some are common, some are uncommon, some are even stupid, but we should not be shame to share them. Write them down, and hopefully we don't make the same mistakes again.`;

const summary = `Big colletion of the mistakes made in the web development. Review them and avoid to make the same mistakes again.`;
const canonical = "https://deniapps.com/mistakes";
const image = "https://deniapps.com/images/dna.png";

export default function Index() {
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
        <Header as="h1">
          <Header.Content>
            Common and Uncommon Mistakes in Development
          </Header.Content>
          <Header.Subheader>
            {`We all make mistakes in the web development, some are common, some are
          uncommon, some are even stupid, but we should not be shame to share
          them. Write them down, and hopefully we don't make the same mistakes
          again.`}
          </Header.Subheader>
        </Header>
        <ItemView items={demos} />
      </Layout>
    </>
  );
}

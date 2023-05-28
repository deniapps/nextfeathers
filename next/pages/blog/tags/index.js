import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import TagList from "components/Blog/TagList";
import { getPublicTags } from "lib/blog";
import PropTypes from "prop-types";

export default function Tags(props) {
  const title = "Blog Tags - Deni Apps.com";
  const desc = "Articles in all area";

  const summary = "Tags Page - DiNiApps";
  const canonical = "https://deniapps.com/blog/tags";
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
      <Layout>
        <TagList tags={props.tags} />
      </Layout>
    </>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};

export async function getServerSideProps() {
  let tags = [];
  try {
    const result = await getPublicTags();
    tags = result.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { tags: tags }, // will be passed to the page component as props
  };
}

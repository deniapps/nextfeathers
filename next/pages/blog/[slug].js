import PropTypes from "prop-types";
import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import { getPublicPosts } from "lib/blog";
import { Container } from "semantic-ui-react";

const Post = (props) => {
  const title = props.blog.title;
  const desc = props.blog.summary;

  const summary = props.blog.summary;
  const canonical = "https://deniapps.com/blog/" + props.blog.slug;
  const image = props.blog.image;
  const content = props.blog.content;

  return (
    <Layout>
      <Meta
        title={title}
        desc={desc}
        summary={summary}
        canonical={canonical}
        image={image}
      />
      <Container text>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  blog: PropTypes.object,
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const result = await getPublicPosts(slug);

  return {
    props: { blog: result.data.data[0] }, // will be passed to the page component as props
  };
}

export default Post;

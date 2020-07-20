import Layout from "components/Layout";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";

export default function Posts(props) {
  const title = "Blog - DeNiApps";
  const desc =
    "Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in USA, Chinese/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...";

  const summary = "DNA - DiNiApps";
  const canonical = "https://deniapps.com/blog";
  const image = "https://deniapps.com/images/dna.png";

  const seoData = {
    title,
    desc,
    summary,
    canonical,
    image,
  };

  return (
    <Layout seoData={seoData}>
      <PostList posts={props.posts} />
    </Layout>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
};

export async function getServerSideProps() {
  let posts = [];
  try {
    const result = await getPublicPosts();
    posts = result.data.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { posts: posts }, // will be passed to the page component as props
  };
}

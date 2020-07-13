import Layout from "components/Layout";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import Meta from "components/Common/Meta";

export default function Posts(props) {
  const title = "Blog - DeNiApps.com";
  const desc =
    "Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in USA, Chinese/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...";

  const summary = "DNA - DiNiApps";
  const canonical = "https://deniapps.com/blog";
  const image = "https://deniapps.com/images/dna.png";

  return (
    <Layout>
      <Meta
        title={title}
        desc={desc}
        summary={summary}
        canonical={canonical}
        image={image}
      />
      <PostList posts={props.posts} />
    </Layout>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
};

export async function getStaticProps() {
  const posts = await getPublicPosts();
  console.log(posts);
  return {
    props: { posts: posts.data.data }, // will be passed to the page component as props
  };
}

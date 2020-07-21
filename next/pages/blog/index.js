import Layout from "components/Layout";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";

export default function Posts(props) {
  const title = "Blog - Analytical Expert";
  const desc = `Analytical Expert's journal including HPLC (SEC, Reverse-phase, Normal-phase, Affinity) 
    LC-MS (intact mass, subunit mass, peptide mapping, glycosylation, glycan profiling, phosphorylation, HDX)
    PCR based methods Cell-based assays`;

  const summary = "Analytical Expert's Blog";
  const canonical = "https://analyticalexpert.net/blog";
  const image = "https://analyticalexpert.net/images/ae/ae.jpg";

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

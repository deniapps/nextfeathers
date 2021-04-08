import PropTypes from "prop-types";
import Error from "next/error";
import Layout from "components/Layout";
import PostList from "components/Blog/PostList";
import { getPublicPostsByTag } from "lib/blog";
import { getTagBySlug } from "../../../lib/tags";

const Tag = (props) => {
  const title = props.tagData.name + " - Deni Apps.com";
  const desc = "Recently Articles in " + props.tagData.name;

  const summary = "Recently Articles in " + props.tagData.name + " - DiNiApps";
  const canonical = "https://deniapps.com/blog/tag/" + props.tagData.name;
  const image = "https://deniapps.com/images/dna.png";

  const seoData = {
    title,
    desc,
    summary,
    canonical,
    image,
  };
  if (props.errorCode !== 0) {
    return <Error statusCode={props.errorCode} />;
  }

  return (
    <Layout seoData={seoData}>
      <PostList posts={props.posts} tagData={props.tagData} />
    </Layout>
  );
};

Tag.propTypes = {
  posts: PropTypes.array,
  tagData: PropTypes.object,
  errorCode: PropTypes.number,
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let posts = [];
  let tagData = {};

  let errorCode = 0;

  try {
    const tagResult = await getTagBySlug(slug);
    if (tagResult.total) {
      tagData = tagResult.data[0];
      const postsResult = await getPublicPostsByTag(slug);
      if (postsResult) {
        posts = postsResult.data;
      }
    }
  } catch (error) {
    errorCode = 404;
  }

  // console.log(tagResult);

  // let errorCode = tagResult.statusText === "OK" ? 0 : tagResult.status;
  // if (errorCode === 0) {
  //   if (tagResult.total === 0) {
  //     errorCode = 404;
  //   } else {
  //     tagData = tagResult.data[0];
  //     const result = await getPublicPostsByTag(slug);
  //     errorCode = tagResult.statusText === "OK" ? 0 : tagResult.status;
  //     if (!errorCode) {
  //       posts = result.data;
  //     }
  //   }
  // }

  // console.log(errorCode);

  return {
    props: { errorCode, tagData, posts }, // will be passed to the page component as props
  };
}

export default Tag;

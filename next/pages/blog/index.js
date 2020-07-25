import Layout from "components/Layout";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import { useState } from "react";

const pageSize = process.env.PAGE_SIZE ? process.env.PAGE_SIZE : 20;

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

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState(props.posts);

  const [pageId, setPageId] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(props.showLoadMore);

  const fetchList = async (pageId) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await getPublicPosts(pageId);
      //TO-DO: check status for error handling, and add pagination if needed.
      const newList = list.concat(result.data.data);
      if (result.data.total > newList.length) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
      setList(newList);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
    return true;
  };

  const loadMore = async () => {
    const newPageId = pageId + 1;
    setPageId(newPageId);
    await fetchList(newPageId);
  };

  return (
    <Layout seoData={seoData}>
      <PostList posts={list} showLoadMore={showLoadMore} loadMore={loadMore} />
      {isError && <div>Something went wrong ...</div>}
      {isLoading && <Loader inline>Loading...</Loader>}
    </Layout>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
  showLoadMore: PropTypes.bool,
};

export async function getServerSideProps() {
  let posts = [];
  let showLoadMore = false;
  try {
    const result = await getPublicPosts();
    posts = result.data.data;
    showLoadMore = result.data.total > pageSize ? true : false;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { posts: posts, showLoadMore: showLoadMore }, // will be passed to the page component as props
  };
}

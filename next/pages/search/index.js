import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import PostList from "components/Blog/PostList";
import { searchPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import { Loader, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useIsMount } from "components/Common/useIsMount";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
  ? process.env.NEXT_PUBLIC_PAGE_SIZE
  : 20;

export default function Search(props) {
  const title = "Search Results - Deni Apps.com";
  const desc = `Search Results for  "${props.kw}"`;

  const summary = "Search - DiNiApps";
  const canonical = "https://deniapps.com/search/" + props.kw;
  const image = "https://deniapps.com/images/dna.png";

  const isMount = useIsMount();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState(props.posts);

  const [pageId, setPageId] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(props.showLoadMore);

  const fetchList = async (pageId) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await searchPublicPosts(props.kw, pageId);
      //TO-DO: check status for error handling, and add pagination if needed.
      let newList = [];

      if (pageId > 0) {
        newList = list.concat(result.data);
      } else {
        newList = result.data;
      }

      if (result.total > newList.length) {
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

  useEffect(() => {
    console.log("kw", props.kw);
    if (!isMount) {
      setPageId(0);
      fetchList(0);
    }
  }, [props.kw]);

  const loadMore = async () => {
    const newPageId = pageId + 1;
    setPageId(newPageId);
    await fetchList(newPageId);
  };

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
        <PostList
          posts={list}
          showLoadMore={showLoadMore}
          loadMore={loadMore}
          headline={desc}
        />
        {isError && <div>Something went wrong ...</div>}
        {isLoading && (
          <Segment textAlign="center">
            <Loader inline active>
              Loading...
            </Loader>
          </Segment>
        )}
      </Layout>
    </>
  );
}

Search.propTypes = {
  posts: PropTypes.array,
  showLoadMore: PropTypes.bool,
  kw: PropTypes.string,
};

export async function getServerSideProps(context) {
  const { kw } = context.query;
  // sconsole.log(kw);
  let posts = [];
  let showLoadMore = false;
  try {
    const result = await searchPublicPosts(kw);
    // console.log(result);
    posts = result.data;
    showLoadMore = result.total > pageSize ? true : false;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { posts: posts, showLoadMore: showLoadMore, kw }, // will be passed to the page component as props
  };
}

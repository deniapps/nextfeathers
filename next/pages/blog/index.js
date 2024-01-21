import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import { Loader, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
  ? process.env.NEXT_PUBLIC_PAGE_SIZE
  : 20;

export default function Posts(props) {
  const title = "Blog - Deni Apps";
  const desc =
    "Software Engineer for React.js, Node.js, GraphQL and JavaScript. Based in USA, Chinese/English speaking. Consulting/Freelancing for Web Development project: Code Audits/Reviews, Workshops, Training, Implementation ...";

  const summary = "DNA - DeNiApps";
  const canonical = "https://deniapps.com/blog";
  const image = "https://deniapps.com/images/dna.png";

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState(props.posts);

  const [pageId, setPageId] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(props.showLoadMore);

  useEffect(() => {
    // Check if there's data in sessionStorage
    const storedList = JSON.parse(sessionStorage.getItem("postList"));
    const storedShowLoadMore = sessionStorage.getItem("showLoadMore");
    const storedPageId = parseInt(sessionStorage.getItem("pageId"), 10);

    // Set the state based on sessionStorage or props
    setList(storedList || props.posts);
    setShowLoadMore(storedShowLoadMore === "true" || props.showLoadMore);
    if (storedPageId) setPageId(storedPageId);
  }, [props.posts, props.showLoadMore]);

  const fetchList = async (pageId) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await getPublicPosts(pageId);
      //TO-DO: check status for error handling, and add pagination if needed.
      const newList = list.concat(result.data);
      if (result.total > newList.length) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
      setList(newList);
      // Save data to sessionStorage
      sessionStorage.setItem("postList", JSON.stringify(newList));
      sessionStorage.setItem("showLoadMore", showLoadMore);
      sessionStorage.setItem("pageId", pageId);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
    return true;
  };

  const loadMore = async () => {
    const newPageId = parseInt(pageId, 10) + 1;
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
          isLoading={isLoading}
          loadMore={loadMore}
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

Posts.propTypes = {
  posts: PropTypes.array,
  showLoadMore: PropTypes.bool,
};

export async function getServerSideProps() {
  let posts = [];
  let showLoadMore = false;
  try {
    const result = await getPublicPosts();
    posts = result.data;
    showLoadMore = result.total > pageSize ? true : false;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { posts: posts, showLoadMore: showLoadMore }, // will be passed to the page component as props
  };
}

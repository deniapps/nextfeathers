import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import PostList from "components/Blog/PostList";
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import { Loader, Segment } from "semantic-ui-react";

const pageSize = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || "20");

export default function Blog({
  posts: initialPosts,
  showLoadMore: initialShowMore,
  pageId: initialPage,
}) {
  const router = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showMore, setShowMore] = useState(initialShowMore);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Reset posts on hard refresh or page change
  useEffect(() => {
    const queryPage = parseInt(router.query.page || "1", 10);
    if (queryPage !== currentPage) {
      setPosts(initialPosts);
      setCurrentPage(initialPage);
      setShowMore(initialShowMore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  const fetchMore = async (pageId) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await getPublicPosts(pageId);
      const combined = posts.concat(result.data);
      setPosts(combined);
      setShowMore(result.total > combined.length);
      setCurrentPage(pageId);

      // Update URL without reload
      router.replace(`/blog?page=${pageId}`, undefined, { shallow: true });
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => fetchMore(currentPage + 1);

  const canonical =
    currentPage === 1
      ? "https://deniapps.com/blog"
      : `https://deniapps.com/blog?page=${currentPage}`;

  return (
    <>
      <Meta
        title="Blog - Deni Apps"
        desc="Software Engineer for React.js, Node.js, GraphQL and JavaScript..."
        summary="DNA - DeNiApps"
        canonical={canonical}
        image="https://deniapps.com/images/dna.png"
      />
      <Layout>
        <PostList
          posts={posts}
          showLoadMore={showMore}
          isLoading={isLoading}
          loadMore={loadMore}
          currentPage={currentPage}
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

export async function getServerSideProps(context) {
  const rawPageId = parseInt(context.query.page || "1", 10);
  const pageId = Math.max(rawPageId, 1); // Ensure 1-based page index

  let posts = [];
  let showLoadMore = false;

  try {
    const result = await getPublicPosts(pageId); // pageId starts from 1
    posts = result.data;
    const skip = (pageId - 1) * pageSize;
    showLoadMore = result.total > skip + posts.length;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      posts,
      showLoadMore,
      pageId,
    },
  };
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  showLoadMore: PropTypes.bool.isRequired,
  pageId: PropTypes.number.isRequired,
};

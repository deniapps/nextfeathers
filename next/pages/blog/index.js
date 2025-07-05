import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import Meta from "components/Common/Meta";
import PostList from "components/Blog/PostList"; // This component needs to be updated
import { getPublicPosts } from "lib/blog";
import PropTypes from "prop-types";
import { Loader, Segment, Button } from "semantic-ui-react"; // Added Button
import DNXBreadcrumb from "components/Common/Breadcrumb";

const pageSize = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || "20");

const SESSION_STORAGE_KEY = "blogInfiniteScrollState";

export default function Blog({
  posts: initialPosts,
  showLoadMore: initialShowMore,
  pageId: initialPage, // pageId from SSR (based on URL query)
  totalPosts: initialTotalPosts,
}) {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Client-side loaded page number (highest loaded)
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const didMountRef = useRef(false);

  // --- Effect for Initial Data Loading and State Management ---
  useEffect(() => {
    if (typeof window === "undefined" || !router.isReady) {
      return;
    }

    const storedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const currentUrlPage = parseInt(router.query.page || "1", 10); // current URL's page param

    const isInfiniteScrollUrl =
      router.pathname === "/blog" &&
      (!router.query.page || router.query.page === "1");
    const isDirectPaginatedUrl =
      router.pathname === "/blog" && currentUrlPage > 1;

    let stateHandledThisRun = false;

    console.log(
      "useEffect run. router.asPath:",
      router.asPath,
      "initialPage (from SSR):",
      initialPage
    );

    // --- PRIORITY 1: Handle Direct Paginated URL Loads (e.g., /blog?page=N for N>1) ---
    // These should always be clean server-rendered pages.
    if (isDirectPaginatedUrl) {
      console.log("Path: Direct Paginated URL. Initializing from SSR props.");
      setPosts(initialPosts); // This will contain only posts for page `currentUrlPage`
      setCurrentPage(initialPage); // This will be `currentUrlPage`
      setShowMore(initialShowMore); // This now means 'show next page button' if true
      window.scrollTo(0, 0); // Always scroll to top for a fresh direct page load
      sessionStorage.removeItem(SESSION_STORAGE_KEY); // Always clear any old infinite scroll state
      stateHandledThisRun = true;
    }
    // --- PRIORITY 2: Handle Infinite Scroll URL (/blog or /blog?page=1) ---
    // Here, session storage restoration takes priority.
    // The logic inside this block remains unchanged from the previous version,
    // as it correctly handles the infinite scroll accumulation and restoration.
    else if (isInfiniteScrollUrl) {
      let restoredFromSession = false;
      if (storedState) {
        try {
          const {
            posts: storedPosts,
            currentPage: storedCurrentPage,
            scrollY,
          } = JSON.parse(storedState);

          if (storedCurrentPage > 1) {
            console.log(
              "Path: Infinite Scroll URL. Restoring accumulated state from session storage."
            );
            setPosts(storedPosts);
            setCurrentPage(storedCurrentPage);
            setShowMore(
              initialTotalPosts ? initialTotalPosts > storedPosts.length : true
            );
            if (scrollY) {
              setTimeout(() => {
                window.scrollTo(0, scrollY);
                console.log("Scroll restored to:", scrollY);
              }, 250);
            }
            restoredFromSession = true;
            stateHandledThisRun = true;
          } else {
            console.log(
              "Path: Infinite Scroll URL. Stored state exists but only page 1 or stale. Clearing session storage."
            );
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
          }
        } catch (e) {
          console.error(
            "Path: Infinite Scroll URL. Failed to parse session storage, clearing:",
            e
          );
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }

      if (!restoredFromSession) {
        console.log(
          "Path: Infinite Scroll URL. Initializing from SSR initialPosts (page 1)."
        );
        setPosts(initialPosts);
        setCurrentPage(initialPage);
        setShowMore(initialShowMore);
        window.scrollTo(0, 0);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        stateHandledThisRun = true;
      }
    }

    if (!didMountRef.current && stateHandledThisRun) {
      didMountRef.current = true;
      console.log("didMountRef set to true.");
    }
  }, [
    router.isReady,
    router.pathname,
    router.query.page,
    initialPosts,
    initialPage,
    initialShowMore,
    initialTotalPosts,
    router.asPath,
  ]);

  // --- Effect for Saving State on Unmount/Before Navigation ---
  const saveState = useCallback(() => {
    if (
      typeof window === "undefined" ||
      !didMountRef.current ||
      posts.length === 0
    ) {
      console.log(
        "Skipping saveState (on unload/routeChange): not client, or not mounted, or no posts."
      );
      return;
    }

    const currentUrlPage = parseInt(router.query.page || "1", 10);
    const isInfiniteScrollUrl =
      router.pathname === "/blog" &&
      (!router.query.page || router.query.page === "1");

    if (isInfiniteScrollUrl) {
      const stateToSave = {
        posts,
        currentPage,
        scrollY: window.scrollY,
      };
      console.log("Saving accumulated state to session storage:", stateToSave);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(stateToSave));
    } else {
      console.log(
        "Clearing session storage for direct /blog?page=N load (not infinite scroll)."
      );
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [posts, currentPage, router.pathname, router.query.page]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleRouteChangeStart = (url) => {
      // Only save if navigating away from the blog route entirely (e.g., to a post detail page)
      // or to a different page query within the blog, where infinite scroll state shouldn't persist.
      // We explicitly check for not starting with '/blog?page=' because we handle direct page navigation separately.
      if (!url.startsWith("/blog")) {
        console.log("Route change away from /blog. Triggering saveState.");
        saveState();
      } else if (
        url.startsWith("/blog?page=") &&
        router.asPath.startsWith("/blog") &&
        !router.asPath.startsWith("/blog?page=")
      ) {
        // If we are on /blog (infinite scroll) and navigating to /blog?page=N
        // We should clear the session storage as we're switching modes.
        console.log(
          "Navigating from infinite scroll to paginated view. Clearing session storage."
        );
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
      // No explicit save for route changes between /blog?page=N and /blog?page=M
      // as those pages are loaded fresh and don't involve infinite scroll state.
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    window.addEventListener("beforeunload", saveState);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      window.removeEventListener("beforeunload", saveState);
    };
  }, [router.events, saveState, router.asPath]); // Added router.asPath here for more specific checks

  // This `fetchMore` is ONLY for the infinite scroll part (/blog or /blog?page=1)
  const fetchMore = async (pageId) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await getPublicPosts(pageId);
      const combined = posts.concat(result.data);

      setPosts(combined);
      setShowMore(result.total > combined.length);
      setCurrentPage(pageId);

      // Immediately save state to sessionStorage after loading more
      if (typeof window !== "undefined") {
        const stateToSave = {
          posts: combined,
          currentPage: pageId,
          scrollY: window.scrollY,
        };
        console.log(
          "Saving state to sessionStorage after Load More:",
          stateToSave
        );
        sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify(stateToSave)
        );
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => fetchMore(currentPage + 1);

  // --- Pagination Specific Functions (for /blog?page=N) ---
  const handlePageChange = (newPage) => {
    console.log("Navigating to paginated page:", newPage);
    // This will trigger a full SSR fetch for the new page and reset the component state.
    // The useEffect will then handle the initialization correctly for /blog?page=N.
    router.push(`/blog?page=${newPage}`);
  };

  // --- Canonical URL and Page Title Logic ---
  let canonicalUrl = "https://deniapps.com/blog";
  let pageTitle = "Blog - Deni Apps";
  let breadcrumbActivePage = "Blog";

  const currentUrlPage = parseInt(router.query.page || "1", 10);
  const isPresentingPaginatedView = currentUrlPage > 1; // True when URL explicitly has ?page=N (N>1)

  if (isPresentingPaginatedView) {
    canonicalUrl = `https://deniapps.com/blog?page=${currentUrlPage}`;
    pageTitle = `Blog - Deni Apps - Page ${currentUrlPage}`;
    breadcrumbActivePage = `Blog / Page ${currentUrlPage}`;
  }

  const breadcrumbLinks = [
    { url: "/", name: "Home" },
    { url: "/blog", name: "Blog" },
  ];

  // --- Determine Next/Prev button states for paginated view ---
  const showPrevButton = isPresentingPaginatedView && currentPage > 1;
  const showNextButton = isPresentingPaginatedView && showMore; // showMore now indicates if there are *more pages after the current one* in paginated view
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <>
      <Meta
        title={pageTitle}
        desc="Software Engineer for React.js, Node.js, GraphQL and JavaScript..."
        summary="DNA - DeNiApps"
        canonical={canonicalUrl}
        image="https://deniapps.com/images/dna.png"
      />
      <Layout>
        {/* Breadcrumb only for direct paginated views */}
        {isPresentingPaginatedView && (
          <DNXBreadcrumb
            links={breadcrumbLinks}
            activePage={breadcrumbActivePage}
          />
        )}
        <PostList
          posts={posts}
          // The showLoadMore prop will now mean "show the Load More button" for infinite scroll,
          // and "show the Next button" for paginated view.
          // The PostList component needs to interpret this.
          // We will pass the appropriate loader/pagination function based on view type.
          isLoading={isLoading}
          // Removed showLoadMore prop, passing specific handlers instead
        />
        {isError && <div>Something went wrong ...</div>}
        {isLoading && (
          <Segment textAlign="center">
            <Loader inline active content="Loading..." />
          </Segment>
        )}

        {/* Conditional rendering for Load More vs. Prev/Next Buttons */}
        {!isPresentingPaginatedView && showMore && !isLoading && (
          <Segment textAlign="center">
            <Button onClick={loadMore} primary>
              Load More
            </Button>
          </Segment>
        )}

        {isPresentingPaginatedView && !isLoading && (
          <Segment textAlign="center">
            <Button
              onClick={() => handlePageChange(prevPage)}
              disabled={!showPrevButton}
              secondary
            >
              Previous Page
            </Button>
            <Button
              onClick={() => handlePageChange(nextPage)}
              disabled={!showNextButton}
              secondary
            >
              Next Page
            </Button>
          </Segment>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const rawPageId = parseInt(context.query.page || "1", 10);
  const pageId = Math.max(rawPageId, 1);

  let posts = [];
  let showLoadMore = false; // Renamed to better reflect its meaning: "has more pages/posts to load"
  let totalPosts = 0;

  try {
    const result = await getPublicPosts(pageId);
    posts = result.data;
    totalPosts = result.total;
    const skip = (pageId - 1) * pageSize;
    // For direct paginated view, showLoadMore means 'is there a next page?'
    // For infinite scroll, it means 'are there more posts to load?'
    showLoadMore = totalPosts > skip + posts.length;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      posts,
      showLoadMore, // This now reflects "are there more posts/pages after this one?"
      pageId,
      totalPosts,
    },
  };
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  showLoadMore: PropTypes.bool.isRequired, // Still boolean, but interpretation changes
  pageId: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

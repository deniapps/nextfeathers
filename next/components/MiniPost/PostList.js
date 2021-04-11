import { useEffect, useState } from "react"; //hook
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Header,
  Loader,
  Button,
  Icon,
  Container,
  Segment,
} from "semantic-ui-react";
import {
  getPosts,
  deletePost,
  permanentlyDeletePost,
  undeletePost,
} from "lib/posts";
import PostPanel from "./PostPanel";
import DNAMessage from "components/Common/Message";
import FatalError from "components/Common/HandleError";

//List => Panel => ItemView

export default function PostList() {
  const [isLoading, setIsLoading] = useState(false);
  const [fatalError, setFatalError] = useState(false);
  const [list, setList] = useState([]);
  const [pageId, setPageId] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const router = useRouter();
  const [message, setMessage] = useState(router.query.message);

  const fetchList = async (pageId) => {
    setFatalError(null);
    setIsLoading(true);
    try {
      const result = await getPosts(pageId);
      //TO-DO: check status for error handling, and add pagination if needed.
      const newList = list.concat(result.data);
      if (result.total > newList.length) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setList(newList);
    } catch (err) {
      // console.log(err.response.status);
      // if (err.response && err.response.status === 401) {
      // }
      setFatalError(err);
    }
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    fetchList(pageId);
    let msgTimer = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => {
      clearTimeout(msgTimer);
    };
  }, [pageId]);

  const loadMore = (e) => {
    console.log(e);
    e.preventDefault();
    setPageId(pageId + 1);
  };

  const handleRemove = async (id) => {
    await deletePost(id);
    // await fetchList();
    const newList = list.map((item) => {
      if (item._id === id) {
        item.isDeleted = true;
      }
      return item;
    });
    setList(newList);
  };

  const handleRecover = async (id) => {
    await undeletePost(id);
    // await fetchList();
    const newList = list.map((item) => {
      if (item._id === id) {
        item.isDeleted = false;
      }
      return item;
    });
    setList(newList);
  };

  const handlePermanentlyRemove = async (id) => {
    await permanentlyDeletePost(id);
    // await fetchList();
    const newList = list.filter((item) => item._id != id);
    setList(newList);
  };

  return (
    <div>
      {fatalError && <FatalError error={fatalError} />}
      {!fatalError && (
        <>
          <Header
            as="h2"
            icon
            textAlign="center"
            style={{ marginBottom: "40px" }}
          >
            <Header.Content>Your Posts</Header.Content>
          </Header>
          {message && <DNAMessage message={message} type="success" />}
          <Container textAlign="right">
            <Link href="/dashboard/post/new">
              <Button primary>
                New Post
                <Icon name="right chevron" />
              </Button>
            </Link>
          </Container>
          <PostPanel
            posts={list}
            onRemove={handleRemove}
            onRecover={handleRecover}
            onPermanentlyRemove={handlePermanentlyRemove}
          />
          {isLoading && (
            <Segment textAlign="center">
              <Loader inline active>
                Loading...
              </Loader>
            </Segment>
          )}
          {showMore && !isLoading && (
            <Segment textAlign="center">
              <Button color="blue" onClick={loadMore}>
                Load More
              </Button>
            </Segment>
          )}
        </>
      )}
    </div>
  );
}

import { useContext, useEffect, useState } from "react"; //hook
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "components/Context/UserContext";
import { Header, Loader, Button, Icon, Container } from "semantic-ui-react";
import { getPosts, deletePost } from "lib/posts";
import PostPanel from "./PostPanel";
import DNAMessage from "components/Common/Message";

//List => Panel => ItemView

export default function PostList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState([]);

  const router = useRouter();
  const [message, setMessage] = useState(router.query.message);

  const { accessToken } = useContext(UserContext);

  const fetchList = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await getPosts(accessToken);
      //TO-DO: check status for error handling, and add pagination if needed.
      const list = result.data.data;
      setList(list);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    fetchList();
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [accessToken]);

  const handleRemove = async (id) => {
    await deletePost(accessToken, id);
    // await fetchList();
    const newList = list.map((item) => {
      if (item._id === id) {
        item.isDeleted = true;
      }
      return item;
    });
    setList(newList);
  };

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <Loader inline>Loading...</Loader>
      ) : (
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
          <PostPanel posts={list} onRemove={handleRemove} />
        </>
      )}
    </div>
  );
}

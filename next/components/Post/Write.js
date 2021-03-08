import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"; //hook
import UserContext from "components/Context/UserContext";
import { Header, Loader, Segment } from "semantic-ui-react";
import PostInput from "components/Post/PostInput";
import { getPost, getDraft } from "lib/posts";
import FatalError from "components/Common/HandleError";
// import { renewJWT } from "lib/authentication";

export default function Write() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [fatalError, setFatalError] = useState(null);
  const [data, setData] = useState({});

  const { signOut } = useContext(UserContext);

  const fetchData = async () => {
    if (!id) return false;
    if (id === "new") {
      setData({
        title: "Add New Post",
        data: {},
      });
      return true;
    }
    setFatalError(null);
    setIsLoading(true);
    try {
      let data = {};
      //check if draft exists, if so, restore it
      const draftResult = await getDraft(id);
      if (draftResult && draftResult.total > 0) {
        data = draftResult.data[0];
      } else {
        const result = await getPost(id);
        // console.log("RESUTL", result);
        data = result.data;
      }

      setData({
        title: "Edit Post",
        data,
      });
    } catch (err) {
      setFatalError(err);
    }
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      {fatalError && <FatalError error={fatalError} />}
      {isLoading ? (
        <Segment textAlign="center">
          <Loader inline active>
            Loading...
          </Loader>
        </Segment>
      ) : (
        <>
          <Header
            as="h2"
            icon
            textAlign="center"
            style={{ marginBottom: "40px" }}
          >
            <Header.Content>{data.title}</Header.Content>
          </Header>
          <PostInput data={data} signOut={signOut} />
        </>
      )}
    </div>
  );
}

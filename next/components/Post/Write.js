import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"; //hook
import UserContext from "components/Context/UserContext";
import { Header, Loader, Segment } from "semantic-ui-react";
import PostInput from "components/Post/PostInput";
import { getPost, getDraft } from "lib/posts";
import APIError from "components/Common/HandleError";
// import { renewJWT } from "lib/authentication";

export default function Write() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [data, setData] = useState([]);

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
    setApiError(null);
    setIsLoading(true);
    try {
      let data = {};
      //check if draft exists, if so, restore it
      const draftResult = await getDraft(id);
      if (draftResult && draftResult.data.total > 0) {
        data = draftResult.data.data[0];
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
      setApiError(err);
    }
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      {apiError && <APIError error={apiError} />}
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
          <PostInput data={data.data} signOut={signOut} />
        </>
      )}
    </div>
  );
}

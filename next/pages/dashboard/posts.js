import Layout from "components/Layout";
import PostList from "components/Post/PostList";

export default function Posts() {
  return (
    <Layout authPage>
      <PostList />
    </Layout>
  );
}

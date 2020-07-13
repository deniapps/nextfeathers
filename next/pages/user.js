import { useRouter } from "next/router";
import Layout from "../components/Layout";
import UserInfo from "../components/UserInfo";

const User = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <UserInfo />
    </Layout>
  );
};

export default User;

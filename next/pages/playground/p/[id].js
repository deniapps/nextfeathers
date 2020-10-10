import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { dnaParser } from "helpers/common";

const Post = (props) => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{props.show ? props.show.name : router.query.title}</h1>
      {props.show ? dnaParser(props.show.summary) : <p>Just a static post</p>}

      {props.show && props.show.image ? (
        <img src={props.show.image.medium.replace("http:", "https:")} />
      ) : (
        <br />
      )}
    </Layout>
  );
};

Post.propTypes = {
  show: PropTypes.object,
};

export async function getServerSideProps(context) {
  // console.log(context.query);
  const { id } = context.query;
  if (!Number(id)) return { show: false }; //don't call the following for
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  console.log(res);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return {
    props: { show }, // will be passed to the page component as props
  };
}

export default Post;

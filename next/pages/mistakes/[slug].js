import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import Layout from "components/Layout";
import { getPostBySlug } from "lib/miniPost";
import { DiscussionEmbed } from "disqus-react";
import { Container, Header, Button, Divider } from "semantic-ui-react";
import Prism from "prismjs";
import TimeAgo from "react-timeago";
// import dynamic from "next/dynamic";
import UserContext from "components/Context/UserContext";

const Post = (props) => {
  const { user } = useContext(UserContext);
  const id = props.post.id;

  const title = props.post.title;
  const desc = props.post.summary;

  const summary = props.post.summary;
  const canonical =
    process.env.NEXT_PUBLIC_BLOG_BASEURL + "/" + props.post.slug;
  const image = props.post.image;
  const content = props.post.content;
  const author = props.post.author
    ? props.post.author.firstName + " " + props.post.author.lastName
    : "Admin";

  const publishedOn = props.post.createdAt;
  // const lastUpdated = props.post.updatedAt;

  const seoData = {
    title,
    desc,
    summary,
    canonical,
    image,
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <Layout seoData={seoData}>
      <Container text>
        <Header as="h1">
          {title}
          <Header.Subheader>
            {author} | <TimeAgo date={publishedOn} />
            {user && (
              <Button floated="right" style={{ marginTop: "-15px" }}>
                <a href={"/dashboard/post/" + id}>Edit</a>
              </Button>
            )}
          </Header.Subheader>
        </Header>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        <Divider />

        {process.env.NEXT_PUBLIC_DISQUS &&
          process.env.NEXT_PUBLIC_DISQUS === "on" && (
            <DiscussionEmbed
              shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}
              config={{
                url: canonical,
                identifier: props.post._id,
                title: title,
              }}
            />
          )}
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export function getServerSideProps(context) {
  const { slug } = context.query;

  const result = getPostBySlug(slug);

  return {
    props: { post: result[0] }, // will be passed to the page component as props
  };
}

export default Post;

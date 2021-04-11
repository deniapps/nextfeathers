import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import Layout from "components/Layout";
import { getPublicPost } from "lib/blog";
import { DiscussionEmbed } from "disqus-react";
import { Container, Header, Button, Divider } from "semantic-ui-react";
import Prism from "prismjs";
import TimeAgo from "react-timeago";
// import dynamic from "next/dynamic";
import UserContext from "components/Context/UserContext";

// const DNAComments = dynamic(() => import("components/Common/Comments"), {
//   ssr: false,
// });

const Post = (props) => {
  const { user } = useContext(UserContext);
  const id = props.blog._id;

  const title = props.blog.title;
  const desc = props.blog.summary;

  const summary = props.blog.summary;
  const canonical =
    process.env.NEXT_PUBLIC_BLOG_BASEURL + "/" + props.blog.slug;
  const image = props.blog.image;
  const content = props.blog.content;
  const author = props.blog.author
    ? props.blog.author.firstName + " " + props.blog.author.lastName
    : "Admin";

  const publishedOn = props.blog.createdAt;
  // const lastUpdated = props.blog.updatedAt;

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
                identifier: props.blog._id,
                title: title,
              }}
            />
          )}
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  blog: PropTypes.object,
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const result = await getPublicPost(slug);

  return {
    props: { blog: result.data[0] }, // will be passed to the page component as props
  };
}

export default Post;

import PropTypes from "prop-types";
import { useEffect } from "react";
import Layout from "components/Layout";
import { getPublicPost } from "lib/blog";
import { Container, Header } from "semantic-ui-react";
import Prism from "prismjs";
import TimeAgo from "react-timeago";
import dynamic from "next/dynamic";
import { DiscussionEmbed } from "disqus-react";

const DNAComments = dynamic(() => import("components/Common/Comments"), {
  ssr: false
});

// import FBComments from "components/Common/FBComments";

const Post = props => {
  const title = props.blog.title;
  const desc = props.blog.summary;

  const summary = props.blog.summary;
  const canonical = "https://analyticalexpert.net/blog/" + props.blog.slug;
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
    image
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
          </Header.Subheader>
        </Header>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        {process.env.NEXT_PUBLIC_GITALK &&
          process.env.NEXT_PUBLIC_GITALK === "on" && (
            <DNAComments slug={props.blog.slug} />
          )}
        {process.env.NEXT_PUBLIC_FB_COMMENTS && (
          <DiscussionEmbed
            shortname="analyticalexpert"
            config={{
              url: canonical,
              identifier: props.blog._id,
              title: title
            }}
          />
        )}
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  blog: PropTypes.object
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const result = await getPublicPost(slug);

  return {
    props: { blog: result.data.data[0] } // will be passed to the page component as props
  };
}

export default Post;

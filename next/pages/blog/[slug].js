import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import Layout from "components/Layout";
import { getPublicPost } from "lib/blog";
import { DiscussionEmbed } from "disqus-react";
import { Container, Header, Button, Divider } from "semantic-ui-react";
import DNXBreadcrumb from "../../components/Common/Breadcrumb";
import { truncateString } from "../../helpers/common";
import Prism from "prismjs";
import TimeAgo from "react-timeago";
// import dynamic from "next/dynamic";
import UserContext from "components/Context/UserContext";

// Override Prism.highlightAll() to disable auto-highlighting
const originalHighlightAll = Prism.highlightAll;
Prism.highlightAll = function () {};

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

  const breadcrumbLinks = [
    { url: "/", name: "Home" },
    { url: "/blog", name: "Blog" },
  ];

  const MAX_TITLE_LENGTH_FOR_BREADCRUMB = 40; // You can adjust this number

  const breadcrumbActivePage = truncateString(
    seoData.title,
    MAX_TITLE_LENGTH_FOR_BREADCRUMB
  );

  useEffect(() => {
    // if (content) Prism.highlightAll();
    // Manually call Prism.highlightAll() when you want to apply syntax highlighting
    originalHighlightAll.call(Prism);
  }, [content]);

  return (
    <Layout seoData={seoData}>
      <DNXBreadcrumb
        links={breadcrumbLinks}
        activePage={breadcrumbActivePage}
      />
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
  if (result.total === 0 || result.records?.total === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog: result.data[0] }, // will be passed to the page component as props
  };
}

export default Post;

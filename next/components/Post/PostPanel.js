import PropTypes from "prop-types";
import { Loader, Tab } from "semantic-ui-react";
import PostItemView from "./PostItemView";

const PostPanel = (props) => {
  const posts = props.posts;
  if (!posts) return <Loader inline>Loading</Loader>;
  const published = posts.filter((post) => !post.isDeleted && !post.isDraft);
  const drafts = posts.filter((post) => !post.isDeleted && post.isDraft);
  const deleted = posts.filter((post) => post.isDeleted);

  const publishedPanel = () => (
    <Tab.Pane attached={false}>
      <PostItemView items={published} onRemove={props.onRemove} />
    </Tab.Pane>
  );

  const draftsPanel = () => (
    <Tab.Pane attached={false}>
      <PostItemView items={drafts} onRemove={props.onRemove} />
    </Tab.Pane>
  );

  const deletedPanel = () => (
    <Tab.Pane attached={false}>
      <PostItemView items={deleted} onRemove={props.onRemove} />
    </Tab.Pane>
  );

  const panes = [
    {
      menuItem: "Published",
      displayName: "Published",
      render: publishedPanel,
    },
    {
      menuItem: "Drafts",
      displayName: "Drafts",
      render: draftsPanel,
    },
    {
      menuItem: "Deleted",
      displayName: "Deleted",
      render: deletedPanel,
    },
  ];

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
};

PostPanel.propTypes = {
  posts: PropTypes.array,
  onRemove: PropTypes.func,
};

export default PostPanel;

import PropTypes from "prop-types";
import Link from "next/link";
import { Header, Label, Icon } from "semantic-ui-react";

//List => Panel => ItemView

export default function PostList(props) {
  return (
    <div>
      <Header as="h2" icon textAlign="center" style={{ marginBottom: "40px" }}>
        <Header.Content>All Tags</Header.Content>
      </Header>
      <div>
        {props.tags &&
          props.tags.map((item) => (
            <Link
              key={item._id}
              href={`/blog/tags/[slug]`}
              as={`/blog/tags/${item.slug}`}
            >
              <Label as="a">
                <Icon name="tag" /> {item.name}
              </Label>
            </Link>
          ))}
      </div>
    </div>
  );
}

PostList.propTypes = {
  tags: PropTypes.array,
};

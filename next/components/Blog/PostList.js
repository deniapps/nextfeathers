import PropTypes from "prop-types";
import Link from "next/link";
import { Header, Item, Label } from "semantic-ui-react";

//List => Panel => ItemView

export default function PostList(props) {
  return (
    <div>
      <Header as="h2" icon textAlign="center" style={{ marginBottom: "40px" }}>
        <Header.Content>All Posts</Header.Content>
      </Header>
      <Item.Group divided>
        {props.posts &&
          props.posts.map((item) => (
            <Item key={item._id}>
              <Item.Image src={item.image} />

              <Item.Content>
                <Link href={`/blog/[slug]`} as={`/blog/${item.slug}`}>
                  <Item.Header as="a">{item.title}</Item.Header>
                </Link>
                <Item.Meta>
                  <span className="cinema">{item.createdAt}</span>
                </Item.Meta>
                <Item.Description>{item.summary}</Item.Description>
                <Item.Extra>
                  {item.tags.map((tag) => (
                    <Label key={tag}>{tag}</Label>
                  ))}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
};

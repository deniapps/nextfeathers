import PropTypes from "prop-types";
import { Item, Label, Dropdown } from "semantic-ui-react";
import Link from "next/link";

const PostItemView = (props) => {
  return (
    <Item.Group divided>
      {props.items.map((item) => (
        <Item key={item._id}>
          <Item.Content>
            <Item.Header as="h3">{item.title}</Item.Header>
            <Item.Description>{item.summary}</Item.Description>
            <Item.Extra>
              {item.tags.map((tag) => (
                <Label key={tag}>{tag}</Label>
              ))}
              <Dropdown text="Action">
                <Dropdown.Menu>
                  <Link href={"/dashboard/post/" + item._id}>
                    <Dropdown.Item>Edit</Dropdown.Item>
                  </Link>
                  <Dropdown.Item
                    text="Delete"
                    onClick={() => props.onRemove(item._id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

PostItemView.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func,
};

export default PostItemView;

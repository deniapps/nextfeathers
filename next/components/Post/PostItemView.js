import PropTypes from "prop-types";
import { Item, Label, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import TimeAgo from "react-timeago";

const PostItemView = (props) => {
  return (
    <>
      <Item.Group divided>
        {props.items.map((item) => (
          <Item key={item._id}>
            <Item.Content>
              <Item.Header>
                <Link href={"/dashboard/post/" + item._id}>
                  <a>{item.title}</a>
                </Link>
              </Item.Header>

              <Item.Description>{item.summary}</Item.Description>
              <Item.Extra>
                {item.tags.map((tag) => (
                  <Label key={tag}>{tag}</Label>
                ))}
                <span>
                  Last edited: <TimeAgo date={item.updatedAt} />
                </span>
                <Dropdown text="Action">
                  <Dropdown.Menu>
                    {props.onRecover && (
                      <Dropdown.Item
                        text="Recover"
                        onClick={() => props.onRecover(item._id)}
                      />
                    )}
                    {!props.onRecover && (
                      <Link href={"/dashboard/post/" + item._id}>
                        <Dropdown.Item>Edit</Dropdown.Item>
                      </Link>
                    )}
                    <Dropdown.Item
                      text={props.onRecover ? "Permanently Delete" : "Delete"}
                      onClick={() => props.onRemove(item._id)}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </>
  );
};

PostItemView.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func,
  onRecover: PropTypes.func,
};

export default PostItemView;

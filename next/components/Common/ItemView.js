import PropTypes from "prop-types";
import { Item, Label } from "semantic-ui-react";
import Link from "next/link";

const ItemView = (props) => {
  return (
    <Item.Group divided>
      {props.items.map((item) => (
        <Item key={item._id}>
          <Item.Content>
            <Link href={item.url}>
              <Item.Header as="a">{item.title}</Item.Header>
            </Link>
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
  );
};

ItemView.propTypes = {
  items: PropTypes.array,
};

export default ItemView;

import PropTypes from "prop-types";
import { Item, Label } from "semantic-ui-react";
import Link from "next/link";
import { dnaParser } from "helpers/common";

const ItemView = (props) => {
  return (
    <Item.Group divided>
      {props.items.map((item) => (
        <Item key={item._id}>
          <Item.Content>
            <Item.Header>
              <Link href={item.url} passHref>
                <a>{item.title}</a>
              </Link>
            </Item.Header>

            <Item.Description>{dnaParser(item.summary)}</Item.Description>
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

import PropTypes from "prop-types";
import { Item, Label } from "semantic-ui-react";
import Link from "next/link";
import { dnaParser } from "helpers/common";

const ItemView = (props) => {
  return (
    <Item.Group divided>
      {props.items.map((item) => (
        <Item key={item.id}>
          <Item.Content>
            <Item.Header>
              {props.miniPost && (
                <Link href="/mistakes/[slug]" as={`/mistakes/${item.slug}`}>
                  <a>{item.title}</a>
                </Link>
              )}
              {!props.miniPost && (
                <Link href={item.url} passHref>
                  <a>{item.title}</a>
                </Link>
              )}
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
  miniPost: PropTypes.bool,
};

export default ItemView;

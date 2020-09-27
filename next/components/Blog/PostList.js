import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Header, Item, Label, Image, Segment, Button } from "semantic-ui-react";

//List => Panel => ItemView

export default function PostList(props) {
  const headline = props.headline ? props.headline : "All Posts";

  return (
    <div>
      <Header as="h1" icon>
        <Header.Content>
          {headline}{" "}
          {props.tagData && (
            <span>
              {" "}
              In <i>{props.tagData.name}</i>
            </span>
          )}
        </Header.Content>
      </Header>
      {props.posts.length < 1 && <p>Not Records Found!</p>}
      <Item.Group divided>
        {props.posts &&
          props.posts.map((item) => {
            let author = "Admin";
            if (item.author) {
              author = item.author.firstName + " " + item.author.lastName;
            }
            return (
              <Item key={item._id}>
                <div className="image">
                  <Link
                    href={`/blog/[slug]`}
                    as={`/blog/${item.slug}`}
                    passHref
                  >
                    <a>
                      <Image src={item.image} />
                    </a>
                  </Link>
                </div>

                <Item.Content>
                  <Item.Header>
                    <Link
                      href={`/blog/[slug]`}
                      as={`/blog/${item.slug}`}
                      passHref
                    >
                      <a>{item.title}</a>
                    </Link>
                  </Item.Header>
                  <Item.Meta>
                    <span className="cinema">
                      {author} | <TimeAgo date={item.createdAt} />
                    </span>
                  </Item.Meta>
                  <Item.Description>{item.summary}</Item.Description>
                  <Item.Extra>
                    {item.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tags/[slug]`}
                        as={`/blog/tags/${tag}`}
                      >
                        <Label as="a">{tag}</Label>
                      </Link>
                    ))}
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
      </Item.Group>
      {props.showLoadMore && !props.isLoading && (
        <Segment textAlign="center">
          <Button color="blue" onClick={props.loadMore}>
            Load More
          </Button>
        </Segment>
      )}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  tagData: PropTypes.object,
  showLoadMore: PropTypes.bool,
  loadMore: PropTypes.func,
  headline: PropTypes.string,
  isLoading: PropTypes.bool,
};

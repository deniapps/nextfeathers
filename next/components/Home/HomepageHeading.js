// import Link from "next/link";
import { Container, Segment } from "semantic-ui-react";

const HomepageHeading = () => (
  <Segment
    inverted
    textAlign="center"
    style={{ minHeight: 350, padding: "2em 0em" }}
    vertical
  >
    <Container text>
      <h1 className="hp-header">Deni Apps</h1>

      <p className="hp-slogan">We Build Websites & Apps</p>
    </Container>
  </Segment>
);

export default HomepageHeading;

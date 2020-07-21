import Link from "next/link";
import { Button, Container, Segment, Icon } from "semantic-ui-react";

const HomepageHeading = () => (
  <div id="banner">
    <Container text>
      <h1 className="hp-header">Analytical Expert</h1>
      <p className="hp-slogan">
        Practical Solutions for Biopharmaceutical Analytical Sciences that
        Accelerate Drug Product Development{" "}
      </p>
    </Container>
  </div>
);

export default HomepageHeading;

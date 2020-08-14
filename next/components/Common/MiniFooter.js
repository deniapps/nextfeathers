import { Grid, Container, Segment } from "semantic-ui-react";

const Footer = () => (
  <Segment
    id="deniFooter"
    inverted
    vertical
    style={{
      padding: "1em 0em",
      backgroundColor: "rgba(248,248,248, 0.3)",
    }}
  >
    <Container>
      <Grid inverted>
        <Grid.Row>
          <Grid.Column id="copyRight">DeNi Apps LLC - 2020</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

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
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "center", color: "#111" }}>
            DeNiApps 2020
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

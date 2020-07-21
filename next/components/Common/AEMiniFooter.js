import { Grid, Container, Segment } from "semantic-ui-react";

const Footer = () => (
  <Segment
    id="deniFooter"
    vertical
    style={{
      padding: "1em 0em",
      borderTop: "2px solid #CDE8F6",
    }}
  >
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "right", color: "#111" }}>
            Analytical Expert &copy; 2020
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

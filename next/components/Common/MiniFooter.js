import { Grid, Container, Segment, Icon } from "semantic-ui-react";

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
          <Grid.Column id="copyRight">
            Deni Apps LLC - 2021 |{" "}
            <a
              href="https://github.com/deniapps/nextfeathers"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" key="userMenu-4" /> Source Code
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

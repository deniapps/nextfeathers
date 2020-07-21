import { Container, Grid, Header, Image } from "semantic-ui-react";
import Layout from "components/HomeLayout";
import HomepageHeading from "../components/Home/AEHomepageHeading";
import HeaderMenu from "../components/Common/AEHeader";

export default function Index() {
  const src = `/images/ae/background/bg5.jpg`;
  return (
    <Layout>
      <div className="home">
        <HeaderMenu />
        <HomepageHeading />
      </div>

      <div className="level2">
        <Container>
          <Grid stackable columns={2}>
            <Grid.Column width={10}>
              <p>
                Welcome to Analytical Experts, a team of highly skilled
                analytical experts with years of advanced solid training in
                bio-pharmaceutical industry, and experienced in therapeutic
                protein, vaccine, mRNA/DNA and Cell therapy development.
              </p>

              <p>
                We are a team of like-minded and determined individuals, all
                sharing a vision that your success is our success. Our goal is
                to provide practical solutions with sound scientific base
                trending with regulatory policies to meet your drug product
                research and development needs from preIND to BLA, and Life
                Cycle Management.
              </p>

              <p>
                We believe that our sophisticated technology, highly experienced
                technical expertise will pave the way for your drug development.
              </p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Image src={src} />
            </Grid.Column>
          </Grid>
        </Container>
      </div>

      <div className="level3">
        <Container text>
          <p>
            "The secret of getting ahead is getting started"
            <br />~ Mark Twain
          </p>
        </Container>
      </div>

      <div className="level4">
        <Container text>
          <Header as="h2" color="blue">
            Get In Touch
          </Header>
          <p>
            <a href="mailto:info@AnalyticalExpert.net">
              info@AnalyticalExpert.net
            </a>
            <br />
            202-750-0989
          </p>
        </Container>
      </div>
    </Layout>
  );
}

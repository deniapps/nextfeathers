import Layout from "../components/Layout";
import { Grid, Header, Button, Image } from "semantic-ui-react";

const sendEmail = () => {
  const url = "mailto:info@AnalyticalExpert.net";
  const win = window.open(url, "_blank");
  win.focus();
};

export default function About() {
  const src = `/images/ae/background/bg6.jpg`;
  const title = "About Us - Analytical Expert";
  const desc = "We are Industry Leader in Analytical Service.";
  const summary = desc;
  const canonical = "https://analyticalexpert.net/about-us";
  const image = "https://analyticalexpert.net/images/ae/ae.jpg";

  const seoData = {
    title,
    desc,
    summary,
    canonical,
    image,
  };

  return (
    <Layout seoData={seoData}>
      <Grid>
        <Grid.Column>
          <Header as="h1">
            About Us
            <Header.Subheader>
              An Industry Leader in Analytical Service
            </Header.Subheader>
          </Header>
          <Grid stackable columns={2}>
            <Grid.Column width={7}>
              <Image src={src} />
            </Grid.Column>
            <Grid.Column width={9}>
              <p>
                With our combined experiences on supporting numerous INDs and
                BLAs, we strive to enhance our customers' every day experiences.
                Founded in 2020, our incredible team of bioanalytical scientists
                with deep biophysical, biochemical, molecular and cellular
                analysis experts have worked tirelessly to bring Analytical
                Experts to the forefront of the industry.{" "}
              </p>
              <p>
                In order to provide excellent solutions, we dedicate time and
                resources to research the advanced analytical technologies and
                the needs for the industry under highly dynamic environment. We
                provide the well round analytical lab services for the following
                class of products:
                <ol>
                  <li>Therapeutic and prophylactic proteins</li>
                  <li>Vaccines</li>
                  <li>mRNA/DNA based medicines</li>
                  <li>Cell/gene therapy products</li>
                </ol>
              </p>
              <p>
                Our services includes biochem-biophysical method development,
                method qualification/validation per ICH guidelines, method
                transfer to clinical and commercial QC labs, drug substance and
                drug product characterization, raw material testing and
                qualification.
              </p>
              <p>
                Besides the lab services, we also have a team highly experienced
                in Chemistry, Manufacturing and Control (CMC) to develop the
                fit-for-purpose analytical control strategies. We have, and will
                continue to provide big picture insights and detailed lab
                supports which industry leaders not only approve of, but also
                depend on. Get in touch to learn more.
              </p>

              <Button color="blue" onClick={sendEmail}>
                Get in Touch
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

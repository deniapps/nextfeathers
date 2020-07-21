import Layout from "../components/Layout";
import { Grid, Header, Button, Image } from "semantic-ui-react";

const sendEmail = () => {
  const url = "mailto:info@AnalyticalExpert.net";
  const win = window.open(url, "_blank");
  win.focus();
};

export default function Services() {
  const src = `/images/ae/background/bg2.jpg`;
  const title = "Services - Analytical Expert";
  const desc =
    "Smart solutions are at the core of all that we do at Analytical Expert.";
  const summary = desc;
  const canonical = "https://analyticalexpert.net/services";
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
            Service
            <Header.Subheader>
              Smart solutions are at the core of all that we do
            </Header.Subheader>
          </Header>
          <Grid stackable columns={2}>
            <Grid.Column width={7}>
              <Image src={src} />
            </Grid.Column>
            <Grid.Column width={9}>
              <p>
                Our main goal is finding smart ways of applying advanced
                technology that have been proofed effective and efficient to
                help build a better analytical development path for customers.
              </p>

              <p>We are specialized in methods:</p>

              <ul>
                <li>HPLC (SEC, Reverse-phase, Normal-phase, Affinity)</li>
                <li>
                  LC-MS (intact mass, subunit mass, peptide mapping,
                  glycosylation, glycan profiling, phosphorylation, HDX)
                </li>
                <li>PCR based methods</li>
                <li>Cell-based assays</li>
              </ul>
              <Button color="blue" onClick={sendEmail} floated="right">
                Get in Touch
              </Button>
              {/* <p>
                Click below to learn more about our service, or get in touch to
                set up a meeting with one of our representatives.
              </p> */}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

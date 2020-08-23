import React from "react";
import { Segment, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContactForm from "components/Contact/ContactForm";
import ContactTable from "components/Contact/ContactTable";
import { ContactContextProvider } from "components/Context/ContactContext";

const title = "UseReducer Example - DeNiApps";
const desc = `A simple example to demostrate how to use UseReducer within NextJS `;

const summary = desc;
const canonical = "https://deniapps.com/playground/contact-view";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

export default function Contacts() {
  return (
    <Layout seoData={seoData}>
      <ContactContextProvider>
        <Segment basic>
          <Header as="h3">Contacts</Header>
          <ContactForm />
          <ContactTable />
        </Segment>
      </ContactContextProvider>
    </Layout>
  );
}

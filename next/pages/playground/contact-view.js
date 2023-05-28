import React from "react";
import Meta from "components/Common/Meta";
import { Segment, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContactForm from "components/Contact/ContactForm";
import ContactTable from "components/Contact/ContactTable";
import { ContactContextProvider } from "components/Context/ContactContext";

const title = "UseReducer Example - Deni Apps";
const desc = `A simple example to demostrate how to use UseReducer within NextJS `;

const summary = desc;
const canonical = "https://deniapps.com/playground/contact-view";
const image = "https://deniapps.com/images/dna.png";

export default function Contacts() {
  return (
    <>
      <Meta
        title={title}
        desc={desc}
        summary={summary}
        canonical={canonical}
        image={image}
      />
      <Layout>
        <ContactContextProvider>
          <Segment basic>
            <Header as="h3">Contacts</Header>
            <ContactForm />
            <ContactTable />
          </Segment>
        </ContactContextProvider>
      </Layout>
    </>
  );
}

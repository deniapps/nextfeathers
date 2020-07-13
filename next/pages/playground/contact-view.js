import React from "react";
import { Segment, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContactForm from "components/Contact/ContactForm";
import ContactTable from "components/Contact/ContactTable";
import { ContactContextProvider } from "components/Context/ContactContext";

export default function Contacts() {
  return (
    <Layout>
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

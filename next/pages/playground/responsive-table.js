import React from "react";
import Layout from "../../components/Layout";
import { Table } from "semantic-ui-react";

const title = "Responsive Semantic UI React Table Example - Deni Apps";
const desc = `Turn Semantic UI React Table into a responsive table`;

const summary = desc;
const canonical = "https://deniapps.com/playground/home";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const TableExample = () => (
  <Table celled unstackable striped className="dnxTable">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Header1</Table.HeaderCell>
        <Table.HeaderCell>Header2</Table.HeaderCell>
        <Table.HeaderCell>Header3</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

const Stackable = () => (
  <Table celled stackable striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Header1</Table.HeaderCell>
        <Table.HeaderCell>Header2</Table.HeaderCell>
        <Table.HeaderCell>Header3</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell data-label="Header1">Cell</Table.Cell>
        <Table.Cell data-label="Header2">Cell</Table.Cell>
        <Table.Cell data-label="Header3">Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

const myTable = () => {
  return (
    <Layout seoData={seoData}>
      <h1>Responsive Table</h1>
      <TableExample />
      <h2>Stackable Table</h2>
      <Stackable />
    </Layout>
  );
};
export default myTable;

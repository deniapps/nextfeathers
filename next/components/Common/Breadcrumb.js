import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import Link from "next/link";

const DNXBreadcrumb = ({ links, activePage }) => {
  const sections = links.map((item) => ({
    key: item.name,
    content: item.refresh ? (
      <a href={item.url}>{item.name}</a>
    ) : (
      <Link href={item.url}>{item.name}</Link>
    ),
    link: false,
  }));

  sections.push({ key: activePage, content: activePage, active: true });
  return <Breadcrumb icon="right angle" sections={sections} />;
};

export default DNXBreadcrumb;

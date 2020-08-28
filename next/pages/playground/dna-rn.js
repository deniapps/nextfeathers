import React from "react";

import ResponsiveHeader from "dna-responsive-nav";

const links = (
  <ul>
    <li key="blog-menu">
      <a href="/blog">Blog</a>
    </li>
    <li key="about-menu">
      <a href="/about">About Us</a>
    </li>
    <li key="playground-menu">
      <a href="/playground">Playground</a>
    </li>
    <li key="mistakes">
      <a href="/mistakes">Mistakes</a>
    </li>
  </ul>
);

const handleSearch = (kw) => {
  if (kw) {
    const url = "https://deniapps.com/search?kw=" + encodeURIComponent(kw);
    window.open(url, "_blank");
  }
};

const App = () => {
  return (
    <ResponsiveHeader
      siteName="Deni Apps"
      links={links}
      handleSearch={handleSearch}
      logo="/images/dna-computer.png"
    />
  );
};

export default App;

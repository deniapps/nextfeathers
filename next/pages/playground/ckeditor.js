import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import { useState } from "react";
import CKDemoCode from "../../components/Demo/CKDemoCode";

// import CKEditor from "components/Common/CKEditor";
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("components/Common/CKEditor"), {
  ssr: false,
});

const title = "CKEditor Demo - Deni Apps";
const desc = `CKEdtior Demo for CKEditor Class Build with DNA. Built on the top of CKEditor Class Build, with some useful custom plugins allow us to inserting image url and adding code block or inline code features. Also integrated in NEXTJS with SSR.`;

const summary = desc;
const canonical = "https://deniapps.com/playground/ckeditor";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const CKEditorDemo = (props) => {
  const [content, setContent] = useState(
    `<p>CKEditor rocks!</p><p><strong>We now can add an image from Unsplash!</strong></p><figure class="image ck-widget" contenteditable="false"><img src="https://images.unsplash.com/photo-1567447789753-d9fdebebbc8b?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE1NDAxMH0"><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><polyline points="8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914" transform="translate(1,0)"></polyline><line x1="0" y1="4.21581031" x2="2" y2="2.17810059" transform="translate(1, 0)"></line><line x1="0" y1="6.21581031" x2="2" y2="4.17810059" transform="translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)"></line></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><polyline points="8.05541992 0.263427734 8.05541992 4.23461914 1.28417969 4.23461914" transform="translate(1,0)"></polyline><line x1="0" y1="4.21581031" x2="2" y2="2.17810059" transform="translate(1, 0)"></line><line x1="0" y1="6.21581031" x2="2" y2="4.17810059" transform="translate(2, 5.196955) scale(1, -1) translate(-1, -5.196955)"></line></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div><figcaption class="ck-editor__editable ck-editor__nested-editable" data-placeholder="Enter image caption" contenteditable="true">Photo by <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/@hatham">Hatham</a> on <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/?utm_source=DNX&amp;utm_medium=referral">Unsplash</a></figcaption></figure><pre data-language="PHP" spellcheck="false"><code class="language-php">&lt;?php
    $nextJS = "NextJS";
    $feathersJS = "FeathersJS";
    $perfect = $nextJS + $feathersJS;</code></pre>`
  );

  const handeEditorChange = (newData) => {
    setContent(newData);
  };

  return (
    <Layout seoData={seoData}>
      <Header as="h2">CKEditor Demo</Header>
      <CKEditor value={content} onChange={handeEditorChange} />
      <CKDemoCode {...props} />
    </Layout>
  );
};

export default CKEditorDemo;

export async function getStaticProps() {
  const fs = require("fs");
  const { promisify } = require("util");
  const path = require("path");
  const readFileAsync = promisify(fs.readFile);

  // console.log(path.resolve("./"));

  // console.log("DIR", __dirname);

  const source1Path = path.join(path.resolve("./") + "/snippet/CKEditor.js");

  const source2Path = path.join(
    path.resolve("./") + "/snippet/callCKEditor.js"
  );

  const source1 = await readFileAsync(source1Path, "utf8");
  const source2 = await readFileAsync(source2Path, "utf8");

  return {
    props: {
      source1,
      source2,
    }, // will be passed to the page component as props
  };
}

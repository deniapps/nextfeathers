import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import { useState, useEffect } from "react";
import CKDemoCode from "../../components/Demo/CKDemoCode";
import Prism from "prismjs";

// import CKEditor from "components/Common/CKEditor";
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("components/Common/CKEditorDemo"), {
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
    `<p>CKEditor rocks!</p><p><strong>Insert base64–encoded image</strong></p><figure class="image"><img src="data:image/png;base64,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"><figcaption>CKEditor 5</figcaption></figure><p><strong>We now can add an image from Unsplash!</strong></p><figure class="image"><img src="https://images.unsplash.com/photo-1508144322886-717c284ab392?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE1NDAxMH0"><figcaption>Photo by <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/@lucabravo?utm_source=DNX&amp;utm_medium=referral">Luca Bravo</a> on <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/?utm_source=DNX&amp;utm_medium=referral">Unsplash</a></figcaption></figure><pre><code class="language-php">&lt;?php
    $nextJS = "NextJS";
    $feathersJS = "FeathersJS";
    $perfect = $nextJS + $feathersJS;</code></pre>`
  );

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handeEditorChange = (newData) => {
    setContent(newData);
  };

  return (
    <Layout seoData={seoData}>
      <Header as="h2">CKEditor Demo</Header>
      <CKEditor value={content} onChange={handeEditorChange} />
      <Header as="h2">Source Code of the Content Above</Header>
      {/* <Highlight className="html">{content}</Highlight> */}
      <pre>
        <code className="language-js">{content}</code>
      </pre>

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

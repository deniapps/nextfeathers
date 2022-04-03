import Layout from "../../components/Layout";
import { useEffect } from "react";
import Prism from "prismjs";

import { Header } from "semantic-ui-react";

const code1 = `document.body.innerHTML += \`<div class="dnx-modal-overlay" id="dnx-modal-overlay"></div>
          <div class="dnx-modal" id="dnx-modal">
            <a href="#" class="close-button" id="dnx-close-button"></a>
            <div class="modal-guts">
              Hello! I am Pop.
            </div>
          </div>\`;
`;

const code2 = `const dnxModal = document.createElement("div");
dnxModal.id = "dnx-modal-wrapper";
dnxModal.innerHTML += \`<div class="dnx-modal-overlay" id="dnx-modal-overlay"></div>
        <div class="dnx-modal" id="dnx-modal">
          <a href="#" class="close-button" id="dnx-close-button"></a>
          <div class="modal-guts">
            Hello! I am Pop.
          </div>
        </div>\`;
document.body.appendChild(dnxModal);
`;

const title = "Append Child to the DOM - Deni Apps";
const desc = `Don't use "x.innerHTML += y" to add a new Element to the DOM, instead, use document.body.appendChild(Ele). Otherwise the Javascript events will suddenly stop working`;

const summary = desc;
const canonical = "https://deniapps.com/mistakes/append-content-to-html-body";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const AppendHTML = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout seoData={seoData}>
      <Header as="h3">
        Don&apos;t Use <code>x.innerHTML += y</code>
      </Header>

      <p>
        Sometimes, we want to add a new DOM element to the HTML body
        dynamically, for example, add a popup Modal, like this: <br />
        <pre>
          <code className="language-js">{code1}</code>
        </pre>
      </p>

      <p>
        It seems to be working as the modal is open, but after that, we see all
        Javascript events on the page are broken. This is because{" "}
        <code>x.innerHTML += y</code> completely overwrites the old HTML
        document, although it looks the same, under the hood all Javascript
        events are wiped off.
      </p>

      <p>
        The correct way to do this is using{" "}
        <code>document.body.appendChild(Ele)</code>, like this, <br />
        <pre>
          <code className="language-js">{code2}</code>
        </pre>
      </p>

      <Header as="h3">Codepen Demo</Header>
      <a href="" target="_blank">
        https://codepen.io/deniapps/pen/eYZzqbV
      </a>
    </Layout>
  );
};

export default AppendHTML;

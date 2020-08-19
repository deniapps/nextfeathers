import Layout from "../../components/Layout";
import { Header } from "semantic-ui-react";
import Highlight from "react-highlight";

const code1 = `<ul className="dnx-photo-grid">
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img
                src={photo.urls.regular}
                onClick={(photo) => props.handleSelect(photo)}
              />
            </li>
          );
        })}
      </ul>
`;

const code2 = `<img
src={photo.urls.regular}
onClick={() => props.handleSelect(photo)}
/>
`;

const title = "How to Pass Props to onClick Event - DeNiApps";
const desc = `The first parameter in onClick function is "event", so if you want to pass other props, then make sure don't define them as the first parameter.`;

const summary = desc;
const canonical = "https://deniapps.com/mistakes/pass-props-to-onclick-event";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const AppendHTML = () => {
  return (
    <Layout seoData={seoData}>
      <Header as="h3">How to Pass Props to onClick Event</Header>

      <p>
        <code>onClick</code> is very common Javascript Event, you may not
        believe you could make a mistake like this. <br />
        <Highlight className="javascript">{code1}</Highlight>
      </p>
      <p>
        After passing <code>photo</code> as a parameter in{" "}
        <code>{`onClick={(photo) => handleSelect(photo)}`}</code>
        {`, the debugger
        shows the error says "photo.urls is undefined". That's becasue, you
        assign 'photo' as the first parameter in onClick, and it's actually
        passing in 'event' object. The right way to do it is simply don't
        passing in "photo", like below:`}{" "}
        <br />
        <Highlight className="javascript">{code2}</Highlight>
      </p>
    </Layout>
  );
};

export default AppendHTML;

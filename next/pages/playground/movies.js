import PropTypes from "prop-types";
import Layout from "components/Layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const title = "NextJS getStaticProps Example - Deni Apps";
const desc = `A simple example to demostrate how to use getStaticProps within NextJS `;

const summary = desc;
const canonical = "https://deniapps.com/playground/movies";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const Index = (props) => (
  <Layout seoData={seoData}>
    <h1>NBA TV Shows</h1>
    <div>
      <pre>HELLO NEXT</pre>
    </div>
    <ul>
      {props.shows &&
        props.shows.map((show) => (
          <li key={show.id}>
            <Link href="/playground/p/[id]" as={`/playground/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
    </ul>
  </Layout>
);

Index.propTypes = {
  shows: PropTypes.array,
};

export async function getStaticProps() {
  let data = null;
  try {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=nba");
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  // console.log(`Show data fetched. Count: ${data.length}`);

  return {
    props: {
      shows: data ? data.map((entry) => entry.show) : [],
    }, // will be passed to the page component as props
  };
}

export default Index;

import PropTypes from "prop-types";
import Head from "next/head";
const Meta = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={props.title} />
    <meta
      name="og:description"
      property="og:description"
      content={props.desc}
    />
    <meta property="og:site_name" content="DeNiApps" />
    <meta property="og:url" content={props.canonical} />
    <meta name="twitter:card" content={props.summary} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.desc} />
    <meta name="twitter:site" content="@denixuan" />
    <meta name="twitter:creator" content="@denixuan" />
    <link rel="icon" type="image/png" href="/images/favicon.ico" />
    <link rel="apple-touch-icon" href="/images/favicon.ico" />
    {props.css && <link rel="stylesheet" href={props.css} />}
    {props.image ? (
      <meta property="og:image" content={props.image} />
    ) : (
      <meta property="og:image" content="https://deniapps.com/images/dnx.png" />
    )}
    {props.image && <meta name="twitter:image" content={props.image} />}
    {props.canonical && <link rel="canonical" href={props.canonical} />}
    {props.js && <script type="text/javascript" src={props.js}></script>}
  </Head>
);
export default Meta;

Meta.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  summary: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  css: PropTypes.string,
  js: PropTypes.string,
};

import PropTypes from "prop-types";
import Head from "next/head";
const Meta = (props) => {
  const defaultTitle = "Deni Apps";
  const defaultDesc = "We Create Websites & Apps";
  const defaultImg = "https://deniapps.com/images/dnx.png";
  const siteUrl = "https://deniapps.com";
  const siteName = "Deni Apps";
  const defaultCard = "summary";

  return (
    <Head>
      <title>{props.title || defaultTitle}</title>
      <meta name="description" content={props.desc || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta
        name="og:title"
        property="og:title"
        content={props.title || defaultTitle}
      />
      <meta
        name="og:description"
        property="og:description"
        content={props.desc || defaultDesc}
      />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={props.canonical || siteUrl} />
      <meta property="og:image" content={props.image || defaultImg} />
      <meta name="twitter:card" content={defaultCard} />
      <meta name="twitter:title" content={props.title || defaultTitle} />
      <meta name="twitter:description" content={props.desc || defaultDesc} />
      <meta name="twitter:site" content="@denixuan" />
      <meta name="twitter:creator" content="@denixuan" />
      <link rel="icon" type="image/png" href="/images/dna-favico.png" />
      <link rel="apple-touch-icon" href="/images/dna-icon.png" />
      {props.css && <link rel="stylesheet" href={props.css} />}
      {props.image && <meta name="twitter:image" content={props.image} />}
      {props.canonical && <link rel="canonical" href={props.canonical} />}
      {props.js && <script type="text/javascript" src={props.js}></script>}

      {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        />
      )}
      {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');`,
          }}
        />
      )}
    </Head>
  );
};
export default Meta;

Meta.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  summary: PropTypes.string,
  card: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  css: PropTypes.string,
  js: PropTypes.string,
};

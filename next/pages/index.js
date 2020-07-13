import PropTypes from "prop-types";
// import Layout from "../components/Layout";
import Link from "next/link";
import { Grid } from "semantic-ui-react";
import Layout from "components/Layout";

const PostLink = (props) => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

PostLink.propTypes = {
  id: PropTypes.string,
};

export default function Index() {
  console.log(process.env.NODE_ENV);

  return (
    <Layout pageType="home">
      <Grid>
        <Grid.Column>
          <h1 className="hp-header">Deni Apps</h1>
          <p className="hp-slogan">We Build Websites & Apps</p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

// Index.getInitialProps = async ({ req }) => {
//   console.log("RE", req.headers["user-agent"]);
//   const md = new MobileDetect(req.headers["user-agent"]);
//   const isMobileFromSSR = !!md.mobile();

//   return {
//     isMobileFromSSR,
//     deviceInfo: {
//       mobile: md.mobile(),
//       tablet: md.tablet(),
//       os: md.os(),
//       userAgent: md.userAgent(),
//     },
//   };
// };

// Index.propTypes = {
//   isMobileFromSSR: PropTypes.bool,
// };

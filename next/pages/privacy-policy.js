import Layout from "../components/Layout";
import { Grid, Header } from "semantic-ui-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Header as="h1" icon>
        <Header.Content>Privacy Policy</Header.Content>
      </Header>
      <Grid>
        <Grid.Column>
          <p>
            Deni Apps values its {`users'`} privacy on the Deni Apps web site,
            mobile site and apps ({`"Properties"`}.) We have implemented this
            Privacy Policy to provide you with information about how Deni Apps
            collects, uses, and discloses information about you. By visiting our
            Properties or using our Services, you are agreeing to the practices
            described in this Privacy Policy.
          </p>

          <p>
            Our web server collects visitors IP address and browsers version.
            Apart from this, we do not collect any other information about
            visitors. The information we collect, if any, is not shared with
            other organizations for commercial purposes.
          </p>

          <p>
            We are a participant in the Amazon Services LLC Associates Program,
            an affiliate advertising program designed to provide a means for us
            to earn fees by linking to Amazon.com and affiliated sites.
          </p>

          <p>
            Cookies: We set cookies to gather user specific information. We
            partner with some of the third party statistics provider who may set
            cookie to identify statistics such as unique visitors, page views
            etc. In order to provide you best information about deals, We do
            provide advertisements and links to various retailers. deniapps.com
            has no control or knowledge about privacy policy of each retailer.
            Please see web site of retailers or contact them directly if you
            want any information about their privacy policy.
          </p>

          <p>
            From time to time, we may use customer information for new,
            unanticipated uses not previously disclosed in our privacy notice.
            If our information practices change at some time in the future we
            will post the policy changes to our Web site to notify you of these
            changes and provide you with the ability to opt out of these new
            uses. If you are concerned about how your information is used, you
            should check back at our Web site periodically.
          </p>

          <p>
            We have appropriate security measures in place in our physical
            facilities to protect against the loss, misuse or alteration of
            information that we have collected from you at our site. If you feel
            that this site is not following its stated information policy, you
            may contact us via email at contact@deniapps.com.
          </p>

          <p>
            If you have any questions or concerns, please contact us at
            contact@deniapps.com
          </p>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

import PropTypes from "prop-types";
import GitalkComponent from "gitalk/dist/gitalk-component";

const DNAComments = props => {
  if (
    !process.env.NEXT_PUBLIC_GH_CLIENT_ID ||
    !process.env.NEXT_PUBLIC_GH_CLIENT_SECRET
  ) {
    return (
      <p>
        Please define GITTALK, NEXT_PUBLIC_GH_CLIENT_ID and
        NEXT_PUBLIC_GH_CLIENT_SECRET in next.config.js
      </p>
    );
  }
  return (
    <GitalkComponent
      options={{
        clientID: process.env.NEXT_PUBLIC_GH_CLIENT_ID
          ? process.env.NEXT_PUBLIC_GH_CLIENT_ID
          : "",
        clientSecret: process.env.NEXT_PUBLIC_GH_CLIENT_SECRET
          ? process.env.NEXT_PUBLIC_GH_CLIENT_SECRET
          : "",
        repo: "dna-comments",
        owner: "deniapps",
        admin: ["deniapps"],
        id: props.slug, // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      }}
    />
  );
};

DNAComments.propTypes = {
  slug: PropTypes.string
};

export default DNAComments;

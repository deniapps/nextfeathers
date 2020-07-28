import GitalkComponent from "gitalk/dist/gitalk-component";

const DNAComments = (props) => {
  if (!process.env.GH_CLIENT_ID || !process.env.GH_CLIENT_SECRET) {
    return (
      <p>
        Please define GITTALK, GH_CLIENT_ID and GH_CLIENT_SECRET in
        next.config.js
      </p>
    );
  }
  return (
    <GitalkComponent
      options={{
        clientID: process.env.GH_CLIENT_ID ? process.env.GH_CLIENT_ID : "",
        clientSecret: process.env.GH_CLIENT_SECRET
          ? process.env.GH_CLIENT_SECRET
          : "",
        repo: "dna-comments",
        owner: "deniapps",
        admin: ["deniapps"],
        id: props.slug, // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
      }}
    />
  );
};

export default DNAComments;

const jsonfile = require("jsonfile");

import miniPosts from "data/miniPosts";

export default async function handler(req, res) {
  // const { pid } = req.query;
  const { method } = req;
  const { slug } = req.query;
  let output = {};

  switch (method) {
    case "GET":
      if (slug) {
        const matches = miniPosts.filter((item) => item.slug === slug);
        output = matches[0];
      } else {
        output = miniPosts;
      }
      // code block
      break;
    case "POST":
      console.log(req.body);
      miniPosts.push(req.body);
      // const { title, summary, url, tags } = req.body;
      await jsonfile.writeFile("data/miniPosts.json", miniPosts);

      output = { success: 1 };
      // code block
      break;
    default:
    // code block
  }

  res.status(200).json(output);
}

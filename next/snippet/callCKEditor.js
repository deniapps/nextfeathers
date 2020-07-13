import { useState } from "react";
// For SSR, you cannot import CKEditor directly since it needs client functions to run.
// import CKEditor from "components/Common/CKEditor";
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("components/Common/CKEditor"), {
  ssr: false,
});

const CKEditorDemo = () => {
  const [content, setContent] = useState("");
  return <CKEditor value={content} onChange={setContent} />;
};

export default CKEditorDemo;

// tried to make it works with nextjs13 - 05/28/2023
// but it's same as using next/dynamic load, the same error got: is not a constructor in ckeditor.js
// so have to use nextjs v12 for now.

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "ckeditor5-build-classic-dna";
// import ClassicEditor from "lib/CKV5";
import uploadFile from "lib/upload";
// import CustomFigureAttributes from "./CustomFigureAttributes";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    // const file = this.loader.file;
    // console.log("triggered");
    return this.loader.file.then(async (file) => {
      let formData = new FormData();
      formData.append("file", file);
      let result = false;
      try {
        result = await uploadFile(formData);
      } catch (error) {
        console.log(error);
      }
      // default image
      let url = "https://source.unsplash.com/random";

      if (result && result.url) {
        url = result.url;
      }

      if (result && result.thumbnail && this.loader.onUpload) {
        this.loader.onUpload(result.thumbnail);
      }

      return Promise.resolve({
        default: url,
      });
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

// ...
const DNXCustomUploadAdapterPlugin = (editor) => {
  // console.log(editor);
  // const s3Config = editor.s3Config;
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    loader.onUpload = editor && editor.onUpload;
    return new MyUploadAdapter(loader);
  };
};

// This plugin brings customization to the downcast pipeline of the editor.
// function AddClassToAllTables(editor) {
//   // Both the data and the editing pipelines are affected by this conversion.
//   editor.conversion.for("upcast").add((dispatcher) => {
//     // Headings are represented in the model as a "heading1" element.
//     // Use the "low" listener priority to apply the changes after the headings feature.
//     dispatcher.on(
//       "element:table",
//       (evt, data, conversionApi) => {
//         const viewWriter = conversionApi.writer;
//         const viewFigure = conversionApi.mapper.toViewElement(data.item);
//         if (!viewFigure) {
//           return;
//         }

//         if (viewWriter) {
//           viewWriter.addClass(
//             ["ui", "table"],
//             conversionApi.mapper.toViewElement(data.item)
//           );
//         }
//       },
//       { priority: "low" }
//     );
//   });
// }

const CKEditorNext = (props) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("ckeditor5-build-classic-dna"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={props.value}
          config={{
            table: {
              customClass: ["ui", "table", "celled"],
            },
            extraPlugins: [DNXCustomUploadAdapterPlugin],
            removePlugins: ["Base64UploadAdapter"],
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "indent",
              "outdent",
              "|",
              "imageUpload",
              "insertImage",
              "insertImageFromUnsplash",
              "code",
              "codeBlock",
              "blockQuote",
              "insertTable",
              "mediaEmbed",
              "undo",
              "redo",
            ],
            link: {
              decorators: {
                addTargetToExternalLinks: {
                  mode: "automatic",
                  callback: (url) => /^(https?:)?\/\//.test(url),
                  attributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                },
              },
            },
          }}
          onReady={(editor) => {
            if (editor) editor.onUpload = props.onUpload; //append event
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log(data);
            props.onChange(data);
            //console.log({ event, editor, data });
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
};

export default CKEditorNext;

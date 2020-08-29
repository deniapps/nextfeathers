import React, { Component } from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";
import uploadFile from "lib/upload";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(async (file) => {
      let formData = new FormData();
      formData.append("file", file);
      let result = false;
      try {
        result = await uploadFile(this.loader.accessToken, formData);
      } catch (error) {
        console.log(error);
      }
      // default image - in case upload failed
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

const DNXCustomUploadAdapterPlugin = (editor) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    loader.onUpload = editor.onUpload;
    loader.accessToken = editor.accessToken;
    return new MyUploadAdapter(loader);
  };
};

class CKEditor5 extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func,
      accessToken: PropTypes.string,
      onUpload: PropTypes.func,
    };
  }

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={this.props.value}
        config={{
          extraPlugins: [DNXCustomUploadAdapterPlugin],
          table: {
            customClass: ["ui", "table", "celled"], // Important!!! need to be array
          },
          image: {
            customClass: ["ui", "fluid", "image"], // Use whatever class names defined in your theme
          },
          toolbar: [
            //customize your toolbar
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
        onInit={(editor) => {
          editor.onUpload = this.props.onUpload; //append event
          editor.accessToken = this.props.accessToken;
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          this.props.onChange(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    );
  }
}

export default CKEditor5;

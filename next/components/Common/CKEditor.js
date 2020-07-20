import React, { Component } from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";

class CKEditor5 extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func,
    };
  }

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={this.props.value}
        config={{
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
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          this.props.onChange(data);
          //console.log({ event, editor, data });
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    );
  }
}

export default CKEditor5;

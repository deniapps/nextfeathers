import PropTypes from "prop-types";
import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import emailTempalte from "../../data/emailTemplate";

class CK4 extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func,
    };
  }
  render() {
    return (
      <CKEditor
        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
        config={{
          toolbar: [
            { name: "document", items: ["Source"] },
            {
              name: "clipboard",
              items: ["Cut", "Copy", "Paste", "Undo", "Redo"],
            },
            { name: "editing", items: ["Find", "Replace", "-", "Scayt"] },
            { name: "forms", items: ["Form", "Checkbox"] },
            {
              name: "basicstyles",
              items: ["Bold", "Italic", "-", "CopyFormatting", "RemoveFormat"],
            },
            {
              name: "paragraph",
              items: [
                "NumberedList",
                "BulletedList",
                "-",
                "Outdent",
                "Indent",
                "-",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock",
                "-",
                "BidiLtr",
                "BidiRtl",
                "Language",
              ],
            },
            { name: "links", items: ["Link"] },
            { name: "insert", items: ["Image", "Table", "Smiley"] },
            { name: "styles", items: ["Font", "FontSize"] },
            { name: "colors", items: ["TextColor", "BGColor"] },
            { name: "tools", items: ["Maximize", "ShowBlocks"] },
          ],
          language: " en",
          allowedContent: true,
        }}
        data={this.props.value ? this.props.value : emailTempalte}
        onChange={(event) => {
          const data = event.editor.getData();
          this.props.onChange(data);
          // console.log({ event, editor, data });
        }}
      />
    );
  }
}

export default CK4;

import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import dynamic from "next/dynamic";
import { EditorWrapper } from "./text-editor.styles";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  //   "image",
];

export default function TextEditor({ onChange, value, placeholder }) {
  const [editorHtml, setEditorHtml] = useState(value || "");

  // Sync internal state with value prop changes
  useEffect(() => {
    setEditorHtml(value || "");
  }, [value]);

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <EditorWrapper>
      <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={placeholder}
      />
    </EditorWrapper>
  );
}

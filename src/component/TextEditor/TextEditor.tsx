import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface PropType {
  value: string;
  setValue: Function;
}
export const TextEditor = (props: PropType) => {
  const { value, setValue } = props;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent) => {
    setValue(newContent);
  };

  return (
    <main>
      <div className='h-screen w-screen flex items-center flex-col'>
        <div className='h-full w-[90vw]'>
          <QuillEditor
            value={value}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className='w-full h-[70%] mt-10 bg-white'
          />
        </div>
      </div>
    </main>
  );
};

export default TextEditor;

"use client"
import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Button } from "@/components/dashboard/ui/button";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
interface QuillEditorJSProps {
  value?: string
  onChange: (value:any) => void
  placeholder? : string
  name?:string
}
export default function QuillEditorJS({name,value, onChange, placeholder}:QuillEditorJSProps) {
  const { quill, quillRef } = useQuill();
  quill?.setContents(value)
  quill?.on('editor-change', (t:string) => {
    onChange(t)
  })

  // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className="w-full">
      <div ref={quillRef} />
    </div>
  );
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import { Toggle } from "@/components/dashboard/ui/toggle";
import React from "react";
import { Quill } from "react-quill";

// Custom Undo Toggle icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo Toggle icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  // @ts-ignore
  this.quill.history.undo();
}
function redoChange() {
  // @ts-ignore
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props: any) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props: any) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId} className="border-neutral-700">
          <span className="ql-formats">
            <Toggle className="ql-bold" />
            <Toggle className="ql-italic" />
            <Toggle className="ql-underline" />
            <Toggle className="ql-strike" />
          </span>
          <span className="ql-formats">
            <Select>
              <SelectTrigger className="ql-font w-fit min-w-[8em]">
                <SelectValue defaultValue={"Inter"} />
              </SelectTrigger>
              <SelectContent className="ql-font w-fit min-w-[8em]">
                <SelectItem value="arial"> Arial </SelectItem>
                <SelectItem value="comic-sans">Comic Sans</SelectItem>
                <SelectItem value="courier-new">Courier New</SelectItem>
                <SelectItem value="georgia">Georgia</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="lucida">Lucida</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="ql-size w-fit min-w-[8em]">
                <SelectValue defaultValue={"medium"} />
              </SelectTrigger>
              <SelectContent className="ql-size">
                <SelectItem value="extra-small">Extra Small</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium" >
                  Medium
                </SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className=" w-fit min-w-[8em]">
                <SelectValue defaultValue={""} />
              </SelectTrigger>
              <SelectContent className="ql-header">
                <SelectItem value="1">Heading 1</SelectItem>
                <SelectItem value="2">Heading 2</SelectItem>
                <SelectItem value="3">Heading 3</SelectItem>
                <SelectItem value="4">Heading 4</SelectItem>
                <SelectItem value="5">Heading 5</SelectItem>
                <SelectItem value="6">Heading 6</SelectItem>
                <SelectItem value="" >
                  Normal
                </SelectItem>
              </SelectContent>
            </Select>
          </span>
          <span className="ql-formats">
            <Toggle className="ql-list" value="ordered" />
            <Toggle className="ql-list" value="bullet" />
            <Toggle className="ql-indent" value="-1" />
            <Toggle className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <Toggle className="ql-script" value="super" />
            <Toggle className="ql-script" value="sub" />
            <Toggle className="ql-blockquote" />
            <Toggle className="ql-direction" />
          </span>
          <span className="ql-formats">
            <Select>
              <SelectContent className="ql-align" />
            </Select>
            <Select>
              <SelectContent className="ql-color" />
            </Select>
            <Select>
              <SelectContent className="ql-background" />
            </Select>
          </span>
          <span className="ql-formats">
            <Toggle className="ql-link" />
            <Toggle className="ql-image" />
            <Toggle className="ql-video" />
          </span>
          <span className="ql-formats">
            <Toggle className="ql-formula" />
            <Toggle className="ql-code-block" />
            <Toggle className="ql-clean" />
          </span>
          <span className="ql-formats">
            <Toggle className="ql-undo">
              <CustomUndo />
            </Toggle>
            <Toggle className="ql-redo">
              <CustomRedo />
            </Toggle>
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;

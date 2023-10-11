"use client"
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editor-toolbar";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
interface QuillEditorProps {
    value?: string
    onChange: (value:string) => void
    placeholder? : string
    name:string
}

export default function QuillEditor({name,value, onChange, placeholder}:QuillEditorProps) {
    return (<>
                <EditorToolbar toolbarId={name+"toolbar"}/>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || "Write something awesome..."}
                    modules={modules(name+"toolbar")}
                    formats={formats}
                />
            </>
    )
}
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// interface QuillEditorProps {
//     value?: string
//     onChange: (value:string) => void
//     placeholder? : string
//     name:string
// }

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })
// const formats = [
//     'header',
//     'font',
//     'size',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'image',
//     'video',
//   ]
// const modules = {
//     toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ size: [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [
//         { list: 'ordered' },
//         { list: 'bullet' },
//         { indent: '-1' },
//         { indent: '+1' },
//       ],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//     clipboard: {
//       // toggle to add extra line breaks when pasting HTML:
//       matchVisual: false,
//     },
//   }


// export default function QuillEditor({name,value, onChange, placeholder}:QuillEditorProps) {
//   return (<>
//   <QuillNoSSRWrapper 
//         modules={modules} 
//         onChange={onChange} 
//         theme="snow" 
//         formats={formats}
//         />
//   </>
     
//   )
// }
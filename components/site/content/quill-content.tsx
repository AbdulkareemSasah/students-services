import React from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'
interface QuillContentProps {
    value:string
}
export const QuillContent = ({value}: QuillContentProps) => {
    return (
        <>
            <ReactQuill
                value={value}
                readOnly={true}
                theme="bubble"
            />
        </>
    )
}
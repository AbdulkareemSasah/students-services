import React from "react"
interface HeadProps {
    title: string,
    description?:string,
    img? : string,
    children?:React.ReactNode 
}

export const Head = ({title, img, description, children}: HeadProps) => {
    return (
        <div style={{backgroundImage: `url("${img}")`}}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div>{children}</div>
        </div>
    )
}